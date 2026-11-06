import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { benefits } from "@/lib/homepage-content";
import { MOTION_STAGGER } from "@/lib/motion";

export function BenefitStrip() {
  return (
    <section
      id="landlord-benefits"
      className="benefit-strip"
      aria-labelledby="landlord-benefits-title"
    >
      <div className="site-container benefit-strip-inner">
        <StaggerGroup className="trust-strip-intro">
          <StaggerItem as="h2" id="landlord-benefits-title">
            Built for landlords who want predictable income and less day-to-day
            management.
          </StaggerItem>
        </StaggerGroup>
        <StaggerGroup
          as="ul"
          className="benefit-grid"
          stagger={MOTION_STAGGER.compact}
        >
          {benefits.map((benefit) => (
            <StaggerItem as="li" key={benefit}>
              <p>{benefit}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
