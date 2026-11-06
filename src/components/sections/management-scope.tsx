import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { managementLanes } from "@/lib/homepage-content";

export function ManagementScope() {
  return (
    <section
      id="what-we-handle"
      className="section-block management-section"
      aria-labelledby="management-title"
    >
      <div className="site-container">
        <Reveal className="section-heading section-heading-narrow">
          <p className="eyebrow">Property management</p>
          <h2 id="management-title">
            One point of contact for the day-to-day work.
          </h2>
        </Reveal>

        <div className="management-overview">
          <StaggerGroup as="ul" className="management-panel-grid">
            {managementLanes.map((lane, index) => (
              <StaggerItem
                as="li"
                className={`management-panel management-panel-${index + 1}`}
                key={lane.name}
              >
                <h3>{lane.name}</h3>
                <StaggerGroup as="ul" className="management-panel-services">
                  {lane.services.map((service) => (
                    <StaggerItem as="li" key={service.title}>
                      <h4>{service.title}</h4>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal as="aside" className="management-footnote" preset="fade">
            <p className="management-note-primary">
              Rent Wise coordinates the agreed day-to-day management and keeps
              the landlord informed.
            </p>
            <p className="section-qualification">
              Maintenance approval, repair costs, documentation and compliance
              responsibilities are defined by the agreement and relevant
              specialist advice.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
