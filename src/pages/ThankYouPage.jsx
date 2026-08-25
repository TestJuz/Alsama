import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock3, MessageCircle } from "lucide-react";
import { SiteLayout } from "../components/SiteLayout";
import { homeLinks, routes } from "../lib/site";

const nextSteps = [
  "We review your dates, route and selected services.",
  "A local team member checks availability and pickup details.",
  "You receive the next steps by email, with WhatsApp support available for urgent updates."
];

export function ThankYouPage() {
  return (
    <SiteLayout
      homeTo={homeLinks.home}
      contactTo={homeLinks.contact}
      brandTo={routes.home}
      footerBackToTop="#thank-you-top"
    >
      <main className="thank-you-page" id="thank-you-top">
        <section className="thank-you-hero">
          <div className="container thank-you-hero__inner">
            <span className="thank-you-icon" aria-hidden="true">
              <CheckCircle2 size={34} />
            </span>
            <p className="thank-you-kicker">Request received</p>
            <h1>Thank you for contacting Alsama Tours.</h1>
            <p>
              Your message was sent successfully. We aim to answer quote and planning requests within 2 business hours.
            </p>
            <div className="thank-you-actions">
              <Link className="btn btn--primary" to={routes.tours}>
                Keep exploring tours <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="btn btn--ghost" to={routes.home}>
                Back home
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container thank-you-grid">
            <article className="thank-you-response">
              <Clock3 size={22} aria-hidden="true" />
              <h2>Response time commitment</h2>
              <p>
                Most requests receive a first reply the same business day. Urgent same-day transport
                requests are prioritized when details are complete.
              </p>
            </article>
            <article className="thank-you-next">
              <h2>What happens next</h2>
              <ol>
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <Link to={homeLinks.contact}>
                Add another detail <MessageCircle size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
