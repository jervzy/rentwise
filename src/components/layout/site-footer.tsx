import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";

const footerLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#what-we-handle", label: "What We Handle" },
  { href: "#service-areas", label: "Areas" },
  { href: "#faqs", label: "FAQs" },
  { href: "#rent-proposal", label: "Get a Rent Proposal" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Reveal className="site-container footer-primary">
        <div className="footer-brand">
          <Wordmark className="footer-wordmark" />
          <p>
            Guaranteed rent and property management for suitable properties.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </Reveal>

      <StaggerGroup className="site-container footer-pending-grid">
        <StaggerItem as="section" aria-labelledby="company-details-title">
          <h2 id="company-details-title">Company details</h2>
          <p>
            Registered company name, company number and registered office:
            pending confirmation before launch.
          </p>
          <p>Operating area: Reading, Berkshire.</p>
        </StaggerItem>

        <StaggerItem as="section" aria-labelledby="contact-details-title">
          <h2 id="contact-details-title">Contact details</h2>
          <p>Telephone number and email address: pending confirmation.</p>
        </StaggerItem>

        <StaggerItem as="section" aria-labelledby="policy-details-title">
          <h2 id="policy-details-title">Policies</h2>
          <p>
            Privacy Policy, Cookie Policy, Complaints Procedure, Terms of Use
            and Landlord Information: pending publication.
          </p>
        </StaggerItem>

        <StaggerItem as="section" aria-labelledby="regulatory-details-title">
          <h2 id="regulatory-details-title">Regulatory information</h2>
          <p>
            Redress membership, client money protection, ICO registration and
            professional insurance information: pending verification. No
            regulatory claim is made here.
          </p>
        </StaggerItem>
      </StaggerGroup>

      <Reveal className="site-container footer-lower" preset="fade">
        <p>
          Service availability and proposed terms are subject to property
          assessment, due diligence and a signed agreement.
        </p>
        <p>© {new Date().getFullYear()} Rent Wise Lettings &amp; Management</p>
      </Reveal>
    </footer>
  );
}
