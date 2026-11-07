# NatureNest — Homestay & Resort Website

A polished, responsive, frontend-only website template for homestays and resorts. Built with HTML, CSS, vanilla JavaScript, Bootstrap 5, Font Awesome and Google Fonts. No backend, database, build step or API key is required.

## Preview

Open `index.html` in a browser. The Bootstrap, Font Awesome, Google Fonts and Unsplash image assets load from their public CDNs, so an internet connection is needed for the complete visual preview.

## Customize for a property

1. Open `js/script.js` and edit the `NATURENEST_CONFIG` object at the top. It is the single source for the demo phone, WhatsApp, email, address, social profile and map location values.
2. Replace the demo contact values, including the WhatsApp number in international format without spaces (for example, replace `0000000000` with the property's own country code and number). The current values are placeholders, not real contact details. Outbound contact, social and map links remain visibly inactive until their placeholders are replaced.
3. Replace `YOUR_HOMESTAY_LOCATION` with the property name, address or coordinates to power both Google Maps directions links.
4. Update room names, capacities, descriptions and `₹XXXX` prices in `index.html`.
5. Replace the demo photos with licensed property photos. Add local files under `assets/images/`, then update each image's `src` and meaningful `alt` text. The Unsplash photos in this preview are remote and should be checked against the selected image provider's current license and terms before commercial reuse.
6. Replace the sample review copy only with genuine, permissioned guest feedback. The existing reviews are clearly labelled as sample demo content.
7. Update the title, description, Open Graph metadata, favicon and brand text in `index.html` for the property.

## Included interactions

- Responsive sticky navigation with a mobile menu
- Smooth anchor navigation and scroll-reveal effects
- Room detail modal with room-specific enquiry
- WhatsApp enquiries with a prefilled message and room-specific enquiry text
- Configurable call, email, social profile and Google Maps links
- Accessible gallery lightbox with close, previous/next and keyboard controls
- Back-to-top and floating WhatsApp buttons
- Reduced-motion support and lazy-loaded below-the-fold photographs

## Publish

Upload the `NatureNest_Homestay` folder to any static hosting provider. There is no server-side processing or private configuration. All demo contact and social links must be replaced before publishing.
