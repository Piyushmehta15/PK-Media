import { site } from '../../config/site'

export function PackageComparison() {
  return (
    <div className="package-comparison" data-reveal>
      <div className="package-comparison__heading">
        <div>
          <span className="eyebrow">
            <i />
            Compare packages
          </span>
          <h3>Find the right growth starting point.</h3>
        </div>
        <p>Every package is designed to support growth with a clear, practical scope.</p>
      </div>
      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th scope="col">Package</th>
              <th scope="col">Main focus</th>
              <th scope="col">Strategy</th>
              <th scope="col">Content</th>
              <th scope="col">Social management</th>
              <th scope="col">Creator marketing</th>
              <th scope="col">Analytics</th>
            </tr>
          </thead>
          <tbody>
            {site.packageExperience.comparison.map((pkg) => (
              <tr
                key={pkg.name}
                className={pkg.name === 'Growth Engine' ? 'comparison-table__featured' : ''}
              >
                <th scope="row" data-label="Package">
                  {pkg.name}
                </th>
                <td data-label="Main focus">{pkg.focus}</td>
                <td data-label="Strategy">{pkg.strategy}</td>
                <td data-label="Content">{pkg.content}</td>
                <td data-label="Social management">{pkg.social}</td>
                <td data-label="Creator marketing">{pkg.creators}</td>
                <td data-label="Analytics">{pkg.analytics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
