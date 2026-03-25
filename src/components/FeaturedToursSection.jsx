import { Link } from "react-router-dom";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function FeaturedCard({ item }) {
  return (
    <article className="card">
      <div className="card__media">
        <img src={item.image} alt={item.title} loading="lazy" />
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
          <a className="btn btn--ghost" href="#contact">Request Info</a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedToursSection({ sanJoseTours, jacoTours, sanJoseHref, jacoHref }) {
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
          {sanJoseTours.map((item) => <FeaturedCard key={item.title} item={item} />)}
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
          {jacoTours.map((item) => <FeaturedCard key={item.title} item={item} />)}
        </div>
      </div>
    </section>
  );
}
