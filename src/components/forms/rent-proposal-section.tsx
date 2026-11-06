import { RentProposalForm } from "@/components/forms/rent-proposal-form";
import { Reveal } from "@/components/motion/reveal";

export function RentProposalSection() {
  return (
    <section
      id="rent-proposal"
      className="proposal-section"
      aria-labelledby="proposal-title"
    >
      <div className="site-container proposal-layout">
        <Reveal className="proposal-copy" preset="fade-right">
          <p className="eyebrow">For landlords</p>
          <h2 id="proposal-title">Find out what your property could earn.</h2>
          <p>
            Tell Rent Wise a little about your property. The team will contact
            you to discuss its suitability and prepare an initial rent proposal.
          </p>

          <div className="proposal-expectations">
            <h3>What happens next</h3>
            <ol>
              <li>
                <span>1</span>
                Your property details are reviewed.
              </li>
              <li>
                <span>2</span>
                Rent Wise contacts you to discuss suitability.
              </li>
              <li>
                <span>3</span>
                An assessment may be arranged before terms are proposed.
              </li>
            </ol>
          </div>

          <p className="proposal-disclaimer">
            An enquiry is not an offer, acceptance or contract. Any proposal is
            subject to assessment, due diligence and agreed terms.
          </p>
        </Reveal>

        <Reveal delay={0.08} preset="fade-left">
          <RentProposalForm />
        </Reveal>
      </div>
    </section>
  );
}
