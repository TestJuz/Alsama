# Alsama Tours backlink plan — 2026-09-28

This file tracks off-site link work that cannot be completed only from the website repository.

## Verified external entity profiles

| Source | Verified URL | Recommended target |
| --- | --- | --- |
| Visit Costa Rica | https://www.visitcostarica.com/planning-your-trip/local-agency/alsama-tours | https://alsamatourscr.com/ |
| Tripadvisor | https://www.tripadvisor.com/Attraction_Review-g309293-d23810882-Reviews-Alsama_Tours-San_Jose_San_Jose_Metro_Province_of_San_Jose.html | https://alsamatourscr.com/ |
| GetYourGuide supplier | https://www.getyourguide.com/ro-ro/alsama-tours-s308586/ | https://alsamatourscr.com/ |

These profiles are also declared in the TravelAgency `sameAs` schema.

## Priority outreach targets

1. Hotels that already send guests to Alsama or use Alsama transportation.
2. Tour/activity suppliers already represented in the Alsama catalog.
3. Costa Rica tourism associations and legitimate regional directories.
4. Travel publishers with existing Costa Rica transportation, SJO airport, Jaco, Arenal or Manuel Antonio content.
5. Partners that have "getting here", "recommended transport", "things to do" or "local partners" pages.

## Preferred destination URLs for new links

- Brand/company: https://alsamatourscr.com/
- Private transportation: https://alsamatourscr.com/private-transport/
- Shuttle: https://alsamatourscr.com/shuttle/
- Tours from San Jose: https://alsamatourscr.com/tours/san-jose/
- Tours from Jaco: https://alsamatourscr.com/tours/jaco/
- Arenal: https://alsamatourscr.com/destinations/arenal/
- Manuel Antonio: https://alsamatourscr.com/destinations/manuel-antonio/
- Private transfer guide: https://alsamatourscr.com/guides/costa-rica-private-transfers/
- SJO airport transportation guide: https://alsamatourscr.com/guides/sjo-airport-transportation/

## Anchor-text guidance

Prefer natural branded or contextual anchors. Do not standardize every backlink on the same exact-match keyword.

Good examples:
- Alsama Tours
- Alsama Tours Costa Rica
- private transportation in Costa Rica
- tours from San Jose
- tours from Jaco
- Arenal travel guide
- SJO airport transportation

## Legacy URL recovery

The build creates static redirect documents for:
- /inicio/ -> /
- /transport/ -> /private-transport/
- /transporte/ -> /private-transport/
- /Rent-A-Car/ -> /rent-a-car/
- /transport/shuttle.html -> /shuttle/
- /transport/private-transport.html -> /private-transport/
- /tours/SanJose/ -> /tours/san-jose/
- /tours/Jaco/ -> /tours/jaco/
- /trip/<tour-slug>/ -> /tours/<tour-slug>/

GitHub Pages cannot provide configurable server-side 301 rules from this repository. These redirect documents use canonical, noindex/follow, meta refresh and JavaScript navigation. If a CDN/edge layer such as Cloudflare is added later, migrate these mappings to true HTTP 301 responses.

## Do not use

- paid bulk backlink packages
- PBNs
- comment/forum spam
- low-quality generic directories
- mass reciprocal-link schemes
- exact-match anchor campaigns
