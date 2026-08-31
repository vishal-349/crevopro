import type { PriceGroup, PriceTeaser } from '@/types/content';

/**
 * Public pricing — headline packages only.
 *
 * Deliberately narrower than Document/CrevoPro-Services-Pricing.pdf: the long
 * add-on, stationery and per-item design rate tables stay in the PDF and are
 * shared on request. Keep the two in sync when either changes.
 *
 * NOT YET APPROVED — confirm before this goes live:
 *   Business Website        ₹12,999
 *   Dynamic Website + CMS   ₹19,999
 *   Mobile App Development  ₹79,999
 * Every other figure below was supplied by the client.
 */
/** Applies across every package; shown in the Stationery & Terms section. */
export const pricingTerms = [
  'All prices are starting rates and may vary with project scope, complexity and requirements.',
  'Advertising budget is not included in management charges or packages.',
  'Domain and hosting are provided by the client for all website and e-commerce packages.',
  'Shopify subscription, premium apps, theme licences and app-store developer fees are billed to the client.',
  'Post-launch support covers bug fixes; new features are quoted separately.',
  'A final quotation is shared after understanding the complete project requirements.',
];

export const pricingGroups: PriceGroup[] = [
  {
    id: 'website',
    eyebrow: 'Website Development',
    title: 'Websites built to convert',
    intro:
      'Fast, responsive, search-friendly websites — designed around your users and engineered to rank well and sell.',
    packages: [
      {
        id: 'landing',
        name: 'Single-Page Landing Website',
        price: '₹4,999',
        unit: 'starting from',
        description: 'One focused page, built to convert.',
        features: [
          'Responsive design',
          'Single-page layout',
          'Basic UI/UX',
          'CTA sections',
          'Contact section',
          'Basic deployment support',
        ],
        note: 'Domain and hosting to be provided by the client.',
      },
      {
        id: 'business',
        name: 'Business Website',
        price: '₹12,999',
        unit: 'starting from',
        description: 'A complete multi-page presence for your brand.',
        features: [
          'Up to 7 pages',
          'Custom UI/UX design',
          'Mobile-first responsive build',
          'Enquiry & contact forms',
          'WhatsApp & Google Maps integration',
          'Basic on-page SEO',
          'Social media integration',
          'Deployment support',
        ],
        note: 'Domain and hosting to be provided by the client.',
      },
      {
        id: 'cms',
        name: 'Dynamic Website + CMS',
        price: '₹19,999',
        unit: 'starting from',
        description: 'Update your own content — no developer needed.',
        features: [
          'Up to 10 pages',
          'Admin panel — content management',
          'Blog / news module',
          'Gallery & portfolio module',
          'Enquiry management',
          'On-page SEO setup',
          'Google Analytics setup',
          '1 month post-launch support',
        ],
        note: 'Domain and hosting to be provided by the client.',
      },
    ],
  },
  {
    id: 'ecommerce',
    eyebrow: 'E-Commerce',
    title: 'Online stores, two ways',
    intro:
      'Launch fast on Shopify, or own a fully custom store outright with no monthly platform fees.',
    packages: [
      {
        id: 'shopify',
        name: 'E-Commerce — Shopify',
        price: '₹29,999',
        unit: 'starting from',
        description: 'The fastest route to a live, sellable store.',
        features: [
          'Shopify store setup & configuration',
          'Premium theme customisation',
          'Up to 50 products uploaded',
          'Payment gateway integration',
          'Shipping, tax & delivery setup',
          'Discounts & coupon setup',
          'Basic on-page SEO',
          '15 days post-launch support',
        ],
        panels: {
          label: 'Panels included',
          items: ['Shopify admin panel', 'Customer accounts panel'],
        },
        note: 'Shopify subscription, premium apps and theme licence are billed directly to the client.',
      },
      {
        id: 'fullstack',
        name: 'E-Commerce — Full-Stack',
        price: '₹49,999',
        unit: 'starting from',
        description: 'A fully custom store you own outright — no platform fees.',
        featured: true,
        features: [
          'Custom-built store — no monthly platform fee',
          'Product, category & variant management',
          'Cart, checkout & payment gateway',
          'Order tracking & status updates',
          'Inventory & stock management',
          'Coupons, offers & campaigns',
          'Reports & analytics dashboard',
          'Role-based access control',
          'Responsive + PWA ready',
          '30 days post-launch support',
        ],
        panels: {
          label: 'Multiple panels',
          items: [
            'Customer panel',
            'Admin & owner panel',
            'Vendor / seller panel',
            'Delivery / rider panel',
          ],
        },
        note: 'Vendor and delivery panels are optional modules. Domain, hosting and gateway charges are client-provided.',
      },
    ],
    comparison: {
      heading: 'Which one fits you',
      columns: ['Shopify — ₹29,999', 'Full-Stack — ₹49,999'],
      rows: [
        { label: 'Monthly platform fee', values: ['Yes — paid to Shopify', 'None'] },
        { label: 'Code ownership', values: ['Platform-hosted', 'Fully owned by you'] },
        { label: 'Customisation', values: ['Theme-level', 'Unlimited'] },
        { label: 'Panels included', values: ['Admin + customer', 'Up to 4 panels'] },
        { label: 'Post-launch support', values: ['15 days', '30 days'] },
        { label: 'Best for', values: ['Getting to market fast', 'Scaling & multi-vendor'] },
      ],
    },
  },
  {
    id: 'apps',
    eyebrow: 'App Development',
    title: 'Mobile & custom applications',
    intro: 'One codebase across Android and iOS, or a bespoke platform built around your workflow.',
    packages: [
      {
        id: 'mobile-app',
        name: 'Mobile App Development',
        price: '₹79,999',
        unit: 'starting from',
        description: 'One codebase, both platforms.',
        features: [
          'Android + iOS — cross-platform build',
          'Custom UI/UX design',
          'User authentication & profiles',
          'Admin panel',
          'Push notifications',
          'Payment gateway integration',
          'API & third-party integrations',
          'Play Store & App Store deployment support',
          '30 days post-launch support',
        ],
        note: 'Google Play and Apple Developer account fees are paid by the client.',
      },
      {
        id: 'web-app',
        name: 'Custom Web Application',
        price: 'Custom Quote',
        description: 'Built around your workflow, not a template.',
        features: [
          'ERP & CRM systems',
          'Booking & scheduling platforms',
          'Multi-panel SaaS products',
          'Admin dashboards & reporting',
          'Role & permission management',
          'Third-party API integrations',
          'Cloud deployment & handover',
        ],
        note: 'Quoted after a discovery call covering panels, user roles and integrations.',
      },
    ],
  },
  {
    id: 'marketing',
    eyebrow: 'Digital Marketing',
    title: 'Growth packages',
    intro:
      'Always-on content and advertising, managed month to month. Ad spend is billed separately from management fees.',
    packages: [
      {
        id: 'starter',
        name: 'Starter Growth',
        price: '₹14,999',
        unit: '/ month',
        description: 'For businesses starting their digital growth journey.',
        features: [
          'Meta Ads Management',
          '8 Social Media Creatives',
          '2 Reel Edits',
          '4 Story Creatives',
          'Basic Campaign Optimisation',
          'Monthly Performance Report',
        ],
        note: 'Ad spend billed separately.',
      },
      {
        id: 'business-growth',
        name: 'Business Growth',
        price: '₹24,999',
        unit: '/ month',
        description: 'For businesses looking for consistent content and advertising.',
        features: [
          'Meta + Google Ads Management',
          '12 Social Media Creatives',
          '4 Reel Edits',
          '6 Story Creatives',
          '1 Brand Shoot',
          '1 Edited Reel from Shoot',
          'Campaign Optimisation',
          'Monthly Performance Report',
        ],
        note: 'Ad spend billed separately.',
      },
      {
        id: 'complete',
        name: 'Complete Growth',
        price: '₹34,999',
        unit: '/ month',
        description: 'Our complete digital growth solution.',
        featured: true,
        features: [
          'Meta + Google Ads Management',
          '16 Social Media Creatives',
          '8 Ad / Promotional Creatives',
          '8 Story Creatives',
          '4 Reel Edits',
          '1 Brand Shoot',
          '2 Edited Reels from Shoot',
          'Single-Page Landing Website',
        ],
        note: 'Ad spend billed separately.',
      },
    ],
    tables: [
      {
        label: 'Standalone Ad Management',
        items: [
          { label: 'Google Ads Management', price: '₹9,499 / month' },
          { label: 'Meta Ads Management', price: '₹6,499 / month' },
        ],
        note: 'If you only need campaigns run. Ad spend is separate; a management charge applies above set spend thresholds.',
      },
    ],
  },
  {
    id: 'graphic-design',
    eyebrow: 'Graphic Design',
    title: 'Graphic design',
    intro: 'Priced per piece. Final pricing depends on complexity, quantity and requirements.',
    tables: [
      {
        label: 'Design Rates',
        items: [
          { label: 'Social Media Design', price: 'From ₹1,000 / Creative' },
          { label: 'Premium Creative', price: 'From ₹1,500 / Creative' },
          { label: 'Ad Creative', price: 'From ₹1,500 / Creative' },
          { label: 'Poster / Promotional Design', price: 'From ₹1,500' },
          { label: 'Brochure Design', price: 'From ₹3,000' },
          { label: 'Catalogue Design', price: 'From ₹5,000' },
          { label: 'Presentation Design', price: 'From ₹3,500' },
          { label: 'YouTube Thumbnail', price: 'From ₹800' },
          { label: 'Infographic Design', price: 'From ₹1,500' },
          { label: 'Festival / Campaign Creative', price: 'From ₹1,500' },
        ],
      },
      {
        label: 'Add-on Services',
        items: [
          { label: 'Additional Social Media Creative', price: 'From ₹1,000' },
          { label: 'Additional Reel Edit', price: '₹3,000' },
          { label: 'Additional Reel Shoot + Edit', price: '₹5,000' },
          { label: 'Additional Brand Shoot', price: '₹3,000' },
          { label: 'Additional Website Pages', price: 'Custom Quote' },
          { label: 'Additional Campaigns', price: 'Custom Quote' },
        ],
      },
    ],
  },
  {
    id: 'brand-identity',
    eyebrow: 'Brand Identity & Video Content',
    title: 'Brand identity & video & content',
    intro:
      'Everything that gives your brand a face and a voice — from the logo to the reels that carry it.',
    tables: [
      {
        label: 'Brand Identity',
        items: [
          { label: 'Logo Design', price: '₹8,000' },
          { label: 'Logo Redesign', price: '₹6,000' },
          { label: 'Logo Animation', price: '₹5,000' },
          { label: 'Brand Identity — Starter Set', price: '₹15,000' },
          { label: 'Complete Branding', price: '₹45,000' },
          { label: 'Brand Guidelines', price: '₹12,000' },
          { label: 'Brand Strategy', price: '₹20,000' },
          { label: 'Brand Naming', price: '₹10,000' },
          { label: 'Typography System', price: '₹6,000' },
          { label: 'Colour Palette', price: '₹4,000' },
          { label: 'Visual Identity Kit', price: '₹25,000' },
        ],
      },
      {
        label: 'Video & Content',
        items: [
          { label: 'Reel Editing — Client Footage', price: '₹3,000 / Reel' },
          { label: 'Reel Shoot + Editing', price: '₹5,000 / Reel' },
          { label: 'Brand Shoot + 1 Edited Reel', price: '₹5,000' },
          { label: 'Brand Shoot Only', price: '₹3,000' },
          { label: 'Documentary Editing — Up to 5 Min', price: '₹5,000' },
          { label: 'Additional Documentary Duration', price: '₹1,000 / Min' },
        ],
        note: 'Documentary editing carries a ₹5,000 minimum charge even if the final video runs under 5 minutes — 6 min ₹6,000, 7 min ₹7,000, 8 min ₹8,000.',
      },
    ],
  },
  {
    id: 'stationery',
    eyebrow: 'Stationery & Terms',
    title: 'Business stationery & terms',
    intro: 'Print and identity collateral, plus the terms that apply across every package.',
    tables: [
      {
        label: 'Business Stationery',
        items: [
          { label: 'Business Card', price: '₹2,500' },
          { label: 'Premium Business Card', price: '₹4,500' },
          { label: 'Letterhead', price: '₹2,000' },
          { label: 'Envelope', price: '₹2,000' },
          { label: 'Invoice Design', price: '₹2,500' },
          { label: 'Email Signature', price: '₹1,500' },
          { label: 'Presentation Folder', price: '₹3,500' },
          { label: 'ID Card', price: '₹2,000' },
          { label: 'Certificate', price: '₹2,500' },
        ],
      },
    ],
    terms: pricingTerms,
  },
];

/**
 * Homepage teaser — one card per top-level category, each showing the lowest
 * published rate in that category.
 *
 * The figures are DERIVED from pricingGroups above rather than restated, so the
 * teaser can never drift out of step with the pricing page. Change a price in a
 * group and the teaser follows.
 */
const teaserCategories: { id: string; title: string; blurb: string; groups: string[] }[] = [
  {
    id: 'website',
    title: 'Web & App Development',
    blurb: 'Landing pages, business websites, e-commerce stores and mobile apps.',
    groups: ['website', 'ecommerce', 'apps'],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    blurb: 'Meta and Google ad management, plus always-on social content packages.',
    groups: ['marketing'],
  },
  {
    id: 'graphic-design',
    title: 'Design & Branding',
    blurb: 'Logos, brand identity, social creatives, reels, shoots and stationery.',
    groups: ['graphic-design', 'brand-identity', 'stationery'],
  },
];

/** Rupee figure plus any rate suffix, e.g. '₹6,499 / month' -> 6499 + '/ month'. */
function parsePrice(price: string, unit?: string): { amount: number; suffix: string } | null {
  const match = /₹\s*([\d,]+)\s*(\/\s*[A-Za-z]+)?/.exec(price);
  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ''));
  if (!Number.isFinite(amount)) return null;

  // A rate suffix may live in the price string ('₹6,499 / month') or, for
  // packages, in the separate unit field ('/ month').
  const fromPrice = match[2]?.replace(/\s+/g, ' ').trim();
  const fromUnit = unit?.trim().startsWith('/') ? unit.trim() : undefined;

  return { amount, suffix: fromPrice ?? fromUnit ?? '' };
}

/** Lowest published rate across a set of groups. Entries without a figure
 *  (e.g. 'Custom Quote') are skipped. */
function lowestRate(groupIds: string[]): { amount: number; suffix: string } | null {
  const priced = pricingGroups
    .filter((group) => groupIds.includes(group.id))
    .flatMap((group) => [
      ...(group.packages ?? []).map((pkg) => parsePrice(pkg.price, pkg.unit)),
      ...(group.tables ?? []).flatMap((table) => table.items.map((item) => parsePrice(item.price))),
    ])
    .filter((entry): entry is { amount: number; suffix: string } => entry !== null);

  return priced.reduce<{ amount: number; suffix: string } | null>(
    (lowest, entry) => (lowest === null || entry.amount < lowest.amount ? entry : lowest),
    null,
  );
}

const inr = new Intl.NumberFormat('en-IN');

export const pricingTeasers: PriceTeaser[] = teaserCategories.map((category) => {
  const lowest = lowestRate(category.groups);

  return {
    id: category.id,
    title: category.title,
    price: lowest ? `₹${inr.format(lowest.amount)}` : 'Custom Quote',
    unit: lowest ? [lowest.suffix, 'onwards'].filter(Boolean).join(' ') : 'on request',
    blurb: category.blurb,
  };
});
