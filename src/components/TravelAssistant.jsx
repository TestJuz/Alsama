import { Database, MessageCircle, Search, Send, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  answerTravelQuestion,
  getQuestionLanguage,
  searchTravelAssistantItems,
  travelAssistantCategories,
  travelAssistantStats
} from "../lib/travelAssistantData";
import { asset } from "../lib/site";
import { useLanguage } from "../context/LanguageContext";

const TYPING_STEP_MS = 18;
const TYPING_CHARS_PER_STEP = 3;
const WHATSAPP_AGENT_URL = "https://wa.me/50661672539";

function buildAgentContact(question, language) {
  const copy = {
    es: {
      text: `Hola, necesito ayuda de un agente de Alsama. Mi pregunta fue: ${question}`,
      label: "Ponte en contacto con un agente",
      description: "Enviar esta pregunta por WhatsApp"
    },
    fr: {
      text: `Bonjour, j'ai besoin de l'aide d'un agent Alsama. Ma question etait: ${question}`,
      label: "Contacter un agent",
      description: "Envoyer cette question par WhatsApp"
    },
    en: {
      text: `Hello, I need help from an Alsama agent. My question was: ${question}`,
      label: "Contact an agent",
      description: "Send this question on WhatsApp"
    }
  };
  const selected = copy[language] || copy.en;

  return {
    href: `${WHATSAPP_AGENT_URL}?text=${encodeURIComponent(selected.text)}`,
    label: selected.label,
    description: selected.description
  };
}

const suggestions = [
  "Tours de playa",
  "Tours from Jaco",
  "Hoteles en Arenal",
  "Rent a car SUV",
  "Transporte privado a Manuel Antonio",
  "Shuttle to Puerto Viejo"
];

function AssistantResult({ item, onNavigate }) {
  const { t } = useLanguage();
  return (
    <article className="assistant-result">
      <div>
        <span>{item.eyebrow}</span>
        <h4>{item.label}</h4>
        <p>{item.description}</p>
      </div>
      <div className="assistant-result__side">
        <strong>{item.price}</strong>
        <Link to={item.href} onClick={onNavigate}>{t("View more")}</Link>
      </div>
    </article>
  );
}

function AssistantContact({ contact }) {
  if (!contact) return null;

  return (
    <a className="assistant-contact" href={contact.href} target="_blank" rel="noreferrer">
      <strong>{contact.label}</strong>
      <span>{contact.description}</span>
    </a>
  );
}

export function TravelAssistant() {
  const messagesRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const scrollLockRef = useRef(null);
  const { language: pageLanguage } = useLanguage();
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

  const restorePageScroll = useCallback(() => {
    const lock = scrollLockRef.current;
    if (!lock) return;

    document.body.style.position = lock.position;
    document.body.style.top = lock.top;
    document.body.style.width = lock.width;
    document.body.style.overflow = lock.overflow;
    window.scrollTo(0, lock.scrollY);
    scrollLockRef.current = null;
  }, []);

  useEffect(() => {
    if (!open || scrollLockRef.current) return;
    if (!window.matchMedia("(max-width: 760px)").matches) return;

    const scrollY = window.scrollY;
    scrollLockRef.current = {
      scrollY,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return restorePageScroll;
  }, [open, restorePageScroll]);

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
    restorePageScroll();
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

    const language = getQuestionLanguage(value, pageLanguage);
    const baseAnswer = answerTravelQuestion(value, pageLanguage);
    const answer = baseAnswer.items?.length
      ? baseAnswer
      : { ...baseAnswer, contact: buildAgentContact(value, language) };
    setMessages((current) => [...current, { role: "user", body: value }]);
    setTyping({
      role: "assistant",
      title: language === "es" ? "Alsama esta buscando" : language === "fr" ? "Alsama verifie" : "Alsama is checking",
      body: "",
      items: [],
      done: false
    });
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
                    <AssistantContact contact={message.contact} />
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
                    {typing.done ? <AssistantContact contact={typing.contact} /> : null}
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
