import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bus, CalendarClock, Leaf, ShipWheel, Sparkles, Utensils } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { Map, MapMarker, MapRoute, MarkerContent, MarkerPopup } from "./ui/map";
import { asset } from "../lib/site";
import {
  getActivePromotion,
  getNextPromotion,
  getPromotionCopy,
  getPromotionTimeLeft,
  isPromotionActive,
  limitedPromotions
} from "../lib/promotions";

const promoMapStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm"
    }
  ]
};

const countdownUnits = {
  en: ["Days", "Hours", "Minutes", "Seconds"],
  es: ["Dias", "Horas", "Minutos", "Segundos"],
  fr: ["Jours", "Heures", "Minutes", "Secondes"]
};

const includeIcons = [Bus, Utensils, ShipWheel];

function formatPrice(value) {
  return `$ ${value.toFixed(2)} USD`;
}

function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}

function PromoWordLoop({ words }) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2200);
    return () => window.clearInterval(timer);
  }, [reducedMotion, words.length]);

  return (
    <span className="promo-word-loop" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          className="promo-word-loop__word"
          key={words[index]}
          initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PromoFallback({ copy }) {
  return (
    <section className="home-section home-section--promos" id="promos" data-no-translate>
      <div className="container">
        <div className="promo-empty">
          <span className="home-eyebrow">{copy.eyebrow}</span>
          <h2>{copy.expiredTitle}</h2>
          <p>{copy.expiredBody}</p>
        </div>
      </div>
    </section>
  );
}

export function LimitedPromosSection() {
  const now = useNow();
  const { addItem } = useCart();
  const { language } = useLanguage();
  const activePromotion = getActivePromotion(now);
  const nextPromotion = getNextPromotion(now);
  const promotion = activePromotion || nextPromotion;
  const copy = getPromotionCopy(promotion || limitedPromotions[0], language);
  const reducedMotion = useReducedMotion();

  const timeLeft = useMemo(
    () => (promotion ? getPromotionTimeLeft(promotion, now) : null),
    [promotion, now]
  );
  const labels = countdownUnits[language] || countdownUnits.en;
  const isActive = promotion ? isPromotionActive(promotion, now) : false;

  function addPromotionToRequest() {
    addItem({
      id: `promotion-${promotion.id}`,
      type: copy.eyebrow,
      title: copy.title,
      subtitle: copy.tagline,
      meta: [
        copy.validUntil,
        ...promotion.packages.map((item) =>
          `${copy.packages[item.id]}: ${item.prices
            .map((rate) => `${copy.rooms[rate.room]} ${formatPrice(rate.price)}`)
            .join(" / ")}`
        ),
        `${copy.includesTitle}: ${copy.includes.join(", ")}`,
        `${copy.excludesTitle}: ${copy.excludes.join(", ")}`
      ]
    });
  }
  if (!promotion || !isActive) {
    const fallbackCopy = promotion ? copy : getPromotionCopy(limitedPromotions[0], language);
    return <PromoFallback copy={fallbackCopy} />;
  }

  return (
    <section className="home-section home-section--promos" id="promos" data-no-translate>
      <div className="container promo-shell">
        <motion.div
          className="promo-visual"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={asset(promotion.image)} alt={`${copy.title} ${copy.tagline}`} loading="lazy" />
          <div className="promo-visual__shade" />
          <div className="promo-visual__copy">
            <span>{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
            <p>{copy.tagline}</p>
            <PromoWordLoop words={copy.loopWords} />
          </div>
        </motion.div>

        <div className="promo-board">
          <div className="promo-board__head">
            <div>
              <span className="home-eyebrow">{copy.validUntil}</span>
              <h2>{copy.title}</h2>
              <p>{copy.intro}</p>
            </div>
            <Link className="home-btn home-btn--primary" to={promotion.href} onClick={addPromotionToRequest}>
              {copy.cta}
            </Link>
          </div>

          <div className="promo-countdown" aria-label={copy.countdownLabel}>
            <strong><CalendarClock size={18} aria-hidden="true" /> {copy.countdownLabel}</strong>
            <div>
              {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                <span key={unit}>
                  <b>{String(timeLeft[unit]).padStart(2, "0")}</b>
                  <small>{labels[index]}</small>
                </span>
              ))}
            </div>
          </div>

          <div className="promo-includes">
            <div>
              <strong>{copy.includesTitle}</strong>
              <ul>
                {copy.includes.map((item, index) => {
                  const Icon = includeIcons[index] || Sparkles;
                  return (
                    <li key={item}>
                      <Icon size={18} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <strong>{copy.excludesTitle}</strong>
              <p>{copy.excludes.join(", ")}</p>
            </div>
          </div>

          <div className="promo-rate-grid" aria-label={copy.rateLabel}>
            {promotion.packages.map((item) => (
              <article className="promo-rate-card" key={item.id}>
                <header>
                  <h3>{copy.packages[item.id]}</h3>
                  <span>{copy.rateLabel}</span>
                </header>
                <dl>
                  {item.prices.map((rate) => (
                    <div key={`${item.id}-${rate.room}`}>
                      <dt>{copy.rooms[rate.room]}</dt>
                      <dd>{formatPrice(rate.price)}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="promo-map-row">
            <div className="promo-map" aria-label={copy.mapLabel}>
              <Map
                theme="light"
                styles={{ light: promoMapStyle, dark: promoMapStyle }}
                center={[-83.82, 10.22]}
                zoom={7.05}
                pitch={20}
                interactive={false}
              >
                <MapRoute
                  id="promo-tortuguero-route"
                  coordinates={promotion.route}
                  color="#d7a646"
                  width={5}
                  opacity={0.95}
                  interactive={false}
                />
                {promotion.markers.map((marker) => (
                  <MapMarker key={marker.id} longitude={marker.coords[0]} latitude={marker.coords[1]}>
                    <MarkerContent>
                      <span className={`promo-map__marker promo-map__marker--${marker.id}`} />
                    </MarkerContent>
                    <MarkerPopup className="promo-map__popup">
                      <strong>{marker.id === "san-jose" ? "San Jose" : "Tortuguero"}</strong>
                    </MarkerPopup>
                  </MapMarker>
                ))}
              </Map>
            </div>
            <div className="promo-note">
              <Leaf size={20} aria-hidden="true" />
              <p>{copy.perPerson}</p>
              <div>
                {copy.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
