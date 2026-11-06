import { DrawLine } from "@/components/motion/draw-line";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { processStages } from "@/lib/homepage-content";

export function ServiceProcess() {
  return (
    <section
      id="how-it-works"
      className="section-block process-section"
      aria-labelledby="process-title"
    >
      <div className="site-container">
        <Reveal className="section-heading section-heading-narrow">
          <p className="eyebrow">A clear four-step process</p>
          <h2 id="process-title">
            From property details to an agreed monthly rent.
          </h2>
        </Reveal>

        <StaggerGroup as="ol" className="process-timeline">
          {processStages.map((stage, index) => (
            <StaggerItem as="li" key={stage.title}>
              <div className="process-marker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              {index < processStages.length - 1 ? (
                <DrawLine className="process-connector" delay={index * 0.055} />
              ) : null}
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
