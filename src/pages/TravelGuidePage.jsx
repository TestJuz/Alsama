import { Link, useLocation } from "react-router-dom";
import { SiteLayout } from "../components/SiteLayout";
import { useLanguage } from "../context/LanguageContext";
import { asset, localizePath, routes, stripLanguagePrefix } from "../lib/site";

const guides = {
  "/guides/costa-rica-private-transfers": {
    hero: asset("img/gallery/Buseta.webp"),
    content: {
      en: {
        eyebrow: "Costa Rica travel guide",
        title: "Costa Rica Private Transfer Guide",
        intro: "Use this practical guide to compare common private transfer routes from San Jose, understand realistic travel times and plan stops, luggage and pickup details before you book.",
        sections: [
          ["San Jose to Jaco", "A common Pacific route for beach stays and short trips. Travel time depends heavily on traffic leaving San Jose and road conditions near the coast.", routes.toursJaco],
          ["San Jose to Manuel Antonio", "A longer Central Pacific transfer that works well for travelers combining wildlife, beach time and a multi-night stay.", routes.manuelAntonioDestination],
          ["San Jose to Arenal / La Fortuna", "A mountain route where weather, road works and sightseeing stops can affect timing. Many travelers combine the transfer with a hotel stay or full-day tour.", routes.arenalDestination],
          ["San Jose to Monteverde", "A scenic route with slower mountain roads near the destination. Vehicle choice, luggage space and pickup timing matter more than on short city transfers.", routes.privateTransport]
        ],
        tipsTitle: "What to confirm before departure",
        tips: [
          "Exact pickup hotel or airport terminal",
          "Passenger count and luggage quantity",
          "Child seats or accessibility needs",
          "Flight number for airport pickups",
          "Requested food, restroom or photo stops",
          "Final destination hotel and check-in time"
        ],
        cta: "Compare private transportation options",
        ctaText: "See Alsama's private transport service and request a route-specific quote.",
        faq: [
          ["Are private transfers door to door?", "Most private transfers are planned from the confirmed pickup point to the final hotel or agreed destination. Alsama confirms the exact route before booking."],
          ["Can we stop on the way?", "Short practical stops can often be coordinated. Longer sightseeing stops may change the schedule or price, so they should be confirmed in advance."],
          ["How early should airport pickups be planned?", "Allow extra time for immigration, baggage claim and Costa Rica traffic. Share the flight number so the pickup can be coordinated against the actual arrival."]
        ]
      },
      es: {
        eyebrow: "Guía de viaje por Costa Rica",
        title: "Guía de transporte privado en Costa Rica",
        intro: "Compara rutas comunes de transporte privado desde San José, tiempos de viaje realistas y detalles de equipaje, paradas y recogida antes de reservar.",
        sections: [
          ["San José a Jacó", "Una ruta frecuente hacia el Pacífico. El tiempo depende mucho del tráfico al salir de San José y de las condiciones de carretera cerca de la costa.", routes.toursJaco],
          ["San José a Manuel Antonio", "Un traslado más largo hacia el Pacífico Central, útil para combinar vida silvestre, playa y varias noches de hospedaje.", routes.manuelAntonioDestination],
          ["San José a Arenal / La Fortuna", "Una ruta de montaña donde el clima, obras y paradas pueden afectar el tiempo. Muchos viajeros la combinan con hotel o tour de día completo.", routes.arenalDestination],
          ["San José a Monteverde", "Ruta escénica con carreteras de montaña más lentas cerca del destino. Conviene confirmar vehículo, equipaje y hora de recogida.", routes.privateTransport]
        ],
        tipsTitle: "Qué confirmar antes de salir",
        tips: [
          "Hotel o terminal exacta de recogida",
          "Cantidad de pasajeros y equipaje",
          "Sillas infantiles o necesidades de accesibilidad",
          "Número de vuelo para recogidas en aeropuerto",
          "Paradas solicitadas para comida, baño o fotos",
          "Hotel final y hora estimada de check-in"
        ],
        cta: "Comparar transporte privado",
        ctaText: "Revisa el servicio de transporte privado de Alsama y solicita una cotización para tu ruta.",
        faq: [
          ["¿Los traslados privados son puerta a puerta?", "La mayoría se coordinan desde el punto de recogida confirmado hasta el hotel o destino acordado. Alsama confirma la ruta exacta antes de reservar."],
          ["¿Podemos hacer paradas?", "Normalmente se pueden coordinar paradas prácticas cortas. Las paradas turísticas más largas deben confirmarse porque pueden cambiar horario o precio."],
          ["¿Con cuánto tiempo debo planear una recogida en aeropuerto?", "Considera inmigración, equipaje y tráfico. Comparte el número de vuelo para coordinar la recogida con la llegada real."]
        ]
      },
      fr: {
        eyebrow: "Guide de voyage au Costa Rica",
        title: "Guide des transferts privés au Costa Rica",
        intro: "Comparez les itinéraires privés courants depuis San José, les temps de trajet réalistes et les détails de bagages, arrêts et prise en charge avant de réserver.",
        sections: [
          ["San José vers Jacó", "Un itinéraire fréquent vers le Pacifique. La durée dépend fortement du trafic à la sortie de San José et des conditions routières près de la côte.", routes.toursJaco],
          ["San José vers Manuel Antonio", "Un transfert plus long vers le Pacifique central, adapté aux séjours combinant faune, plage et plusieurs nuits.", routes.manuelAntonioDestination],
          ["San José vers Arenal / La Fortuna", "Une route de montagne où météo, travaux et arrêts peuvent modifier la durée. Beaucoup de voyageurs la combinent avec un hôtel ou une excursion.", routes.arenalDestination],
          ["San José vers Monteverde", "Une route panoramique avec des routes de montagne plus lentes près de la destination. Il est utile de confirmer véhicule, bagages et heure de prise en charge.", routes.privateTransport]
        ],
        tipsTitle: "À confirmer avant le départ",
        tips: [
          "Hôtel ou terminal exact de prise en charge",
          "Nombre de passagers et quantité de bagages",
          "Sièges enfant ou besoins d'accessibilité",
          "Numéro de vol pour une prise en charge à l'aéroport",
          "Arrêts souhaités pour repas, toilettes ou photos",
          "Hôtel final et heure d'arrivée prévue"
        ],
        cta: "Comparer le transport privé",
        ctaText: "Consultez le service de transport privé d'Alsama et demandez un devis adapté à votre itinéraire.",
        faq: [
          ["Les transferts privés sont-ils porte à porte ?", "La plupart sont coordonnés entre le point de prise en charge confirmé et l'hôtel ou la destination convenue. Alsama confirme l'itinéraire avant la réservation."],
          ["Peut-on faire des arrêts ?", "De courts arrêts pratiques peuvent généralement être coordonnés. Les arrêts touristiques plus longs doivent être confirmés à l'avance."],
          ["Combien de temps prévoir pour une prise en charge à l'aéroport ?", "Prévoyez l'immigration, les bagages et la circulation. Communiquez le numéro de vol pour coordonner la prise en charge avec l'arrivée réelle."]
        ]
      }
    }
  },
  "/guides/sjo-airport-transportation": {
    hero: asset("img/gallery/Private.webp"),
    content: {
      en: {
        eyebrow: "SJO airport guide",
        title: "San Jose Airport Transportation Guide",
        intro: "A practical starting point for travelers arriving at Juan Santamaria International Airport (SJO) and continuing to San Jose, Jaco, Arenal, Monteverde or Manuel Antonio.",
        sections: [
          ["SJO to San Jose", "Usually the simplest arrival transfer, but traffic can make a short distance take longer during busy periods.", routes.privateTransport],
          ["SJO to Jaco", "A direct Pacific transfer for travelers heading straight to the beach instead of staying in San Jose.", routes.toursJaco],
          ["SJO to Arenal", "A longer inland route toward La Fortuna and Arenal, commonly paired with hotel stays and nature activities.", routes.arenalDestination],
          ["SJO to Manuel Antonio", "A longer Pacific route toward Quepos and Manuel Antonio. Arrival time matters because the road trip can take several hours.", routes.manuelAntonioDestination]
        ],
        tipsTitle: "Arrival checklist",
        tips: [
          "Send the correct flight number",
          "Allow time for immigration and baggage claim",
          "Confirm the lead passenger's WhatsApp number",
          "Confirm luggage quantity before choosing a vehicle",
          "Keep the final hotel name and address available",
          "Plan food or restroom stops on longer routes"
        ],
        cta: "Request an airport transfer",
        ctaText: "Use the private transportation page to request an SJO pickup and destination-specific quote.",
        faq: [
          ["Is SJO in downtown San Jose?", "No. Juan Santamaria International Airport is in Alajuela, west of central San Jose, so route planning should use SJO as the pickup point rather than downtown San Jose."],
          ["What happens if immigration takes longer than expected?", "Share your flight details and keep contact information available. Pickup coordination should account for the actual arrival process rather than only the scheduled landing time."],
          ["Can I go directly from SJO to a beach or mountain destination?", "Yes. Private transportation can be arranged directly to destinations such as Jaco, Manuel Antonio, Arenal or Monteverde."]
        ]
      },
      es: {
        eyebrow: "Guía del aeropuerto SJO",
        title: "Guía de transporte desde el Aeropuerto de San José",
        intro: "Punto de partida para viajeros que llegan al Aeropuerto Internacional Juan Santamaría (SJO) y continúan hacia San José, Jacó, Arenal, Monteverde o Manuel Antonio.",
        sections: [
          ["SJO a San José", "Suele ser el traslado más sencillo al llegar, aunque el tráfico puede alargar bastante un trayecto corto.", routes.privateTransport],
          ["SJO a Jacó", "Traslado directo al Pacífico para viajeros que prefieren ir a la playa sin pasar una noche en San José.", routes.toursJaco],
          ["SJO a Arenal", "Ruta interior más larga hacia La Fortuna y Arenal, normalmente combinada con hotel y actividades de naturaleza.", routes.arenalDestination],
          ["SJO a Manuel Antonio", "Ruta larga hacia Quepos y Manuel Antonio. La hora de llegada importa porque el viaje puede tomar varias horas.", routes.manuelAntonioDestination]
        ],
        tipsTitle: "Checklist de llegada",
        tips: [
          "Enviar el número de vuelo correcto",
          "Considerar inmigración y retiro de equipaje",
          "Confirmar el WhatsApp del pasajero principal",
          "Confirmar cantidad de equipaje antes de elegir vehículo",
          "Tener disponible el nombre y dirección del hotel",
          "Planear paradas de comida o baño en rutas largas"
        ],
        cta: "Solicitar traslado desde el aeropuerto",
        ctaText: "Usa la página de transporte privado para solicitar recogida en SJO y una cotización según tu destino.",
        faq: [
          ["¿SJO está en el centro de San José?", "No. El Aeropuerto Internacional Juan Santamaría está en Alajuela, al oeste del centro de San José, por lo que la ruta debe planearse desde SJO."],
          ["¿Qué pasa si inmigración tarda más de lo esperado?", "Comparte los datos del vuelo y mantén disponible la información de contacto. La coordinación debe considerar el proceso real de llegada, no solo la hora programada."],
          ["¿Puedo ir directamente desde SJO a una playa o zona de montaña?", "Sí. Se puede coordinar transporte privado directo a Jacó, Manuel Antonio, Arenal o Monteverde."]
        ]
      },
      fr: {
        eyebrow: "Guide de l'aéroport SJO",
        title: "Guide des transports depuis l'aéroport de San José",
        intro: "Un point de départ pratique pour les voyageurs arrivant à l'aéroport international Juan Santamaría (SJO) et poursuivant vers San José, Jacó, Arenal, Monteverde ou Manuel Antonio.",
        sections: [
          ["SJO vers San José", "Le transfert le plus simple à l'arrivée, mais la circulation peut allonger fortement un trajet pourtant court.", routes.privateTransport],
          ["SJO vers Jacó", "Un transfert direct vers le Pacifique pour rejoindre la plage sans passer une nuit à San José.", routes.toursJaco],
          ["SJO vers Arenal", "Une route intérieure plus longue vers La Fortuna et Arenal, souvent combinée avec hôtel et activités nature.", routes.arenalDestination],
          ["SJO vers Manuel Antonio", "Une longue route vers Quepos et Manuel Antonio. L'heure d'arrivée est importante car le trajet peut prendre plusieurs heures.", routes.manuelAntonioDestination]
        ],
        tipsTitle: "Checklist d'arrivée",
        tips: [
          "Communiquer le bon numéro de vol",
          "Prévoir immigration et récupération des bagages",
          "Confirmer le numéro WhatsApp du passager principal",
          "Confirmer la quantité de bagages avant de choisir le véhicule",
          "Garder le nom et l'adresse de l'hôtel final",
          "Prévoir des arrêts repas ou toilettes sur les longs trajets"
        ],
        cta: "Demander un transfert aéroport",
        ctaText: "Utilisez la page de transport privé pour demander une prise en charge à SJO et un devis selon votre destination.",
        faq: [
          ["SJO se trouve-t-il dans le centre de San José ?", "Non. L'aéroport international Juan Santamaría se trouve à Alajuela, à l'ouest du centre de San José. L'itinéraire doit donc être planifié depuis SJO."],
          ["Que se passe-t-il si l'immigration prend plus de temps ?", "Partagez les informations de vol et gardez les coordonnées disponibles. La prise en charge doit tenir compte du processus réel d'arrivée."],
          ["Puis-je aller directement de SJO vers une plage ou une destination de montagne ?", "Oui. Un transport privé direct peut être organisé vers Jacó, Manuel Antonio, Arenal ou Monteverde."]
        ]
      }
    }
  }
};

export function TravelGuidePage() {
  const location = useLocation();
  const { language, localize } = useLanguage();
  const basePath = stripLanguagePrefix(location.pathname);
  const guide = guides[basePath];

  if (!guide) return null;

  const copy = guide.content[language] || guide.content.en;

  return (
    <SiteLayout
      homeTo={localize(routes.home)}
      contactTo="#contact"
      brandTo={localize(routes.home)}
      footerBackToTop="#top"
    >
      <main id="top">
        <section
          className="page-hero page-hero--image"
          style={{ "--hero-image": `url(${guide.hero})` }}
        >
          <div className="container">
            <p className="home-eyebrow">{copy.eyebrow}</p>
            <h1 className="page-title">{copy.title}</h1>
            <p className="muted">{copy.intro}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="cards">
              {copy.sections.map(([title, text, to]) => (
                <article className="card" key={title}>
                  <div className="card__body">
                    <h2 className="card__title">{title}</h2>
                    <p className="card__desc">{text}</p>
                    <Link className="btn btn--primary" to={localize(to)}>
                      {language === "es" ? "Ver ruta" : language === "fr" ? "Voir l'itinéraire" : "View route"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="sectionHead"><div><h2>{copy.tipsTitle}</h2></div></div>
            <div className="home-faqs">
              {copy.tips.map((tip) => <div className="card" key={tip}><div className="card__body"><p>{tip}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2>{copy.cta}</h2>
                <p className="muted">{copy.ctaText}</p>
              </div>
              <Link className="btn btn--primary" to={localize(routes.privateTransport)}>
                {language === "es" ? "Transporte privado" : language === "fr" ? "Transport privé" : "Private transportation"}
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="sectionHead">
              <div><h2>{language === "es" ? "Preguntas frecuentes" : language === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</h2></div>
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
      </main>
    </SiteLayout>
  );
}
