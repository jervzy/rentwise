import { RentProposalSection } from "@/components/forms/rent-proposal-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenefitStrip } from "@/components/sections/benefit-strip";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { LandlordComparison } from "@/components/sections/landlord-comparison";
import { LocalReading } from "@/components/sections/local-reading";
import { ManagementScope } from "@/components/sections/management-scope";
import { PropertySuitability } from "@/components/sections/property-suitability";
import { ServiceProcess } from "@/components/sections/service-process";
import { TransparentAgreement } from "@/components/sections/transparent-agreement";
import { getLocalBusinessStructuredData } from "@/lib/structured-data";

export default function Home() {
  const structuredData = getLocalBusinessStructuredData();

  return (
    <>
      <div id="page-top" aria-hidden="true" />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <BenefitStrip />
        <LandlordComparison />
        <ServiceProcess />
        <ManagementScope />
        <LocalReading />
        <TransparentAgreement />
        <PropertySuitability />
        <FaqSection />
        <RentProposalSection />
      </main>
      <SiteFooter />
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </>
  );
}
