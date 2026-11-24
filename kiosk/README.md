# Alsama Tours — SUNMI self-service kiosk
Independent touchscreen application for the SUNMI D3 (Android 14, landscape 1920×1080). It reuses the website's current catalog, photos, translations, booking-date rules and rates directly from the same repository. No website files are changed. Catalog and assets are embedded in the APK; only reservation submission requires internet. Rebuild to refresh prices/content.
 
## Build
From repository root: npm ci; npx vite --config kiosk/vite.config.mjs (browser preview); npx vite build --config kiosk/vite.config.mjs (production assets).
Install JDK 17, Android SDK 35 and Gradle 8.9, then run gradle -p kiosk/android :app:assembleDebug. GitHub Actions also builds and uploads the debug APK on the feature branch. Unzip the workflow artifact, then use adb install -r app-debug.apk on the authorized device. Debug build is for pilot testing; use a stable release signing key for production.
 
## Reservation behavior
Tours, shared shuttles, private transfers, hotels, car rentals, and only active promotions. Tours and shuttles use published per-person rates, private transfers use group rates, hotels use the source site's high-season-first rate and nights (final season confirmed by staff), rentals use source daily/weekly/monthly rates. Unknown prices are explicitly excluded from the estimate. Existing website charges 15.5% taxes/platform and offers a 10% national discount with ID validation by staff. Reception assistance is a required yes/no field; name is required if yes. Email request includes the original item details, dates, estimated totals and receptionist name.
 
No payment or live inventory exists in the source site. This app sends requests to the existing FormSubmit destination info@alsamatourscr.com; it never labels a request as paid or confirmed. FormSubmit must be activated and tested on the actual device before public use; no real submission is sent by CI. A request reference is reused on retry but FormSubmit does not provide server-side deduplication. Production should use a reservation backend with availability, server-side rate verification, idempotency, payment provider, and privacy retention controls.
 
## Kiosk behavior
Immersive landscape, keep screen on, no local storage of contact details, automatic reset after three minutes of inactivity, explicit new session, and clearing data on successful submission. Screenshots blocked by Android FLAG_SECURE. This is not a managed device-owner kiosk; use SUNMI device management / Android dedicated-device lock task with an authorized admin if customers must be prevented from exiting. App has no payment terminal or receipt integration. Catalog copy uses the existing English/Spanish/French dictionaries; source strings lacking translations fall back to their original text. The app icon is a provisional lettermark, not a recovered official logo.
 
## Pilot acceptance checklist
- Build APK and install on D3; verify landscape, touch sizes and keyboard.
- Switch all 3 languages on catalog, details, cart and checkout.
- Compare every service type, rates, dates, fees and national discount to website.
- Add multiple services, change and remove lines, verify unknown prices do not become zero-price sales.
- Verify assistance yes requires name; no clears it. Use authorized test address and a test request to confirm inbox and receptionist attribution.
- Turn off Wi-Fi and verify error and retained cart. Reconnect; check for duplicates before retrying.
- Verify reset, idle timeout and successful request remove all customer data. Confirm device-management lock-down and privacy notice before launch.

## v1.0.1 delivery troubleshooting
Native FormSubmit requests now include the Alsama business origin and referrer. Delivery failures show safe diagnostic codes (ACTIVATION, REFERER, DNS, TLS, TIMEOUT, HTTP_status, etc.), without logging customer data. For ACTIVATION, check the official business mailbox and verify FormSubmit activation. No real reservation was submitted during development. Debug APKs built on separate runners may use different signing keys; uninstall the previous debug APK if Android rejects the update, then install the new one. Production requires consistent release signing.


## v1.1.0 — Direct reservation API
FormSubmit is no longer used for kiosk requests. POST https://alsama-tour-reservations.alsama-digital-id.workers.dev/reservations saves requests in the private D1 database alsama-tour-reservations. Only a successful database write or matching idempotent retry returns success. No customer email is sent yet; notification_status is pending for future integration. Staff can view reservations via the Cloudflare D1 dashboard. Public API has no read endpoint. Estimates remain client-supplied and require staff validation. Full national ID is not collected; staff verifies eligibility. Basic public intake rate limiting is in place; strengthen device authentication, abuse controls and retention policy before broad rollout. No payment or live availability is provided.
