import { Link, useLocation } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { SiteLayout } from "../components/SiteLayout";
import { useLanguage } from "../context/LanguageContext";
import { getAllTours, getTourDetailPath, localizePath, routes, stripLanguagePrefix } from "../lib/site";

const landingPages = {
  "/tours/san-jose": {
    filter: (tour) => tour.origin === "san-jose",
    content: {
      en: {
        eyebrow: "Tours from San Jose",
        title: "Tours from San Jose, Costa Rica",
        intro: "Explore day tours and guided experiences departing from San Jose, with options for volcanoes, wildlife, beaches, waterfalls and cultural attractions.",
        body: "San Jose is a practical base for travelers who want to reach several of Costa Rica's most popular destinations without changing hotels. These tours combine organized transportation with local activities and clear pickup planning.",
        cta: "Ask us to plan your San Jose tours",
        faq: [
          ["Where do tours from San Jose pick up?", "Pickup depends on the tour and hotel location. Send your hotel name when requesting a quote so the team can confirm the closest pickup option."],
          ["Can I combine tours with airport transport?", "Yes. Alsama Tours can coordinate tours, private transportation, shared shuttles, hotels and car rentals in the same travel plan."],
          ["Are these tours suitable for one-day trips?", "The catalog includes both half-day and full-day options. Duration is shown on each tour page."]
        ]
      },
      es: {
        eyebrow: "Tours desde San José",
        title: "Tours desde San José, Costa Rica",
        intro: "Explora tours de un día y experiencias guiadas desde San José, con opciones de volcanes, vida silvestre, playas, cataratas y cultura.",
        body: "San José es una base práctica para visitar varios de los destinos más conocidos de Costa Rica sin cambiar de hotel. Estos tours combinan transporte organizado, actividades locales y coordinación clara de recogida.",
        cta: "Pídenos organizar tus tours desde San José",
        faq: [
          ["¿Dónde recogen los tours desde San José?", "La recogida depende del tour y de la ubicación del hotel. Envía el nombre de tu hotel al solicitar la cotización para confirmar la opción más cercana."],
          ["¿Puedo combinar tours con transporte al aeropuerto?", "Sí. Alsama Tours puede coordinar tours, transporte privado, shuttles compartidos, hoteles y alquiler de autos en un mismo itinerario."],
          ["¿Hay opciones de un solo día?", "El catálogo incluye opciones de medio día y día completo. La duración aparece en cada página de tour."]
        ]
      },
      fr: {
        eyebrow: "Excursions depuis San José",
        title: "Excursions depuis San José, Costa Rica",
        intro: "Découvrez des excursions et expériences guidées au départ de San José vers des volcans, la faune, les plages, les cascades et les sites culturels.",
        body: "San José est une base pratique pour visiter plusieurs destinations majeures du Costa Rica sans changer d'hôtel. Ces excursions combinent transport organisé, activités locales et coordination claire de la prise en charge.",
        cta: "Demandez-nous d'organiser vos excursions depuis San José",
        faq: [
          ["Où se fait la prise en charge à San José ?", "La prise en charge dépend de l'excursion et de l'emplacement de l'hôtel. Indiquez votre hôtel lors de la demande de devis."],
          ["Puis-je combiner les excursions avec un transfert aéroport ?", "Oui. Alsama Tours peut coordonner excursions, transport privé, navettes partagées, hôtels et location de voiture."],
          ["Existe-t-il des excursions à la journée ?", "Le catalogue comprend des options d'une demi-journée et d'une journée complète. La durée figure sur chaque page."]
        ]
      }
    }
  },
  "/tours/jaco": {
    filter: (tour) => tour.origin === "jaco",
    content: {
      en: {
        eyebrow: "Tours from Jaco",
        title: "Tours from Jaco, Costa Rica",
        intro: "Find adventure, wildlife, rainforest and ocean experiences departing from Jaco and the Central Pacific area.",
        body: "Jaco is well positioned for rafting, waterfalls, mangroves, national parks and marine excursions. Use this page to compare tours that make logistical sense from the Central Pacific instead of sorting through options from other regions.",
        cta: "Ask us to plan your Jaco tours",
        faq: [
          ["What kinds of tours leave from Jaco?", "Options include rafting, waterfalls, aerial tram experiences, mangroves, national parks, island trips and other Central Pacific activities."],
          ["Do you arrange pickup in the Jaco area?", "Pickup availability varies by tour and hotel. Share your accommodation when requesting a quote so the route can be confirmed."],
          ["Can I combine a Jaco tour with private transportation?", "Yes. Private transport can be coordinated before or after a tour as part of the same itinerary."]
        ]
      },
      es: {
        eyebrow: "Tours desde Jacó",
        title: "Tours desde Jacó, Costa Rica",
        intro: "Encuentra experiencias de aventura, vida silvestre, bosque tropical y océano desde Jacó y el Pacífico Central.",
        body: "Jacó tiene una ubicación conveniente para rafting, cataratas, manglares, parques nacionales y excursiones marinas. Esta página reúne opciones que tienen sentido logístico desde el Pacífico Central.",
        cta: "Pídenos organizar tus tours desde Jacó",
        faq: [
          ["¿Qué tipos de tours salen desde Jacó?", "Hay opciones de rafting, cataratas, teleférico, manglares, parques nacionales, islas y otras actividades del Pacífico Central."],
          ["¿Ofrecen recogida en Jacó?", "La disponibilidad depende del tour y del hotel. Comparte tu alojamiento al pedir la cotización para confirmar la ruta."],
          ["¿Puedo combinar un tour con transporte privado?", "Sí. Se puede coordinar transporte privado antes o después del tour dentro del mismo itinerario."]
        ]
      },
      fr: {
        eyebrow: "Excursions depuis Jacó",
        title: "Excursions depuis Jacó, Costa Rica",
        intro: "Découvrez des expériences d'aventure, de faune, de forêt tropicale et d'océan au départ de Jacó et du Pacifique central.",
        body: "Jacó est bien situé pour le rafting, les cascades, les mangroves, les parcs nationaux et les excursions marines. Cette page regroupe les options adaptées au Pacifique central.",
        cta: "Demandez-nous d'organiser vos excursions depuis Jacó",
        faq: [
          ["Quels types d'excursions partent de Jacó ?", "Les options incluent rafting, cascades, téléphérique, mangroves, parcs nationaux, îles et autres activités du Pacifique central."],
          ["Proposez-vous une prise en charge à Jacó ?", "La disponibilité dépend de l'excursion et de l'hôtel. Indiquez votre hébergement lors de la demande de devis."],
          ["Puis-je combiner une excursion avec un transport privé ?", "Oui. Le transport privé peut être coordonné avant ou après l'excursion dans le même itinéraire."]
        ]
      }
    }
  },
  "/destinations/manuel-antonio": {
    filter: (tour) => tour.locations.some((place) => ["Manuel Antonio", "Quepos"].includes(place)),
    content: {
      en: {
        eyebrow: "Manuel Antonio",
        title: "Manuel Antonio Tours and Day Trips",
        intro: "Plan a Manuel Antonio experience with guided wildlife walks, Pacific scenery and beach time, including options departing from San Jose.",
        body: "Manuel Antonio combines rainforest, wildlife and beaches in a compact destination. For travelers based in San Jose, an organized day trip can simplify the long transfer, park logistics and pickup coordination.",
        cta: "Plan a Manuel Antonio trip",
        faq: [
          ["Can I visit Manuel Antonio from San Jose in one day?", "Yes. Alsama Tours lists a full-day option from San Jose. Expect an early departure and a long day because of the driving distance."],
          ["What can I see in Manuel Antonio?", "Typical highlights include rainforest trails, monkeys, sloths, tropical birds, coastal viewpoints and beach time."],
          ["Is transportation included?", "Check the individual tour page for the current inclusions and request confirmation for your hotel pickup location."]
        ]
      },
      es: {
        eyebrow: "Manuel Antonio",
        title: "Tours y excursiones a Manuel Antonio",
        intro: "Planea una experiencia en Manuel Antonio con caminatas guiadas, vida silvestre, paisajes del Pacífico y tiempo de playa, incluyendo opciones desde San José.",
        body: "Manuel Antonio combina bosque tropical, fauna y playas en un destino compacto. Para viajeros en San José, una excursión organizada facilita el traslado, la logística del parque y la recogida.",
        cta: "Planear un viaje a Manuel Antonio",
        faq: [
          ["¿Puedo visitar Manuel Antonio desde San José en un día?", "Sí. Alsama Tours ofrece una opción de día completo desde San José. Espera una salida temprana y un día largo por la distancia."],
          ["¿Qué puedo ver en Manuel Antonio?", "Los atractivos habituales incluyen senderos, monos, perezosos, aves tropicales, miradores y playa."],
          ["¿Incluye transporte?", "Revisa la página del tour para conocer las inclusiones actuales y confirma la recogida en tu hotel."]
        ]
      },
      fr: {
        eyebrow: "Manuel Antonio",
        title: "Excursions à Manuel Antonio",
        intro: "Planifiez Manuel Antonio avec balades guidées, faune tropicale, paysages du Pacifique et temps à la plage, y compris depuis San José.",
        body: "Manuel Antonio réunit forêt tropicale, faune et plages. Pour les voyageurs basés à San José, une excursion organisée simplifie le transfert, la logistique du parc et la prise en charge.",
        cta: "Planifier Manuel Antonio",
        faq: [
          ["Puis-je visiter Manuel Antonio depuis San José en une journée ?", "Oui. Une option à la journée est proposée depuis San José. Le départ est matinal en raison de la distance."],
          ["Que peut-on voir à Manuel Antonio ?", "Les points forts comprennent sentiers, singes, paresseux, oiseaux tropicaux, panoramas côtiers et plage."],
          ["Le transport est-il inclus ?", "Consultez la page de l'excursion pour les inclusions actuelles et confirmez la prise en charge à votre hôtel."]
        ]
      }
    }
  },
  "/destinations/arenal": {
    filter: (tour) => tour.locations.some((place) => ["Arenal", "La Fortuna"].includes(place)),
    content: {
      en: {
        eyebrow: "Arenal & La Fortuna",
        title: "Arenal Volcano and La Fortuna Tours",
        intro: "Explore Arenal and La Fortuna with volcano viewpoints, hot springs and scenic routes from Costa Rica's Central Valley.",
        body: "Arenal is one of Costa Rica's best-known inland destinations. Travelers often combine volcano views, hot springs, nature and stops in traditional towns on a full-day route from San Jose.",
        cta: "Plan an Arenal trip",
        faq: [
          ["Can I visit Arenal from San Jose?", "Yes. Full-day routes can connect San Jose with the Arenal and La Fortuna area, although driving times make it a long excursion."],
          ["What is included in an Arenal tour?", "Inclusions vary by product. Check the tour page for transportation, meals, activities and hot-spring access before booking."],
          ["Can I stay overnight instead?", "Yes. Alsama Tours can also help coordinate hotels and transportation if you prefer to make Arenal part of a multi-day itinerary."]
        ]
      },
      es: {
        eyebrow: "Arenal y La Fortuna",
        title: "Tours al Volcán Arenal y La Fortuna",
        intro: "Explora Arenal y La Fortuna con miradores del volcán, aguas termales y rutas escénicas desde el Valle Central.",
        body: "Arenal es uno de los destinos interiores más conocidos de Costa Rica. Es común combinar vistas del volcán, aguas termales, naturaleza y pueblos tradicionales en una ruta de día completo desde San José.",
        cta: "Planear un viaje a Arenal",
        faq: [
          ["¿Puedo visitar Arenal desde San José?", "Sí. Hay rutas de día completo desde San José hacia Arenal y La Fortuna, aunque el tiempo de carretera hace que sea una excursión larga."],
          ["¿Qué incluye un tour a Arenal?", "Las inclusiones varían. Revisa la página del tour para confirmar transporte, comidas, actividades y acceso a aguas termales."],
          ["¿Puedo quedarme una noche?", "Sí. Alsama Tours también puede coordinar hoteles y transporte para convertir Arenal en parte de un itinerario de varios días."]
        ]
      },
      fr: {
        eyebrow: "Arenal & La Fortuna",
        title: "Excursions au volcan Arenal et à La Fortuna",
        intro: "Découvrez Arenal et La Fortuna avec vues sur le volcan, sources chaudes et itinéraires panoramiques depuis la Vallée centrale.",
        body: "Arenal est l'une des destinations intérieures les plus connues du Costa Rica. Les voyageurs combinent souvent vues sur le volcan, sources chaudes, nature et villages traditionnels lors d'une longue journée depuis San José.",
        cta: "Planifier Arenal",
        faq: [
          ["Puis-je visiter Arenal depuis San José ?", "Oui. Des itinéraires à la journée relient San José à Arenal et La Fortuna, mais les temps de route rendent la journée longue."],
          ["Que comprend une excursion à Arenal ?", "Les inclusions varient. Consultez la page de l'excursion pour confirmer transport, repas, activités et accès aux sources chaudes."],
          ["Puis-je passer une nuit sur place ?", "Oui. Alsama Tours peut aussi coordonner hôtels et transport pour intégrer Arenal à un itinéraire de plusieurs jours."]
        ]
      }
    }
  }
};

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function DestinationLandingPage() {
  const location = useLocation();
  const { language, localize, t } = useLanguage();
  const basePath = stripLanguagePrefix(location.pathname);
  const page = landingPages[basePath];

  if (!page) return null;

  const copy = page.content[language] || page.content.en;
  const tours = getAllTours().filter(page.filter);

  return (
    <SiteLayout
      homeTo={localize(routes.home)}
      contactTo="#contact"
      brandTo={localize(routes.home)}
      footerBackToTop="#top"
    >
      <main id="top">
        <section className="page-hero page-hero--image page-hero--tours">
          <div className="container">
            <p className="home-eyebrow">{copy.eyebrow}</p>
            <h1 className="page-title">{copy.title}</h1>
            <p className="muted">{copy.intro}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>{copy.title}</h2>
                <p className="muted">{copy.body}</p>
              </div>
            </div>

            <div className="cards">
              {tours.map((tour) => (
                <article className="card" key={tour.slug}>
                  <div className="card__media">
                    <img src={tour.image} alt={`${tour.title} in Costa Rica`} loading="lazy" decoding="async" />
                  </div>
                  <div className="card__body">
                    <div className="card__meta">
                      <span className="badge">{t(tour.originLabel)}</span>
                      {tour.locations.slice(0, 2).map((place) => <span className="badge" key={place}>{place}</span>)}
                    </div>
                    <h3 className="card__title">{t(tour.title)}</h3>
                    <p className="card__desc">{t(tour.excerpt)}</p>
                    <div className="price-row">
                      <div><span className="muted">{t(tour.durationText)}</span></div>
                      <div className="price">{formatUSD(tour.price)}</div>
                    </div>
                    <Link className="btn btn--primary" to={localize(getTourDetailPath(tour))}>
                      {language === "es" ? "Ver tour" : language === "fr" ? "Voir l'excursion" : "View tour"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>{language === "es" ? "Preguntas frecuentes" : language === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</h2>
              </div>
            </div>
            <div className="home-faqs">
              {copy.faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactForm
          title={copy.cta}
          text={copy.intro}
          placeholder={language === "es" ? "Indica tus fechas, hotel y número de viajeros." : language === "fr" ? "Indiquez vos dates, votre hôtel et le nombre de voyageurs." : "Tell us your dates, hotel and number of travelers."}
        />
      </main>
    </SiteLayout>
  );
}
