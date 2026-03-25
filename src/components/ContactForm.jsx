import { useState } from "react";

export function ContactForm({ title = "Contact", text, placeholder, buttonLabel = "Send" }) {
  const [hint, setHint] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setHint("Message prepared. Connect this form to your backend or email service.");
    event.currentTarget.reset();
  }

  return (
    <section className="section section--alt" id="contact">
      <div className="container contact">
        <div>
          <h2>{title}</h2>
          <p className="muted">{text}</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="you@email.com" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required placeholder={placeholder}></textarea>
          </label>
          <button className="btn btn--primary" type="submit">{buttonLabel}</button>
          <p className="form__hint muted" role="status">{hint}</p>
        </form>
      </div>
    </section>
  );
}
