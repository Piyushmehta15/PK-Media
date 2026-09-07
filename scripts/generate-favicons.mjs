import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// Helper to decode source PNG
function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath)
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('Not a PNG')
  let pos = 8
  let width, height, bitDepth, colorType
  const idatChunks = []
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    const type = buf.toString('ascii', pos + 4, pos + 8)
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8)
      height = buf.readUInt32BE(pos + 12)
      bitDepth = buf.readUInt8(pos + 16)
      colorType = buf.readUInt8(pos + 17)
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + len))
    } else if (type === 'IEND') {
      break
    }
    pos += 12 + len
  }
  const idat = Buffer.concat(idatChunks)
  const raw = zlib.inflateSync(idat)
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 1
  const rgba = Buffer.alloc(width * height * 4)
  let rawOffset = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[rawOffset++]
    const prevRowOffset = (y - 1) * width * 4
    const currRowOffset = y * width * 4
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < bpp; c++) {
        const rawByte = raw[rawOffset++]
        const a = x > 0 ? rgba[currRowOffset + (x - 1) * 4 + c] : 0
        const b = y > 0 ? rgba[prevRowOffset + x * 4 + c] : 0
        const cVal = x > 0 && y > 0 ? rgba[prevRowOffset + (x - 1) * 4 + c] : 0
        let recon = 0
        if (filter === 0) recon = rawByte
        else if (filter === 1) recon = (rawByte + a) & 0xff
        else if (filter === 2) recon = (rawByte + b) & 0xff
        else if (filter === 3) recon = (rawByte + Math.floor((a + b) / 2)) & 0xff
        else if (filter === 4) {
          const p = a + b - cVal
          const pa = Math.abs(p - a)
          const pb = Math.abs(p - b)
          const pc = Math.abs(p - cVal)
          const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : cVal
          recon = (rawByte + pr) & 0xff
        }
        rgba[currRowOffset + x * 4 + c] = recon
      }
      if (bpp === 3) rgba[currRowOffset + x * 4 + 3] = 255
    }
  }
  return { width, height, rgba }
}

// CRC32 implementation
const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1)
    else c = c >>> 1
  }
  crcTable[n] = c
}
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function makeChunk(type, data) {
  const len = data.length
  const buf = Buffer.alloc(12 + len)
  buf.writeUInt32BE(len, 0)
  buf.write(type, 4, 4, 'ascii')
  data.copy(buf, 8)
  const crc = crc32(buf.subarray(4, 8 + len))
  buf.writeUInt32BE(crc >>> 0, 8 + len)
  return buf
}

// Encode RGBA Buffer to PNG
function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData.writeUInt8(8, 8) // 8 bits per channel
  ihdrData.writeUInt8(6, 9) // RGBA
  ihdrData.writeUInt8(0, 10)
  ihdrData.writeUInt8(0, 11)
  ihdrData.writeUInt8(0, 12)
  const ihdr = makeChunk('IHDR', ihdrData)
  
  const scanlineLength = width * 4 + 1
  const rawData = Buffer.alloc(height * scanlineLength)
  for (let y = 0; y < height; y++) {
    rawData[y * scanlineLength] = 0 // Filter 0 (None)
    rgbaBuffer.copy(rawData, y * scanlineLength + 1, y * width * 4, (y + 1) * width * 4)
  }
  const compressed = zlib.deflateSync(rawData, { level: 9 })
  const idat = makeChunk('IDAT', compressed)
  const iend = makeChunk('IEND', Buffer.alloc(0))
  
  return Buffer.concat([signature, ihdr, idat, iend])
}

// Supersampled area averaging with premultiplied alpha for sharp, halo-free icons
function renderSquareIcon(src, targetSize, cropPaddingRatio = 0.04) {
  // Logo bounding box in source: minX: 148, maxX: 876 (w=729), minY: 52, maxY: 642 (h=591)
  const minX = 148, maxX = 876, minY = 52, maxY = 642
  const logoW = maxX - minX + 1
  const logoH = maxY - minY + 1
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  
  const squareSizeInSrc = logoW / (1 - cropPaddingRatio * 2)
  const srcLeft = cx - squareSizeInSrc / 2
  const srcTop = cy - squareSizeInSrc / 2
  
  const dst = Buffer.alloc(targetSize * targetSize * 4)
  const srcStep = squareSizeInSrc / targetSize
  const SAMPLES = 8 // 8x8 = 64 samples per destination pixel
  
  for (let dy = 0; dy < targetSize; dy++) {
    for (let dx = 0; dx < targetSize; dx++) {
      let sumR_pre = 0, sumG_pre = 0, sumB_pre = 0, sumA = 0
      const totalSamples = SAMPLES * SAMPLES
      
      for (let sy = 0; sy < SAMPLES; sy++) {
        for (let sx = 0; sx < SAMPLES; sx++) {
          const srcX = srcLeft + (dx + (sx + 0.5) / SAMPLES) * srcStep
          const srcY = srcTop + (dy + (sy + 0.5) / SAMPLES) * srcStep
          
          const ix = Math.floor(srcX)
          const iy = Math.floor(srcY)
          
          if (ix >= 0 && ix < src.width && iy >= 0 && iy < src.height) {
            const idx = (iy * src.width + ix) * 4
            const r = src.rgba[idx]
            const g = src.rgba[idx + 1]
            const b = src.rgba[idx + 2]
            const a = src.rgba[idx + 3]
            
            const aNorm = a / 255.0
            sumR_pre += r * aNorm
            sumG_pre += g * aNorm
            sumB_pre += b * aNorm
            sumA += a
          }
        }
      }
      
      const avgA = sumA / totalSamples
      const dstIdx = (dy * targetSize + dx) * 4
      if (avgA > 0.5) {
        const aNorm = avgA / 255.0
        const avgR = (sumR_pre / totalSamples) / aNorm
        const avgG = (sumG_pre / totalSamples) / aNorm
        const avgB = (sumB_pre / totalSamples) / aNorm
        
        dst[dstIdx] = Math.round(Math.min(255, Math.max(0, avgR)))
        dst[dstIdx + 1] = Math.round(Math.min(255, Math.max(0, avgG)))
        dst[dstIdx + 2] = Math.round(Math.min(255, Math.max(0, avgB)))
        dst[dstIdx + 3] = Math.round(Math.min(255, Math.max(0, avgA)))
      } else {
        dst[dstIdx] = 0
        dst[dstIdx + 1] = 0
        dst[dstIdx + 2] = 0
        dst[dstIdx + 3] = 0
      }
    }
  }
  return dst
}

// Multi-image ICO generator
function makeICO(pngBuffers) {
  const count = pngBuffers.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)
  
  const dirSize = 16 * count
  let currentOffset = 6 + dirSize
  const dirBuffers = []
  const imageBuffers = []
  
  for (const item of pngBuffers) {
    const dir = Buffer.alloc(16)
    dir.writeUInt8(item.width >= 256 ? 0 : item.width, 0)
    dir.writeUInt8(item.height >= 256 ? 0 : item.height, 1)
    dir.writeUInt8(0, 2)
    dir.writeUInt8(0, 3)
    dir.writeUInt16LE(1, 4)
    dir.writeUInt16LE(32, 6)
    dir.writeUInt32LE(item.buffer.length, 8)
    dir.writeUInt32LE(currentOffset, 12)
    
    dirBuffers.push(dir)
    imageBuffers.push(item.buffer)
    currentOffset += item.buffer.length
  }
  
  return Buffer.concat([header, ...dirBuffers, ...imageBuffers])
}

// Boundary tracer for SVG vectorization
function traceBoundary(compMask, w, h) {
  let startX = -1, startY = -1
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (compMask[y * w + x]) {
        startX = x
        startY = y
        break
      }
    }
    if (startX !== -1) break
  }
  if (startX === -1) return []
  
  const points = []
  let currX = startX, currY = startY
  let fromDir = 3
  
  const dirs = [
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 }
  ]
  
  let loopCount = 0
  do {
    points.push({ x: currX, y: currY })
    let found = false
    const checkDir = (fromDir + 5) % 8
    for (let i = 0; i < 8; i++) {
      const d = (checkDir + i) % 8
      const nx = currX + dirs[d].dx
      const ny = currY + dirs[d].dy
      if (nx >= 0 && nx < w && ny >= 0 && ny < h && compMask[ny * w + nx]) {
        currX = nx
        currY = ny
        fromDir = d
        found = true
        break
      }
    }
    if (!found) break
    loopCount++
  } while (!(currX === startX && currY === startY) && loopCount < 50000)
  
  return points
}

function perpendicularDist(p, p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  if (dx === 0 && dy === 0) return Math.hypot(p.x - p1.x, p.y - p1.y)
  const u = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy)
  const clampedU = Math.max(0, Math.min(1, u))
  return Math.hypot(p.x - (p1.x + clampedU * dx), p.y - (p1.y + clampedU * dy))
}

function simplify(points, epsilon) {
  if (points.length <= 2) return points
  let dmax = 0, index = 0
  const end = points.length - 1
  for (let i = 1; i < end; i++) {
    const d = perpendicularDist(points[i], points[0], points[end])
    if (d > dmax) {
      index = i
      dmax = d
    }
  }
  if (dmax > epsilon) {
    const rec1 = simplify(points.slice(0, index + 1), epsilon)
    const rec2 = simplify(points.slice(index), epsilon)
    return rec1.slice(0, -1).concat(rec2)
  } else {
    return [points[0], points[end]]
  }
}

async function main() {
  const sourcePath = path.resolve(rootDir, 'public/brand/pk-media-leaf-mark.png')
  console.log('Loading source image from:', sourcePath)
  const src = decodePNG(sourcePath)
  console.log(`Decoded source: ${src.width}x${src.height}`)
  
  const publicDir = path.resolve(rootDir, 'public')
  
  // 1. Generate PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16, padding: 0.02 },
    { name: 'favicon-32x32.png', size: 32, padding: 0.03 },
    { name: 'favicon-48x48.png', size: 48, padding: 0.04 },
    { name: 'apple-touch-icon.png', size: 180, padding: 0.08 },
    { name: 'android-chrome-192x192.png', size: 192, padding: 0.08 },
    { name: 'android-chrome-512x512.png', size: 512, padding: 0.08 },
  ]
  
  const icoPNGs = []
  
  for (const config of sizes) {
    const rgba = renderSquareIcon(src, config.size, config.padding)
    const pngBuf = encodePNG(config.size, config.size, rgba)
    const outPath = path.join(publicDir, config.name)
    fs.writeFileSync(outPath, pngBuf)
    console.log(`Generated: ${config.name} (${config.size}x${config.size}, ${pngBuf.length} bytes)`)
    
    if (config.size === 16 || config.size === 32 || config.size === 48) {
      icoPNGs.push({ width: config.size, height: config.size, buffer: pngBuf })
    }
  }
  
  // 2. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoBuf = makeICO(icoPNGs)
  const icoPath = path.join(publicDir, 'favicon.ico')
  fs.writeFileSync(icoPath, icoBuf)
  console.log(`Generated: favicon.ico (contains 16x16, 32x32, 48x48; ${icoBuf.length} bytes)`)
  
  // 3. Generate high-precision favicon.svg (crisp vector SVG)
  const maskTop = new Uint8Array(src.width * src.height)
  const maskLeft = new Uint8Array(src.width * src.height)
  const maskRight = new Uint8Array(src.width * src.height)
  
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const idx = y * src.width + x
      if (src.rgba[idx * 4 + 3] >= 128) {
        if (y <= 485 && x >= 390 && x <= 635) {
          maskTop[idx] = 1
        } else if (x <= 512) {
          maskLeft[idx] = 1
        } else {
          maskRight[idx] = 1
        }
      }
    }
  }
  
  const ptsTop = simplify(traceBoundary(maskTop, src.width, src.height), 1.2)
  const ptsLeft = simplify(traceBoundary(maskLeft, src.width, src.height), 1.2)
  const ptsRight = simplify(traceBoundary(maskRight, src.width, src.height), 1.2)
  
  const minX = 148, maxX = 876, minY = 52, maxY = 642
  const logoW = maxX - minX + 1
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const cropPad = 0.05
  const sqSize = logoW / (1 - cropPad * 2)
  const sLeft = cx - sqSize / 2
  const sTop = cy - sqSize / 2
  
  function toSVGPath(points) {
    return points.map((p, i) => {
      const nx = +(((p.x - sLeft) / sqSize) * 100).toFixed(2)
      const ny = +(((p.y - sTop) / sqSize) * 100).toFixed(2)
      return (i === 0 ? `M ${nx} ${ny}` : `L ${nx} ${ny}`)
    }).join(' ') + ' Z'
  }
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <!-- PK Media Brand Favicon -->
  <path d="${toSVGPath(ptsTop)}" fill="#00A7C0"/>
  <path d="${toSVGPath(ptsLeft)}" fill="#00A7C0"/>
  <path d="${toSVGPath(ptsRight)}" fill="#00A7C0"/>
</svg>
`
  const svgPath = path.join(publicDir, 'favicon.svg')
  fs.writeFileSync(svgPath, svgContent)
  console.log(`Generated: favicon.svg (${svgContent.length} bytes)`)
  
  console.log('All favicon assets successfully generated!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
