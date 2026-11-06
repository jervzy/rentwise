import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { faqItems } from "@/lib/homepage-content";

export function FaqSection() {
  return (
    <section
      id="faqs"
      className="section-block faq-section"
      aria-labelledby="faq-title"
    >
      <div className="site-container faq-layout">
        <Reveal className="faq-heading" preset="fade-right">
          <h2 id="faq-title">Questions landlords often ask.</h2>
          <p>
            These preliminary answers explain the intended service and are not
            legal, mortgage, insurance, licensing or tax advice.
          </p>
          <a href="#rent-proposal">Ask about your property</a>
        </Reveal>
        <Reveal delay={0.08} preset="fade-left">
          <FaqAccordion items={faqItems} />
        </Reveal>
      </div>
    </section>
  );
}
