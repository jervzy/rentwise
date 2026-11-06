import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { agreementItems } from "@/lib/homepage-content";

export function TransparentAgreement() {
  return (
    <section className="agreement-section" aria-labelledby="agreement-title">
      <div className="site-container agreement-layout">
        <Reveal className="agreement-copy" preset="fade-right">
          <p className="eyebrow eyebrow-light">Clarity before commitment</p>
          <h2 id="agreement-title">A clear agreement, not a vague promise.</h2>
          <p>
            Before the property is accepted, the proposed arrangement sets out
            the payment terms, responsibilities and property-management process
            in writing.
          </p>
        </Reveal>

        <Reveal
          className="agreement-definition"
          delay={0.08}
          preset="fade-left"
        >
          <h3>The proposal defines</h3>
          <StaggerGroup as="ul">
            {agreementItems.map((item, index) => (
              <StaggerItem as="li" key={item}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p>
            Final terms vary by property and are confirmed in the signed
            agreement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
