import { BadgePercent, CheckCircle2 } from "lucide-react";

export function NationalDiscountBanner({
  className = "",
  serviceText = "tours and private transport",
  note = "Eligible for tours and private transport"
}) {
  return (
    <aside className={`national-discount-banner ${className}`.trim()} aria-label="10 percent national discount">
      <div className="national-discount-banner__badge" aria-hidden="true">
        <BadgePercent size={24} />
        <strong>10%</strong>
        <span>OFF</span>
      </div>
      <div className="national-discount-banner__copy">
        <p>National discount</p>
        <strong>For Costa Rican nationals</strong>
        <span>Applies to {serviceText}. Cedula required at checkout.</span>
      </div>
      <div className="national-discount-banner__note">
        <CheckCircle2 size={18} aria-hidden="true" />
        <span>{note}</span>
      </div>
    </aside>
  );
}
