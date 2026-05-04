import { useMemo, useState } from "react";
import { ContactForm } from "../components/ContactForm";
import { ImageGalleryModal } from "../components/ImageGalleryModal";
import { SiteLayout } from "../components/SiteLayout";
import { useCart } from "../context/CartContext";
import { jacoTours, routes, sanJoseTours } from "../lib/site";

const origins = [
  { value: "all", label: "All departures" },
  { value: "san-jose", label: "From San Jose" },
  { value: "jaco", label: "From Jaco" }
];

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function TourCard({ item, onAdd, onOpenGallery }) {
  return (
    <article className="card">
      <div className="card__media">
        <button type="button" aria-label={`View ${item.title} image`} onClick={() => onOpenGallery(item)}>
          <img src={item.image} alt={item.title} loading="lazy" />
        </button>
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span className="badge">{item.originLabel}</span>
          {item.locations.map((place) => <span key={place} className="badge">{place}</span>)}
        </div>
        <h3 className="card__title">{item.title}</h3>
        <p className="card__desc">{item.excerpt}</p>

        <div className="tags">
          <span className="badge">{item.difficulty}</span>
          {item.people ? <span className="badge">{item.people}</span> : null}
        </div>

        <div className="price-row">
          <div>
            <div className="muted" style={{ fontSize: 13 }}>Duration</div>
            <div style={{ fontWeight: 600 }}>{item.durationText}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="muted" style={{ fontSize: 13 }}>Price</div>
            <div className="price">{formatUSD(item.price)}</div>
          </div>
        </div>

        <button className="btn btn--primary card__cta" type="button" onClick={() => onAdd(item)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export function ToursPage() {
  const { addItem } = useCart();
  const [origin, setOrigin] = useState("all");
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("featured");
  const [galleryState, setGalleryState] = useState(null);

  const allTours = useMemo(() => [
    ...sanJoseTours.map((tour) => ({ ...tour, origin: "san-jose", originLabel: "From San Jose" })),
    ...jacoTours.map((tour) => ({ ...tour, origin: "jaco", originLabel: "From Jaco" }))
  ], []);

  const filteredTours = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const items = allTours.filter((item) => {
      const haystack = `${item.title} ${item.excerpt} ${item.originLabel} ${item.locations.join(" ")}`.toLowerCase();
      if (origin !== "all" && item.origin !== origin) return false;
      if (difficulty && item.difficulty !== difficulty) return false;
      if (normalizedQuery && !haystack.includes(normalizedQuery)) return false;
      return true;
    });

    if (sort === "price_asc") return [...items].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") return [...items].sort((a, b) => b.price - a.price);
    if (sort === "duration_asc") return [...items].sort((a, b) => a.durationHours - b.durationHours);
    return items;
  }, [allTours, difficulty, origin, query, sort]);

  const groupedTours = origins
    .filter((item) => item.value !== "all")
    .map((item) => ({
      ...item,
      tours: filteredTours.filter((tour) => tour.origin === item.value)
    }))
    .filter((item) => origin === "all" ? item.tours.length : item.value === origin);

  function addTourToCart(item) {
    addItem({
      id: `tour-${item.origin}-${item.title}`,
      type: "Tour",
      title: item.title,
      subtitle: item.excerpt,
      price: item.price,
      meta: [item.originLabel, ...item.locations, item.difficulty, item.durationText].filter(Boolean)
    });
  }

  function openTourGallery(item) {
    setGalleryState({
      title: item.title,
      gallery: item.gallery || [item.image],
      index: 0
    });
  }

  return (
    <SiteLayout
      homeTo={routes.home}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#"
    >
      <main>
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">Tours in Costa Rica</h1>
            <p className="muted">
              Choose your departure area and compare tours from San Jose or Jaco in one place.
            </p>

            <div className="service-pills" aria-label="Tour departure options">
              {origins.map((item) => (
                <button
                  key={item.value}
                  className={`tour-origin${origin === item.value ? " tour-origin--active" : ""}`}
                  type="button"
                  onClick={() => setOrigin(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="controls">
              <label className="control">
                Search
                <input
                  type="search"
                  placeholder="Tour, destination or departure..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <label className="control">
                Departure
                <select value={origin} onChange={(event) => setOrigin(event.target.value)}>
                  {origins.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>

              <label className="control">
                Difficulty
                <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                  <option value="">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>

              <label className="control">
                Sort
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price (low to high)</option>
                  <option value="price_desc">Price (high to low)</option>
                  <option value="duration_asc">Duration (short to long)</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="section service-summary">
          <div className="container summary-grid">
            <article className="summary-card">
              <h3>One tours page</h3>
              <p className="muted">Compare departures from both San Jose and Jaco without jumping between services.</p>
            </article>
            <article className="summary-card">
              <h3>Filter by starting point</h3>
              <p className="muted">Select where you are staying and see the tours that make sense from that area.</p>
            </article>
            <article className="summary-card">
              <h3>Build one cart</h3>
              <p className="muted">Add tours, rent a car and other services to request everything together.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container tours-sections">
            <div className="list-head">
              <p className="muted">Showing {filteredTours.length} tours</p>
            </div>

            {groupedTours.map((group) => (
              <div className="tour-group" key={group.value} id={group.value === "san-jose" ? "from-san-jose" : "from-jaco"}>
                <div className="sectionHead">
                  <div>
                    <h2>{group.label}</h2>
                    <p className="muted">
                      {group.value === "san-jose"
                        ? "Tours and experiences that work well when your base is San Jose."
                        : "Adventure, beach and wildlife options departing from Jaco."}
                    </p>
                  </div>
                </div>
                <div className="cards">
                  {group.tours.map((item) => (
                    <TourCard
                      key={`${item.origin}-${item.title}`}
                      item={item}
                      onAdd={addTourToCart}
                      onOpenGallery={openTourGallery}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredTours.length === 0 ? (
              <div className="empty">
                <h3>No tour results</h3>
                <p className="muted">Try another departure area, difficulty or search term.</p>
              </div>
            ) : null}
          </div>
        </section>

        <ContactForm
          text="Tell us your travel dates, departure area and the tours or services you want us to organize."
          placeholder="Tell us if you need tours from San Jose, tours from Jaco, transport, hotels, rent a car or a full package."
        />

        {galleryState ? (
          <ImageGalleryModal
            title={galleryState.title}
            gallery={galleryState.gallery}
            index={galleryState.index}
            onChangeIndex={(index) => setGalleryState((current) => ({ ...current, index }))}
            onClose={() => setGalleryState(null)}
          />
        ) : null}
      </main>
    </SiteLayout>
  );
}
