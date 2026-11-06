import {
  rentWiseManagement,
  traditionalManagement,
} from "@/lib/homepage-content";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";

export function LandlordComparison() {
  return (
    <section
      id="for-landlords"
      className="section-block comparison-section"
      aria-labelledby="comparison-title"
    >
      <div className="site-container">
        <Reveal className="section-heading section-heading-narrow">
          <h2 id="comparison-title">
            Property income without the constant uncertainty.
          </h2>
          <p>
            Managing a rental property can involve changing occupants,
            late-night issues, temporary voids and repeated administration. Rent
            Wise provides a clearly defined alternative for suitable properties.
          </p>
        </Reveal>

        <div className="comparison-layout">
          <Reveal
            as="article"
            className="comparison-column comparison-traditional"
            preset="fade-right"
          >
            <header>
              <p>Traditional self-management</p>
              <span>Landlord coordinates each moving part</span>
            </header>
            <StaggerGroup as="ul">
              {traditionalManagement.map((item) => (
                <StaggerItem as="li" key={item}>
                  <span aria-hidden="true">-</span>
                  {item}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>

          <Reveal
            as="article"
            className="comparison-column comparison-rent-wise"
            delay={0.08}
            preset="fade-left"
          >
            <header>
              <p>Rent Wise managed agreement</p>
              <span>Responsibilities defined before the agreement starts</span>
            </header>
            <StaggerGroup as="ul">
              {rentWiseManagement.map((item) => (
                <StaggerItem as="li" key={item}>
                  <span aria-hidden="true">+</span>
                  {item}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
