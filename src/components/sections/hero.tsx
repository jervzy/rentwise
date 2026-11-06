import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { CtaLink } from "@/components/ui/cta-link";
import { RentWiseHeroBackground } from "@/components/ui/rentwise-hero-background";
import { MOTION_STAGGER } from "@/lib/motion";

export function Hero() {
  return (
    <section
      className="hero-section relative isolate overflow-hidden"
      aria-labelledby="hero-title"
    >
      <RentWiseHeroBackground />

      <div className="site-container hero-grid relative z-10">
        <StaggerGroup
          className="hero-copy"
          delayChildren={0.08}
          stagger={MOTION_STAGGER.editorial}
          trigger="load"
        >
          <StaggerItem as="p" className="eyebrow" preset="fade-down">
            Guaranteed rent and property management in Reading
          </StaggerItem>
          <StaggerItem as="h1" id="hero-title">
            <span>Reliable rent. A property </span>
            <span>that&apos;s properly looked after.</span>
          </StaggerItem>
          <StaggerItem as="p" className="hero-lead">
            Rent Wise leases and professionally manages suitable residential
            properties across Reading and Berkshire, giving landlords an agreed
            monthly payment and one dependable point of contact.
          </StaggerItem>
          <StaggerItem className="hero-actions">
            <CtaLink href="#rent-proposal">Get a rent proposal</CtaLink>
            <CtaLink href="#how-it-works" variant="secondary">
              See how it works
            </CtaLink>
          </StaggerItem>
          <StaggerItem as="p" className="hero-qualification" preset="fade">
            Subject to property assessment, due diligence and agreed contract
            terms.
          </StaggerItem>
        </StaggerGroup>

        <Reveal
          className="hero-visual"
          delay={0.2}
          duration={0.62}
          preset="scale-soft"
          trigger="load"
        >
          <div className="hero-image-offset" aria-hidden="true" />
          <div className="hero-image-frame">
            <Image
              src="/images/rentwise-hero-property.webp"
              alt="Well-maintained red-brick residential property in Reading"
              fill
              preload
              quality={85}
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 940px) min(620px, calc(100vw - 64px)), (max-width: 1100px) 390px, 456px"
              className="hero-property-image"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
