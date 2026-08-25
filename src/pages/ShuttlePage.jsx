import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, DollarSign, MapPin, Route, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { ContactForm } from "../components/ContactForm";
import { ShuttleExplorer } from "../components/ShuttleExplorer";
import { SiteLayout } from "../components/SiteLayout";
import { asset, routes } from "../lib/site";

const shuttleBenefits = [
  {
    title: "Lower transport cost",
    text: "Shared rides usually cost less than booking a full private vehicle.",
    icon: DollarSign
  },
  {
    title: "Common destinations",
    text: "A great option when moving between airports, San Jose, Jaco, beaches and other popular stops.",
    icon: MapPin
  },
  {
    title: "Good for light planning",
    text: "If your route is already clear, shuttle service can be a straightforward transport solution.",
    icon: CalendarDays
  },
  {
    title: "Easy to combine",
    text: "Use it together with tours, hotels and later private transfers if needed.",
    icon: UsersRound
  }
];
const shuttleRoutePoints = ["SJO", "San Jose", "Jaco", "Beaches", "Hotels"];
const shuttleFlowVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 }
  }
};

const shuttleFlowItemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export function ShuttlePage() {
  return (
    <SiteLayout
      homeTo={routes.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#"
    >
      <main className="transport-service-page">
        <section className="hero hero--compact hero--image hero--shuttle" style={{ "--hero-image": `url(${asset("img/gallery/50.webp")})` }}>
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker">Shared shuttle service</p>
              <h1 className="hero__title">Comfortable shared routes between Costa Rica's main destinations</h1>
              <p className="hero__subtitle">
                Shuttles are ideal when you want a reliable and more affordable transfer between airports, hotels and major tourist areas.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#shuttle-details">See shuttle details</a>
                <a className="btn btn--ghost" href="#contact">Request shuttle</a>
              </div>
            </div>

            <div className="transport-highlight">
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Best for</p>
                <h3>Travelers on popular routes</h3>
                <p className="muted">A practical solution for common destinations like beaches, city hotels and airport connections.</p>
              </div>
              <div className="transport-highlight__card">
                <p className="transport-highlight__eyebrow">Main advantage</p>
                <h3>Better value for shared travel</h3>
                <p className="muted">You save on transport while still traveling in a comfortable tourist shuttle environment.</p>
              </div>
            </div>
          </div>
        </section>

        <ShuttleExplorer />

        <section className="section">
          <div className="container">
            <div className="transport-grid">
              <article className="transport-card">
                <span className="transport-card__tag">Why choose shuttle</span>
                <h3>Best when your route is common and your schedule is flexible</h3>
                <p className="muted">Choose shuttle if you want a lower-cost ride and are traveling between destinations that already have regular shared service demand.</p>
                <ul className="transport-list">
                  <li>Good value for standard tourist routes</li>
                  <li>Useful for airport to hotel and hotel to hotel transfers</li>
                  <li>Works well when you do not need custom stops</li>
                </ul>
              </article>
              <article className="transport-card">
                <span className="transport-card__tag">Need more flexibility?</span>
                <h3>Private transport may fit better</h3>
                <p className="muted">If you are carrying more luggage, need a direct ride or want personalized pickup times, private transport is usually the better option.</p>
                <Link className="btn btn--ghost" to={routes.privateTransport}>Compare with private transport</Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section shuttle-flow-section" aria-labelledby="shuttle-benefits-title">
          <motion.div
            className="shuttle-flow"
            style={{ "--flow-bg": `url(${asset("img/gallery/40.webp")})` }}
            variants={shuttleFlowVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="container shuttle-flow__inner">
              <motion.div className="shuttle-flow__panel" variants={shuttleFlowItemVariants}>
                <span className="shuttle-flow__eyebrow">Shared destination-to-destination service</span>
                <h2 id="shuttle-benefits-title">Shuttle that fits the route you already planned</h2>
                <p>
                  A practical option for travelers using common tourist routes and looking for a more affordable transfer.
                </p>
                <div className="shuttle-flow__actions" aria-label="Shuttle actions">
                  <a className="btn btn--primary" href="#shuttle-details">
                    View routes
                    <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
                  </a>
                  <a className="btn btn--ghost" href="#contact">Request shuttle</a>
                </div>
              </motion.div>

              <motion.div className="shuttle-flow__board" variants={shuttleFlowItemVariants}>
                <div className="shuttle-flow__route" aria-label="Popular shuttle corridor">
                  <Route size={18} strokeWidth={2.4} aria-hidden="true" />
                  {shuttleRoutePoints.map((point, index) => (
                    <span className="shuttle-flow__stop" key={point}>
                      <i aria-hidden="true" />
                      {point}
                      {index < shuttleRoutePoints.length - 1 ? <b aria-hidden="true" /> : null}
                    </span>
                  ))}
                </div>

                <div className="shuttle-flow__cards">
                  {shuttleBenefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <motion.article
                        className="shuttle-flow-card"
                        key={benefit.title}
                        variants={shuttleFlowItemVariants}
                        whileHover={{ y: -4, scale: 1.015 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      >
                        <span className="shuttle-flow-card__icon" aria-hidden="true">
                          <Icon size={22} strokeWidth={2.35} />
                        </span>
                        <div>
                          <h3>{benefit.title}</h3>
                          <p>{benefit.text}</p>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <ContactForm
          title="Request a shuttle quote"
          text="Send your pickup area, destination, travel date and number of travelers."
          placeholder="Example: We need a shuttle from San Jose to La Fortuna for 2 adults on June 14."
          buttonLabel="Send request"
        />
      </main>
    </SiteLayout>
  );
}
