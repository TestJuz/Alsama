import { useState } from "react";
import { Mail, MessageSquareText, Send, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ContactForm({ title = "Contact", text, placeholder, buttonLabel = "Send" }) {
  const [hint, setHint] = useState("");
  const { items, count, clearCart } = useCart();

  function handleSubmit(event) {
    event.preventDefault();
    setHint(count ? "Request prepared with your selected cart items." : "Message prepared. Connect this form to your backend or email service.");
    event.currentTarget.reset();
  }

  return (
    <section className="section section--alt" id="contact">
      <div className="container contact">
        <div className="contact__copy">
          <span className="contact__eyebrow">Ready when you are</span>
          <h2>{title}</h2>
          <p className="muted">{text}</p>
          <div className="contact__note">
            <span className="contact__noteIcon" aria-hidden="true">
              <MessageSquareText size={18} />
            </span>
            <p>Tell us where you are going, your dates and the kind of trip you have in mind.</p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            <span>Name</span>
            <div className="form__control">
              <User size={18} aria-hidden="true" />
              <input name="name" required placeholder="Your name" />
            </div>
          </label>
          <label className="form__field">
            <span>Email</span>
            <div className="form__control">
              <Mail size={18} aria-hidden="true" />
              <input name="email" type="email" required placeholder="you@email.com" />
            </div>
          </label>
          <label className="form__field form__field--message">
            <span>Message</span>
            <div className="form__control form__control--textarea">
              <MessageSquareText size={18} aria-hidden="true" />
              <textarea name="message" rows="5" required placeholder={placeholder}></textarea>
            </div>
          </label>

          {items.length ? (
            <div className="form-cart">
              <div className="form-cart__head">
                <strong>Selected items ({count})</strong>
                <button type="button" onClick={clearCart}>Clear</button>
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

          <button className="btn btn--primary form__submit" type="submit">
            {buttonLabel}
            <Send size={17} aria-hidden="true" />
          </button>
          <p className="form__hint muted" role="status">{hint}</p>
        </form>
      </div>
    </section>
  );
}
