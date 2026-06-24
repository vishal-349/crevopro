import type { ServiceDetail } from '@/types/content';

/** Rich, per-service content powering the premium detail pages, keyed by slug. */
export const serviceDetails: Record<string, ServiceDetail> = {
  'graphic-design': {
    slug: 'graphic-design',
    title: 'Graphic Design',
    eyebrow: 'Brand & Visual Identity',
    tagline: 'Design that makes people stop scrolling.',
    heroDescription:
      'From a single logo to a complete brand system, we craft bold, cohesive visuals that make your brand impossible to ignore — and unmistakably yours.',
    stats: [
      { value: 600, suffix: '+', label: 'Designs delivered' },
      { value: 120, suffix: '+', label: 'Brands shaped' },
      { value: 48, suffix: 'h', label: 'Avg. first concept' },
      { value: 98, suffix: '%', label: 'Client retention' },
    ],
    whatWeDo: [
      {
        title: 'Logo & Brand Identity',
        description:
          'Distinctive logos, colour systems, and typography that scale across every touchpoint.',
      },
      {
        title: 'Social Media Creatives',
        description: 'Scroll-stopping post, story, and ad creatives designed for engagement.',
      },
      {
        title: 'Print & Packaging',
        description: 'Brochures, packaging, and collateral with production-ready precision.',
      },
      {
        title: 'Brand Guidelines',
        description: 'A living system so every future asset stays perfectly on-brand.',
      },
    ],
    process: [
      {
        title: 'Discover',
        description: 'We dig into your market, audience, and competitors to find your visual edge.',
      },
      {
        title: 'Concept',
        description:
          'Multiple creative directions — not one safe option — so you can choose with confidence.',
      },
      {
        title: 'Craft',
        description: 'Pixel-level refinement of the chosen direction across all required formats.',
      },
      {
        title: 'Deliver',
        description: 'Organised, production-ready files plus a guideline system for the future.',
      },
    ],
    benefits: [
      {
        title: 'Instant recognition',
        description: 'A consistent identity that audiences remember after a single glance.',
      },
      {
        title: 'Premium perception',
        description: 'Considered design signals quality and builds immediate trust.',
      },
      {
        title: 'Faster marketing',
        description: 'A ready system means every campaign ships quicker and on-brand.',
      },
      {
        title: 'Built to scale',
        description: 'Assets engineered to work from a favicon to a billboard.',
      },
    ],
    highlights: [
      { title: 'Gourmet Foods Rebrand', category: 'Brand Identity' },
      { title: 'Ewaan Lifts Logo System', category: 'Logo Design' },
      { title: 'Pretty Packaging Suite', category: 'Packaging' },
      { title: 'Tech Connect Social Kit', category: 'Social Creatives' },
    ],
    whyChooseUs: [
      {
        title: 'Strategy-led',
        description: 'Every visual decision ties back to a business goal, not just aesthetics.',
      },
      {
        title: 'Senior designers',
        description: 'Your brand is handled by experienced designers, not juniors-in-training.',
      },
      {
        title: 'Unlimited clarity',
        description: 'Clear revision rounds with transparent timelines and no surprises.',
      },
    ],
    faqs: [
      {
        question: 'How long does a logo project take?',
        answer:
          'Most identity projects run 1–3 weeks depending on scope. You will see first concepts within 48 hours of kickoff.',
      },
      {
        question: 'Do I get the source files?',
        answer:
          'Yes — you receive full editable source files (AI/SVG/PDF) plus web and print exports, and you own them outright.',
      },
      {
        question: 'How many revisions are included?',
        answer:
          'Every package includes structured revision rounds. We keep refining the chosen direction until it is right.',
      },
      {
        question: 'Can you match my existing brand?',
        answer:
          'Absolutely. We can extend and elevate an existing identity or build a fresh one from scratch.',
      },
    ],
    ctaHeading: "Let's design something unforgettable.",
    ctaText: 'Tell us about your brand and we will send back a concept that turns heads.',
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    eyebrow: 'Growth & Performance',
    tagline: 'Marketing that moves the metrics that matter.',
    heroDescription:
      'SEO, paid media, social, and content working as one engine — engineered to grow reach, capture demand, and turn attention into measurable revenue.',
    stats: [
      { value: 4, suffix: 'x', label: 'Avg. ROAS' },
      { value: 250, suffix: '%', label: 'Avg. traffic lift' },
      { value: 30, suffix: '+', label: 'Active campaigns' },
      { value: 1.2, prefix: '', suffix: 'M+', label: 'Monthly reach' },
    ],
    whatWeDo: [
      {
        title: 'SEO & Content',
        description:
          'Rank for the searches that bring buyers, backed by content people actually read.',
      },
      {
        title: 'Paid Advertising',
        description: 'Google, Meta, and YouTube ads tuned daily for the lowest cost per result.',
      },
      {
        title: 'Social Media',
        description: 'Always-on social that builds community and keeps your brand top of mind.',
      },
      {
        title: 'Analytics & Reporting',
        description: 'Clear dashboards that connect every rupee spent to outcomes.',
      },
    ],
    process: [
      {
        title: 'Audit',
        description:
          'We benchmark your funnel, channels, and competitors to find the fastest wins.',
      },
      {
        title: 'Strategy',
        description: 'A channel mix and message map built around your goals and budget.',
      },
      { title: 'Launch', description: 'Campaigns go live with tight tracking from day one.' },
      {
        title: 'Optimise',
        description: 'Continuous testing of creative, audiences, and bids to compound results.',
      },
      { title: 'Scale', description: 'We double down on what works and retire what does not.' },
    ],
    benefits: [
      {
        title: 'Predictable pipeline',
        description: 'A repeatable system that turns ad spend into qualified leads.',
      },
      {
        title: 'Lower cost per lead',
        description: 'Relentless optimisation drives your acquisition cost down over time.',
      },
      {
        title: 'Full transparency',
        description: 'You see exactly where budget goes and what it returns.',
      },
      {
        title: 'Compounding growth',
        description: 'SEO and content build an asset that keeps paying off.',
      },
    ],
    highlights: [
      { title: 'Care First Lead Engine', category: 'Paid + SEO' },
      { title: 'Oculus Launch Campaign', category: 'Performance Ads' },
      { title: 'Ansika Content Growth', category: 'SEO & Content' },
      { title: 'Gourmet Social Surge', category: 'Social Media' },
    ],
    whyChooseUs: [
      {
        title: 'Revenue-first',
        description: 'We optimise for pipeline and ROAS, not vanity likes and impressions.',
      },
      {
        title: 'In-house creative',
        description: 'Ads, copy, and landing pages produced under one roof for speed.',
      },
      {
        title: 'No lock-in',
        description: 'We earn the relationship every month with results you can verify.',
      },
    ],
    faqs: [
      {
        question: 'How soon will I see results?',
        answer:
          'Paid channels can show traction within weeks; SEO compounds over 3–6 months. We set realistic milestones up front.',
      },
      {
        question: 'What budget do I need?',
        answer:
          'We tailor the plan to your stage — from lean startups to scale-ups — and recommend a media budget that fits your goals.',
      },
      {
        question: 'Do you handle the creative too?',
        answer:
          'Yes. Strategy, ad creative, copy, and landing pages are all produced in-house so campaigns ship fast.',
      },
      {
        question: 'How do you report performance?',
        answer:
          'You get a live dashboard plus a clear monthly readout tying spend to leads, sales, and ROAS.',
      },
    ],
    ctaHeading: 'Ready to turn attention into revenue?',
    ctaText: 'Get a free growth audit and a channel plan tailored to your business.',
  },

  'website-design': {
    slug: 'website-design',
    title: 'Website Design',
    eyebrow: 'Web Design & Development',
    tagline: 'Websites that look stunning and convert.',
    heroDescription:
      'Fast, responsive, conversion-focused websites — designed around your users and engineered to load instantly, rank well, and turn visitors into customers.',
    stats: [
      { value: 90, suffix: '+', label: 'Lighthouse score' },
      { value: 200, suffix: '+', label: 'Sites shipped' },
      { value: 1.5, suffix: 's', label: 'Avg. load time' },
      { value: 100, suffix: '%', label: 'Responsive' },
    ],
    whatWeDo: [
      {
        title: 'UI/UX Design',
        description: 'Interfaces designed around real user journeys, not guesswork.',
      },
      {
        title: 'Responsive Development',
        description: 'Flawless on mobile, tablet, laptop, and desktop — every time.',
      },
      {
        title: 'Landing Pages',
        description: 'High-converting pages purpose-built for campaigns and launches.',
      },
      {
        title: 'Performance & SEO',
        description: 'Engineered for speed, accessibility, and search visibility.',
      },
    ],
    process: [
      {
        title: 'Plan',
        description: 'Sitemap, goals, and content strategy mapped to your audience.',
      },
      { title: 'Design', description: 'High-fidelity, on-brand mockups for every key screen.' },
      { title: 'Build', description: 'Clean, modern, responsive code with performance baked in.' },
      {
        title: 'Launch & Care',
        description: 'Smooth go-live plus ongoing support and improvements.',
      },
    ],
    benefits: [
      {
        title: 'First impressions that win',
        description: 'A polished site builds instant credibility with every visitor.',
      },
      {
        title: 'More conversions',
        description: 'Clear journeys and fast pages turn more visitors into customers.',
      },
      {
        title: 'Found on Google',
        description: 'Speed, structure, and SEO best practices baked in from day one.',
      },
      {
        title: 'Easy to manage',
        description: 'Built so your team can update content without a developer.',
      },
    ],
    highlights: [
      { title: 'Tech Connect Platform', category: 'Web App' },
      { title: 'Ewaan Corporate Site', category: 'Website Design' },
      { title: 'Care First Landing', category: 'Landing Page' },
      { title: 'Oculus Product Site', category: 'UI/UX' },
    ],
    whyChooseUs: [
      {
        title: 'Design + engineering',
        description: 'One team handles both, so nothing gets lost in handoff.',
      },
      {
        title: 'Built to perform',
        description: 'We obsess over load time, accessibility, and Core Web Vitals.',
      },
      {
        title: 'Future-proof stack',
        description: 'Modern, maintainable code that is easy to grow with.',
      },
    ],
    faqs: [
      {
        question: 'How long does a website take?',
        answer:
          'Most marketing sites launch in 3–6 weeks depending on page count and complexity. We share a clear timeline up front.',
      },
      {
        question: 'Can I edit the site myself?',
        answer:
          'Yes — we build with editing in mind and hand over training so your team can update content easily.',
      },
      {
        question: 'Is the site mobile-friendly?',
        answer:
          'Always. Every site is mobile-first and tested across phones, tablets, and desktops before launch.',
      },
      {
        question: 'Do you provide hosting and support?',
        answer:
          'We deploy to fast, reliable hosting and offer ongoing care plans for updates and improvements.',
      },
    ],
    ctaHeading: 'Your next website starts here.',
    ctaText: 'Share your goals and we will propose a site that looks incredible and performs.',
  },

  'ecommerce-solutions': {
    slug: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    eyebrow: 'Online Stores & Retail',
    tagline: 'Stores built to sell, scale, and delight.',
    heroDescription:
      'End-to-end e-commerce — from storefront design and payments to inventory and growth — built to give shoppers a frictionless experience and you more revenue.',
    stats: [
      { value: 35, suffix: '%', label: 'Avg. conversion lift' },
      { value: 80, suffix: '+', label: 'Stores launched' },
      { value: 24, suffix: '/7', label: 'Selling, always on' },
      { value: 2, suffix: 'x', label: 'Repeat purchase rate' },
    ],
    whatWeDo: [
      {
        title: 'Store Setup',
        description: 'Beautiful, fast storefronts on the right platform for your business.',
      },
      {
        title: 'Payments & Checkout',
        description: 'Secure, frictionless checkout that maximises completed orders.',
      },
      {
        title: 'Catalogue & Inventory',
        description: 'Product, pricing, and stock systems that stay in sync.',
      },
      {
        title: 'Growth & Retention',
        description: 'Email, offers, and analytics that turn buyers into regulars.',
      },
    ],
    process: [
      {
        title: 'Scope',
        description: 'We map your products, logistics, and goals into a clear build plan.',
      },
      {
        title: 'Build',
        description: 'Storefront, catalogue, payments, and shipping configured end to end.',
      },
      {
        title: 'Optimise',
        description: 'Checkout, speed, and product pages tuned for conversion.',
      },
      { title: 'Grow', description: 'Retention flows and campaigns to increase repeat revenue.' },
    ],
    benefits: [
      {
        title: 'Sell around the clock',
        description: 'A reliable store that takes orders while you sleep.',
      },
      {
        title: 'Higher order value',
        description: 'Smart merchandising and upsells lift average cart size.',
      },
      {
        title: 'Fewer abandoned carts',
        description: 'A frictionless checkout recovers revenue you were losing.',
      },
      {
        title: 'One source of truth',
        description: 'Inventory and orders synced so operations stay sane.',
      },
    ],
    highlights: [
      { title: 'Gourmet Online Store', category: 'Store Build' },
      { title: 'Pretty D2C Launch', category: 'E-commerce' },
      { title: 'Ansika Catalogue', category: 'Catalogue Setup' },
      { title: 'Care First Retention', category: 'Growth' },
    ],
    whyChooseUs: [
      {
        title: 'Commerce specialists',
        description: 'We know what actually moves conversion and retention.',
      },
      {
        title: 'Platform-agnostic',
        description: 'We recommend the right platform for you, not the one we prefer.',
      },
      {
        title: 'Built for operations',
        description: 'Stores designed to be easy for your team to run day to day.',
      },
    ],
    faqs: [
      {
        question: 'Which platform do you use?',
        answer:
          'We work across Shopify, WooCommerce, and custom builds — and recommend the best fit for your catalogue and budget.',
      },
      {
        question: 'Can you migrate my existing store?',
        answer:
          'Yes, we handle migrations of products, customers, and orders with care to avoid downtime or data loss.',
      },
      {
        question: 'Do you set up payments and shipping?',
        answer:
          'We configure payment gateways, taxes, and shipping rules end to end so you can start selling immediately.',
      },
      {
        question: 'Will it integrate with my tools?',
        answer:
          'We integrate with your inventory, accounting, and marketing tools to keep everything in sync.',
      },
    ],
    ctaHeading: 'Build a store that sells while you sleep.',
    ctaText: 'Tell us what you sell and we will map the fastest path to launch and growth.',
  },

  'outdoor-advertising': {
    slug: 'outdoor-advertising',
    title: 'Outdoor & LED Advertising',
    eyebrow: 'LED Screens & Digital Out-of-Home',
    tagline: 'Own the city. Light up every street.',
    heroDescription:
      'High-impact campaigns on large LED screens, digital billboards, mall displays, and roadside networks — planned, designed, and reported end to end for maximum eyes on your brand.',
    stats: [
      { value: 500, suffix: '+', label: 'Screen locations' },
      { value: 10, suffix: 'M+', label: 'Daily impressions' },
      { value: 50, suffix: '+', label: 'Cities covered' },
      { value: 18, suffix: 'hrs', label: 'Daily play time' },
    ],
    whatWeDo: [
      {
        title: 'Large LED Screens',
        description: 'Premium high-brightness screens at the busiest junctions and landmarks.',
      },
      {
        title: 'Digital Billboards',
        description: 'Programmatic billboard placements along high-traffic highways and arterials.',
      },
      {
        title: 'Mall & Indoor Screens',
        description: 'Capture shoppers in high-dwell retail and entertainment hubs.',
      },
      {
        title: 'Roadside Display Networks',
        description: 'Citywide roadside LED networks for relentless, repeat exposure.',
      },
    ],
    process: [
      {
        title: 'Plan',
        description:
          'We map audiences to locations and build a placement plan around your goals and budget.',
      },
      {
        title: 'Create',
        description:
          'Motion-first creative designed specifically for LED — bold, legible, and brand-safe.',
      },
      {
        title: 'Book',
        description: 'We secure premium slots and schedule play times for peak footfall.',
      },
      { title: 'Go Live', description: 'Your campaign lights up across the network on schedule.' },
      {
        title: 'Report',
        description: 'Proof-of-play, impressions, and reach reporting after every flight.',
      },
    ],
    benefits: [
      {
        title: 'Unmissable reach',
        description: 'Dominate physical space where audiences cannot scroll past you.',
      },
      {
        title: 'Brand at scale',
        description: 'Larger-than-life presence that builds instant credibility and recall.',
      },
      {
        title: 'Always-on exposure',
        description: 'Up to 18 hours of daily play keeps your brand in constant view.',
      },
      {
        title: 'Targeted by location',
        description: 'Choose neighbourhoods, routes, and venues that match your customers.',
      },
    ],
    highlights: [
      { title: 'City-Centre LED Takeover', category: 'Large LED' },
      { title: 'Highway Billboard Flight', category: 'Digital Billboard' },
      { title: 'Mall Screen Network', category: 'Indoor DOOH' },
      { title: 'Festival Roadside Blitz', category: 'Roadside Network' },
    ],
    whyChooseUs: [
      {
        title: 'Premium inventory',
        description: 'Access to high-footfall screens at landmark locations across the country.',
      },
      {
        title: 'Creative built for LED',
        description: 'We design motion creative that actually works on big, bright screens.',
      },
      {
        title: 'Transparent reporting',
        description: 'Proof-of-play and reach reports so you know exactly what you paid for.',
      },
      {
        title: 'Flexible pricing',
        description: 'Slot-based and weekly flight packages to fit any campaign budget.',
      },
    ],
    faqs: [
      {
        question: 'Where are your screens located?',
        answer:
          'We operate across 50+ cities — city-centre junctions, highways, malls, and roadside networks. We match locations to your target audience.',
      },
      {
        question: 'Do you handle the creative?',
        answer:
          'Yes. We design motion-first creative purpose-built for LED so your message is bold, legible, and on-brand at any size.',
      },
      {
        question: 'How is pricing structured?',
        answer:
          'Pricing is based on location, slot duration, and flight length. We offer slot-based and weekly packages to fit your budget and recommend the best mix.',
      },
      {
        question: 'How do I know my ad actually ran?',
        answer:
          'Every campaign includes proof-of-play logs plus estimated impressions and reach reporting after each flight.',
      },
      {
        question: 'What is the minimum campaign length?',
        answer:
          'We run flights from a single week up to long-term always-on placements, with flexible scheduling around your launch dates.',
      },
    ],
    ctaHeading: 'Put your brand on the biggest screens in the city.',
    ctaText: 'Tell us your target locations and budget — we will build a high-impact LED plan.',
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
