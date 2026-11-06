import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { suitabilityConsiderations } from "@/lib/homepage-content";

export function PropertySuitability() {
  return (
    <section
      className="section-block suitability-section"
      aria-labelledby="suitability-title"
    >
      <div className="site-container suitability-layout">
        <Reveal className="suitability-copy" preset="fade-right">
          <h2 id="suitability-title">
            Is your property suitable for Rent Wise?
          </h2>
          <p>
            Every property is assessed individually. Location, condition,
            permissions, documentation and proposed terms all inform whether a
            Rent Wise arrangement may be suitable.
          </p>
          <CtaLink href="#rent-proposal">Check my property</CtaLink>
          <p className="section-qualification">
            Submitting property details does not guarantee acceptance or create
            an agreement.
          </p>
        </Reveal>

        <Reveal className="suitability-list" delay={0.08} preset="fade-left">
          <h3>Potential considerations</h3>
          <StaggerGroup as="ul">
            {suitabilityConsiderations.map((item) => (
              <StaggerItem as="li" key={item}>
                <span aria-hidden="true" />
                {item}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
}
