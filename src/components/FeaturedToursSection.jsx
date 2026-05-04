import { Link } from "react-router-dom";
import { useState } from "react";
import { ImageGalleryModal } from "./ImageGalleryModal";
import { useCart } from "../context/CartContext";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function FeaturedCard({ item, onOpenGallery }) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      id: `tour-${item.title}`,
      type: "Tour",
      title: item.title,
      subtitle: item.summary,
      price: item.price,
      meta: [item.location, item.difficulty, item.duration].filter(Boolean)
    });
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
          <button className="btn btn--ghost" type="button" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedToursSection({ sanJoseTours, jacoTours, sanJoseHref, jacoHref }) {
  const [galleryState, setGalleryState] = useState(null);

  function openGallery(item) {
    setGalleryState({
      title: item.title,
      gallery: item.gallery || [item.image],
      index: 0
    });
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
          {sanJoseTours.map((item) => <FeaturedCard key={item.title} item={item} onOpenGallery={openGallery} />)}
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
          {jacoTours.map((item) => <FeaturedCard key={item.title} item={item} onOpenGallery={openGallery} />)}
        </div>
      </div>

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
