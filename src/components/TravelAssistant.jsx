import { Database, MessageCircle, Search, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  answerTravelQuestion,
  searchTravelAssistantItems,
  travelAssistantCategories,
  travelAssistantStats
} from "../lib/travelAssistantData";
import { asset } from "../lib/site";

const TYPING_STEP_MS = 18;
const TYPING_CHARS_PER_STEP = 3;

const suggestions = [
  "Tours de playa",
  "Tours from Jaco",
  "Hoteles en Arenal",
  "Rent a car SUV",
  "Transporte privado a Manuel Antonio",
  "Shuttle to Puerto Viejo"
];

function AssistantResult({ item, onNavigate }) {
  return (
    <article className="assistant-result">
      <div>
        <span>{item.eyebrow}</span>
        <h4>{item.label}</h4>
        <p>{item.description}</p>
      </div>
      <div className="assistant-result__side">
        <strong>{item.price}</strong>
        <Link to={item.href} onClick={onNavigate}>View more / Ver mas</Link>
      </div>
    </article>
  );
}

export function TravelAssistant() {
  const messagesRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Travel catalog ready / Catalogo listo",
      body: "Ask in English or Spanish about tours, hotels, rent a car, shuttles or private transport. Puedes preguntar en ingles o espanol.",
      items: searchTravelAssistantItems("", "all", 4)
    }
  ]);
  const [catalogQuery, setCatalogQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [typing, setTyping] = useState(null);

  const catalogItems = useMemo(
    () => searchTravelAssistantItems(catalogQuery, category, 18),
    [catalogQuery, category]
  );

  useEffect(() => {
    if (!open || activeTab !== "chat") return;

    window.requestAnimationFrame(() => {
      const container = messagesRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  }, [activeTab, messages, open, typing]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  function closePanel() {
    setOpen(false);
  }

  function revealAnswer(answer, nextLength = TYPING_CHARS_PER_STEP) {
    const visibleBody = answer.body.slice(0, nextLength);
    const done = nextLength >= answer.body.length;

    setTyping({ ...answer, body: visibleBody, done });

    if (done) {
      typingTimeoutRef.current = window.setTimeout(() => {
        setMessages((current) => [...current, { role: "assistant", ...answer }]);
        setTyping(null);
      }, 140);
      return;
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      revealAnswer(answer, nextLength + TYPING_CHARS_PER_STEP);
    }, TYPING_STEP_MS);
  }

  function ask(nextQuestion) {
    const value = nextQuestion.trim();
    if (!value) return;

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    const answer = answerTravelQuestion(value);
    setMessages((current) => [...current, { role: "user", body: value }]);
    setTyping({ role: "assistant", title: "Alsama is checking / buscando", body: "", items: [], done: false });
    setQuestion("");
    setActiveTab("chat");

    typingTimeoutRef.current = window.setTimeout(() => {
      revealAnswer(answer);
    }, 360);
  }

  function submitQuestion(event) {
    event.preventDefault();
    ask(question);
  }

  return (
    <div className="travel-assistant">
      {open ? (
        <section className="assistant-panel" aria-label="Alsama travel assistant">
          <header className="assistant-panel__head">
            <div>
              <span className="assistant-panel__eyebrow">Alsama assistant / asistente</span>
              <h3>Travel information / Informacion</h3>
            </div>
            <button type="button" aria-label="Close assistant" onClick={closePanel}>
              <X size={18} />
            </button>
          </header>

          <div className="assistant-stats" aria-label="Catalog summary">
            <span>{travelAssistantStats.tours} tours</span>
            <span>{travelAssistantStats.hotels} hotels</span>
            <span>{travelAssistantStats.privateRoutes} routes</span>
          </div>

          <div className="assistant-tabs" role="tablist" aria-label="Assistant view">
            <button
              type="button"
              className={activeTab === "chat" ? "assistant-tab assistant-tab--active" : "assistant-tab"}
              onClick={() => setActiveTab("chat")}
            >
              <MessageCircle size={16} />
              Chat
            </button>
            <button
              type="button"
              className={activeTab === "catalog" ? "assistant-tab assistant-tab--active" : "assistant-tab"}
              onClick={() => setActiveTab("catalog")}
            >
              <Database size={16} />
              Catalogo
            </button>
          </div>

          {activeTab === "chat" ? (
            <>
              <div className="assistant-messages" ref={messagesRef}>
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`assistant-message assistant-message--${message.role}`}
                  >
                    {message.title ? <strong>{message.title}</strong> : null}
                    <p>{message.body}</p>
                    {message.items?.length ? (
                      <div className="assistant-message__results">
                        {message.items.slice(0, 3).map((item, resultIndex) => (
                          <AssistantResult
                            key={`${item.type}-${item.label}-${item.eyebrow}-${resultIndex}`}
                            item={item}
                            onNavigate={closePanel}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}

                {typing ? (
                  <div className="assistant-message assistant-message--assistant assistant-message--typing">
                    {typing.title ? <strong>{typing.title}</strong> : null}
                    {typing.body ? <p>{typing.body}</p> : <span className="assistant-typingDots" aria-label="Alsama is typing"><i /><i /><i /></span>}
                    {typing.done && typing.items?.length ? (
                      <div className="assistant-message__results">
                        {typing.items.slice(0, 3).map((item, resultIndex) => (
                          <AssistantResult
                            key={`${item.type}-${item.label}-${item.eyebrow}-${resultIndex}`}
                            item={item}
                            onNavigate={closePanel}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="assistant-suggestions" aria-label="Suggested questions">
                {suggestions.map((item) => (
                  <button key={item} type="button" onClick={() => ask(item)}>
                    {item}
                  </button>
                ))}
              </div>

              <form className="assistant-form" onSubmit={submitQuestion}>
                <label className="sr-only" htmlFor="assistantQuestion">Ask or pregunta sobre viajes</label>
                <input
                  id="assistantQuestion"
                  disabled={Boolean(typing)}
                  placeholder="Ask / pregunta por tours, hoteles, rutas..."
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                />
                <button type="submit" aria-label="Send question" disabled={Boolean(typing)}>
                  <Send size={17} />
                </button>
              </form>
            </>
          ) : (
            <div className="assistant-catalog">
              <label className="assistant-search">
                <Search size={16} />
                <input
                  type="search"
                  placeholder="Search / buscar en todo el catalogo..."
                  value={catalogQuery}
                  onChange={(event) => setCatalogQuery(event.target.value)}
                />
              </label>

              <div className="assistant-categories" aria-label="Catalog categories">
                {travelAssistantCategories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={category === item.id ? "assistant-category assistant-category--active" : "assistant-category"}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="assistant-catalog__list">
                {catalogItems.map((item, resultIndex) => (
                  <AssistantResult
                    key={`${item.type}-${item.label}-${item.eyebrow}-${resultIndex}`}
                    item={item}
                    onNavigate={closePanel}
                  />
                ))}
              </div>

              {!catalogItems.length ? (
                <p className="assistant-empty">No matches found / Sin resultados. Try another destination, service or vehicle type.</p>
              ) : null}
            </div>
          )}
        </section>
      ) : null}

      <button
        className="assistant-fab assistant-fab--avatar"
        type="button"
        aria-label="Open Alsama chat"
        aria-expanded={open}
        style={{ "--assistant-avatar": `url(${asset("img/gallery/OsoPerezoso.png")})` }}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="assistant-fab__badge">1</span>
      </button>
    </div>
  );
}
