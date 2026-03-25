import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { SiteLayout } from "./SiteLayout";
import { homeLinks, routes } from "../lib/site";

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function ToursListingPage({
  title,
  intro,
  servicePills,
  summaryCards,
  tours,
  contactText,
  contactPlaceholder
}) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const locations = [...new Set(tours.flatMap((item) => item.locations))];

  let filtered = tours.filter((item) => {
    const haystack = `${item.title} ${item.excerpt} ${item.locations.join(" ")}`.toLowerCase();
    if (query && !haystack.includes(query.toLowerCase())) return false;
    if (difficulty && item.difficulty !== difficulty) return false;
    if (location && !item.locations.includes(location)) return false;
    return true;
  });

  if (sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "duration_asc") filtered = [...filtered].sort((a, b) => a.durationHours - b.durationHours);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <SiteLayout
      homeTo={routes.home}
      servicesTo={homeLinks.services}
      contactTo="#contact"
      brandTo={routes.home}
      footerBackToTop="#"
    >
      <main>
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title">{title}</h1>
            <p className="muted">{intro}</p>

            <div className="service-pills" aria-label="Service types">
              {servicePills.map((item) => <span key={item} className="service-pill">{item}</span>)}
            </div>

            <div className="controls">
              <label className="control">
                Search
                <input
                  type="search"
                  placeholder="Tour, destination or service..."
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                />
              </label>

              <label className="control">
                Difficulty
                <select
                  value={difficulty}
                  onChange={(event) => {
                    setDifficulty(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>

              <label className="control">
                Location
                <select
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All</option>
                  {locations.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <label className="control">
                Sort
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    setPage(1);
                  }}
                >
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
            {summaryCards.map((card) => (
              <article key={card.title} className="summary-card">
                <h3>{card.title}</h3>
                <p className="muted">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="list-head">
              <p className="muted">Showing {filtered.length} experiences</p>
              <div className="pager">
                <button className="btn btn--ghost" type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage <= 1}>Prev</button>
                <span className="muted">Page {currentPage} of {pages}</span>
                <button className="btn btn--ghost" type="button" onClick={() => setPage((value) => Math.min(pages, value + 1))} disabled={currentPage >= pages}>Next</button>
              </div>
            </div>

            <div className="cards">
              {pageItems.map((item) => (
                <article key={item.title} className="card">
                  <div className="card__media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="card__body">
                    <h3 className="card__title">{item.title}</h3>
                    <p className="card__desc">{item.excerpt}</p>

                    <div className="tags">
                      {item.locations.map((place) => <span key={place} className="badge">{place}</span>)}
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

                    <a className="btn btn--primary card__cta" href="#contact">Request details</a>

                    <div className="subblock">
                      <p className="subblock__title">Next departures</p>
                      <div className="departures">
                        {item.nextDepartures.map((departure) => (
                          <span key={departure.date} className="chip">{departure.date} ({departure.status})</span>
                        ))}
                      </div>

                      <p className="subblock__title">Availability</p>
                      <div className="months">
                        {item.availabilityMonths.map((month) => <span key={month} className="month">{month}</span>)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="empty">
                <h3>No results</h3>
                <p className="muted">Try changing filters or search terms.</p>
              </div>
            ) : null}
          </div>
        </section>

        <ContactForm
          text={contactText}
          placeholder={contactPlaceholder}
        />
      </main>
    </SiteLayout>
  );
}
