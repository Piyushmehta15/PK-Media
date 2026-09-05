import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { FloatingWhatsApp } from '../components/FloatingWhatsApp'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { AboutSection } from '../sections/AboutSection'
import { AnalyticsSection } from '../sections/AnalyticsSection'
import { CaseStudiesSection } from '../sections/CaseStudiesSection'
import { ClippingPerformanceSection } from '../sections/ClippingPerformanceSection'
import { ContactSection } from '../sections/ContactSection'
import { CreatorsSection } from '../sections/CreatorsSection'
import { CustomStrategySection } from '../sections/CustomStrategySection'
import { DistributionSection } from '../sections/DistributionSection'
import { GrowthPlanBuilder } from '../sections/GrowthPlanBuilder'
import { HeroSection } from '../sections/HeroSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { InfluencerSection } from '../sections/InfluencerSection'
import { PackageOperatingModelSection } from '../sections/PackageOperatingModelSection'
import { PackagesSection } from '../sections/PackagesSection'
import { ProblemSection } from '../sections/ProblemSection'
import { ServicesSection } from '../sections/ServicesSection'
import { SocialManagementSection } from '../sections/SocialManagementSection'
import { moveTo } from '../utils/navigation'

export function HomePage() {
  const [leadContext, setLeadContext] = useState('')

  useEffect(() => {
    document.title = site.seo.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', site.seo.description)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const focusLeadForm = () => {
    window.setTimeout(() => document.getElementById('lead-name')?.focus(), 520)
  }
  const goToContact = (context = '') => {
    setLeadContext(context)
    moveTo('#contact')
    focusLeadForm()
  }
  const buildPlan = () => moveTo('#growth-plan')
  const requestProposal = (summary: string) => goToContact(`Custom growth plan selections:\n${summary}`)
  const requestPackage = (packageName: string) => goToContact(`Package interest: ${packageName}`)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header onBookCall={() => goToContact()} />
      <main id="main-content">
        <HeroSection onBookCall={() => goToContact()} onBuildPlan={buildPlan} />
        <ProblemSection />
        <ServicesSection onContact={goToContact} />
        <DistributionSection onBuildPlan={buildPlan} />
        <InfluencerSection onContact={goToContact} />
        <SocialManagementSection onContact={goToContact} />
        <PackagesSection onRequestPackage={requestPackage} />
        <ClippingPerformanceSection onRequestPackage={requestPackage} />
        <PackageOperatingModelSection />
        <GrowthPlanBuilder onRequestProposal={requestProposal} />
        <CustomStrategySection onContact={goToContact} />
        <HowItWorksSection onBookCall={() => goToContact()} />
        <AnalyticsSection onContact={goToContact} />
        <CaseStudiesSection onContact={goToContact} />
        <AboutSection onContact={goToContact} />
        <CreatorsSection />
        <ContactSection context={leadContext} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
