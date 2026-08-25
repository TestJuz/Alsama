import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MessageSquareText, Send, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { routes } from "../lib/site";

const CONTACT_EMAIL = "jeaustin.rdz@gmail.com";
const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
function formatCartItems(items) {
  if (!items.length) return "No selected items.";

  return items
    .map((item) => {
      const meta = item.meta?.length ? ` (${item.meta.join(" | ")})` : "";
      return `${item.type}: ${item.title}${meta}`;
    })
    .join("\n");
}

export function ContactForm({ title = "Contact", text, placeholder, buttonLabel = "Send" }) {
  const [hint, setHint] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { items, count, clearCart } = useCart();
  const { t } = useLanguage();

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("_honey")) return;

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const selectedItems = formatCartItems(items);

    setIsSending(true);
    setHint("Sending your request...");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          selected_items: selectedItems,
          _replyto: email,
          _subject: `New Alsama Tours request from ${name || "website"}`,
          _template: "table",
          _captcha: "false"
        })
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setHint("Thanks. Your request was sent to Alsama Tours.");
      form.reset();
      if (count) clearCart();
      navigate(routes.thankYou);
    } catch (error) {
      setHint("We could not send the message. Please email jeaustin.rdz@gmail.com or try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="section section--alt" id="contact">
      <div className="container contact">
        <div className="contact__copy">
          <span className="contact__eyebrow">{t("Ready when you are")}</span>
          <h2>{t(title)}</h2>
          <p className="muted">{t(text)}</p>
          <div className="contact__note">
            <span className="contact__noteIcon" aria-hidden="true">
              <MessageSquareText size={18} />
            </span>
            <p>{t("Tell us where you are going, your dates and the kind of trip you have in mind.")}</p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

          <label className="form__field">
            <span>{t("Name")}</span>
            <div className="form__control">
              <User size={18} aria-hidden="true" />
              <input name="name" required placeholder={t("Your name")} />
            </div>
          </label>
          <label className="form__field">
            <span>{t("Email")}</span>
            <div className="form__control">
              <Mail size={18} aria-hidden="true" />
              <input name="email" type="email" required placeholder={t("you@email.com")} />
            </div>
          </label>
          <label className="form__field form__field--message">
            <span>{t("Message")}</span>
            <div className="form__control form__control--textarea">
              <MessageSquareText size={18} aria-hidden="true" />
              <textarea name="message" rows="5" required placeholder={t(placeholder)}></textarea>
            </div>
          </label>

          {items.length ? (
            <div className="form-cart">
              <div className="form-cart__head">
                <strong>{t("Selected items")} ({count})</strong>
                <button type="button" onClick={clearCart}>{t("Clear")}</button>
              </div>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <span>{item.type}: {item.title}</span>
                    <small>{item.meta?.join(" | ")}</small>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <button className="btn btn--primary form__submit" type="submit" disabled={isSending}>
            {isSending ? t("Sending...") : t(buttonLabel)}
            <Send size={17} aria-hidden="true" />
          </button>
          <p className="form__hint muted" role="status">{hint}</p>
        </form>
      </div>
    </section>
  );
}
