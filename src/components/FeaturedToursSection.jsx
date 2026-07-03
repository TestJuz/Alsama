import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ImageGalleryModal } from "./ImageGalleryModal";
import { TourBookingModal } from "./TourBookingModal";
import { useCart } from "../context/CartContext";
import { getAllTours, getTourDetailPath } from "../lib/site";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function FeaturedCard({ item, origin, originLabel, onOpenGallery, onBook }) {
  function handleAddToCart() {
    onBook(item, origin, originLabel);
  }

  return (
    <article className="card">
      <div className="card__media">
        <button type="button" aria-label={`View ${item.title} image`} onClick={() => onOpenGallery(item)}>
          <img src={item.image} alt={item.title} loading="lazy" />
        </button>
      </div>
      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        <p className="muted" style={{ margin: 0 }}>{item.summary}</p>

        <div className="card__meta">
          <span className="badge">{item.location}</span>
          <span className="badge">{item.difficulty}</span>
          {item.people ? <span className="badge">{item.people}</span> : null}
          <span className="badge">{item.duration}</span>
        </div>

        <div className="card__priceRow">
          <span className="price">{formatUSD(item.price)}</span>
          <div className="card__actions card__actions--inline">
            <Link className="btn btn--ghost" to={getTourDetailPath(item)}>View details</Link>
            <button className="btn btn--ghost" type="button" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedToursSection({ sanJoseTours, jacoTours, sanJoseHref, jacoHref }) {
  const { addItem } = useCart();
  const [galleryState, setGalleryState] = useState(null);
  const [tourRequest, setTourRequest] = useState(null);
  const allTours = useMemo(() => getAllTours(), []);

  function openGallery(item) {
    setGalleryState({
      title: item.title,
      gallery: item.gallery || [item.image],
      index: 0
    });
  }

  function openTourRequest(item, origin, originLabel) {
    const fullTour = allTours.find((tour) => tour.title === item.title && tour.origin === origin);
    setTourRequest(fullTour || {
      ...item,
      origin,
      originLabel,
      excerpt: item.summary,
      locations: item.location ? [item.location] : [],
      durationText: item.duration
    });
  }

  function addTourToCart(cartItem) {
    addItem(cartItem);
    setTourRequest(null);
  }

  return (
    <section className="section section--alt" id="tours">
      <div className="container">
        <div className="sectionHead" id="tours-sj">
          <div>
            <h2>Experiences from San Jose</h2>
            <p className="muted">Popular day tours you can combine with transfers, hotels and custom trip planning.</p>
          </div>
          <Link className="btn btn--ghost" to={sanJoseHref}>View All</Link>
        </div>

        <div className="cards" aria-live="polite">
          {sanJoseTours.map((item) => (
            <FeaturedCard
              key={item.title}
              item={item}
              origin="san-jose"
              originLabel="From San Jose"
              onOpenGallery={openGallery}
              onBook={openTourRequest}
            />
          ))}
        </div>

        <hr className="divider" />

        <div className="sectionHead" id="tours-jaco">
          <div>
            <h2>Experiences from Jaco</h2>
            <p className="muted">Adventure, beach and wildlife options that can be paired with transport and lodging.</p>
          </div>
          <Link className="btn btn--ghost" to={jacoHref}>View All</Link>
        </div>

        <div className="cards" aria-live="polite">
          {jacoTours.map((item) => (
            <FeaturedCard
              key={item.title}
              item={item}
              origin="jaco"
              originLabel="From Jaco"
              onOpenGallery={openGallery}
              onBook={openTourRequest}
            />
          ))}
        </div>
      </div>

      {tourRequest ? (
        <TourBookingModal
          tour={tourRequest}
          onClose={() => setTourRequest(null)}
          onAdd={addTourToCart}
        />
      ) : null}

      {galleryState ? (
        <ImageGalleryModal
          title={galleryState.title}
          gallery={galleryState.gallery}
          index={galleryState.index}
          onChangeIndex={(index) => setGalleryState((current) => ({ ...current, index }))}
          onClose={() => setGalleryState(null)}
        />
      ) : null}
    </section>
  );
}
