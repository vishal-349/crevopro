import type { ServiceDetail } from '@/types/content';

/** Rich, per-service content powering the premium detail pages, keyed by slug. */
export const serviceDetails: Record<string, ServiceDetail> = {
  'brand-identity-creative': {
    slug: 'brand-identity-creative',
    title: 'Brand Identity & Creative',
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

  'social-media-marketing': {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    eyebrow: 'Social & Community',
    tagline: 'Show up, stand out, stay top of mind.',
    heroDescription:
      'Always-on social content, reels, and community management — a consistent, on-brand presence that grows your audience and turns followers into customers.',
    stats: [
      { value: 3, suffix: 'x', label: 'Avg. engagement lift' },
      { value: 20, suffix: '+', label: 'Posts / month' },
      { value: 40, suffix: '+', label: 'Brands managed' },
      { value: 90, suffix: '%', label: 'On-time delivery' },
    ],
    whatWeDo: [
      {
        title: 'Content Planning',
        description: 'A monthly calendar mapped to your goals, launches, and trending moments.',
      },
      {
        title: 'Creatives & Reels',
        description: 'Scroll-stopping posts, stories, and short-form video that get shared.',
      },
      {
        title: 'Captions & Copy',
        description: 'On-brand captions and hooks written to start conversations and drive action.',
      },
      {
        title: 'Community Management',
        description: 'We reply, engage, and nurture your audience so the brand feels alive.',
      },
    ],
    process: [
      {
        title: 'Audit',
        description: 'We review your channels, audience, and competitors to find quick wins.',
      },
      {
        title: 'Strategy',
        description: 'A content pillar system and posting cadence built around your brand.',
      },
      {
        title: 'Create',
        description: 'We design, write, and schedule a full month of content for approval.',
      },
      {
        title: 'Engage & Optimise',
        description: 'We manage the community and double down on what the data rewards.',
      },
    ],
    benefits: [
      {
        title: 'Consistent presence',
        description: 'A steady, professional feed that builds trust with every visitor.',
      },
      {
        title: 'Real engagement',
        description: 'Content built for saves, shares, and comments — not just likes.',
      },
      {
        title: 'Audience growth',
        description: 'Reach new, relevant followers who actually become customers.',
      },
      {
        title: 'Time back',
        description: 'We run the channels end-to-end so you can run the business.',
      },
    ],
    highlights: [
      { title: 'Gourmet Social Surge', category: 'Content + Reels' },
      { title: 'Pretty Launch Calendar', category: 'Campaign' },
      { title: 'Tech Connect Always-On', category: 'Community' },
      { title: 'Ansika Reel Series', category: 'Short-form Video' },
    ],
    whyChooseUs: [
      {
        title: 'Creators in-house',
        description: 'Strategy, design, and copy under one roof for fast, cohesive content.',
      },
      {
        title: 'Brand-safe & on-tone',
        description: 'Everything stays true to your voice and visual identity.',
      },
      {
        title: 'Reported clearly',
        description: 'Simple monthly reporting on growth, reach, and engagement.',
      },
    ],
    faqs: [
      {
        question: 'Which platforms do you manage?',
        answer:
          'Primarily Instagram, Facebook, and LinkedIn, with YouTube and others added based on where your audience actually is.',
      },
      {
        question: 'Do you create the content too?',
        answer:
          'Yes — planning, design, captions, and reels are all produced in-house. You simply review and approve.',
      },
      {
        question: 'How many posts do I get?',
        answer:
          'Packages typically include 15–25 pieces a month across posts, stories, and reels, tailored to your goals.',
      },
      {
        question: 'Will you handle replies and DMs?',
        answer:
          'Community management is included so comments and messages are answered promptly and on-brand.',
      },
    ],
    ctaHeading: 'Ready to grow your social presence?',
    ctaText: 'Get a free social audit and a content plan tailored to your brand.',
  },

  'performance-marketing': {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    eyebrow: 'Growth & Paid Media',
    tagline: 'Ad spend in, measurable revenue out.',
    heroDescription:
      'Data-driven Meta and Google campaigns — engineered, tested, and optimised daily to lower your cost per lead and grow a return on ad spend you can actually see.',
    stats: [
      { value: 4, suffix: 'x', label: 'Avg. ROAS' },
      { value: 250, suffix: '%', label: 'Avg. traffic lift' },
      { value: 30, suffix: '+', label: 'Active campaigns' },
      { value: 1.2, suffix: 'M+', label: 'Monthly reach' },
    ],
    whatWeDo: [
      {
        title: 'Meta Ads',
        description: 'Facebook and Instagram campaigns tuned for the lowest cost per result.',
      },
      {
        title: 'Google Ads',
        description: 'Search, Performance Max, and YouTube to capture and create demand.',
      },
      {
        title: 'Landing Pages',
        description: 'High-converting pages built to turn paid clicks into customers.',
      },
      {
        title: 'Tracking & Analytics',
        description: 'Clean conversion tracking and dashboards that tie spend to revenue.',
      },
    ],
    process: [
      {
        title: 'Audit',
        description: 'We benchmark your funnel, accounts, and competitors to find the fastest wins.',
      },
      {
        title: 'Strategy',
        description: 'A channel mix and offer plan built around your goals and budget.',
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
        title: 'Profit-focused',
        description: 'We optimise for ROAS and revenue, not vanity metrics.',
      },
    ],
    highlights: [
      { title: 'Care First Lead Engine', category: 'Paid + Search' },
      { title: 'Oculus Launch Campaign', category: 'Performance Ads' },
      { title: 'Pretty D2C Scale-Up', category: 'Meta Ads' },
      { title: 'Tech Connect PMax', category: 'Google Ads' },
    ],
    whyChooseUs: [
      {
        title: 'Revenue-first',
        description: 'We optimise for pipeline and ROAS, not impressions and likes.',
      },
      {
        title: 'Creative + media',
        description: 'Ad creative, copy, and landing pages produced under one roof for speed.',
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
          'Paid channels can show traction within the first few weeks. We set realistic milestones and optimise from real data.',
      },
      {
        question: 'What ad budget do I need?',
        answer:
          'We tailor the plan to your stage and recommend a media budget that fits your goals — lean to scale-up.',
      },
      {
        question: 'Do you make the ad creative?',
        answer:
          'Yes. Strategy, ad creative, copy, and landing pages are all produced in-house so campaigns ship fast.',
      },
      {
        question: 'How do you report performance?',
        answer:
          'You get a live dashboard plus a clear monthly readout tying spend to leads, sales, and ROAS.',
      },
    ],
    ctaHeading: 'Ready to turn ad spend into revenue?',
    ctaText: 'Get a free growth audit and a paid-media plan tailored to your business.',
  },

  'brand-shoot-editing': {
    slug: 'brand-shoot-editing',
    title: 'Brand Shoot & Editing',
    eyebrow: 'Photography & Video',
    tagline: 'Content that looks as good as your brand.',
    heroDescription:
      'Professional brand shoots, product photography, and reel/video editing — premium visuals and scroll-stopping edits that make your brand look the part everywhere.',
    stats: [
      { value: 200, suffix: '+', label: 'Shoots delivered' },
      { value: 5, suffix: 'k+', label: 'Edits produced' },
      { value: 48, suffix: 'h', label: 'Avg. edit turnaround' },
      { value: 4, suffix: 'K', label: 'Up to 4K video' },
    ],
    whatWeDo: [
      {
        title: 'Brand & Product Shoots',
        description: 'Styled, lit, and art-directed photography that elevates your products.',
      },
      {
        title: 'Reels & Short-form Video',
        description: 'Story-driven reels shot and cut for maximum reach and retention.',
      },
      {
        title: 'Video Editing',
        description: 'Punchy edits with captions, motion, and sound design that hold attention.',
      },
      {
        title: 'Retouching & Grading',
        description: 'Professional retouching and colour grading for a consistent, premium look.',
      },
    ],
    process: [
      {
        title: 'Plan',
        description: 'We build a shot list and mood board aligned to your brand and channels.',
      },
      {
        title: 'Shoot',
        description: 'A guided, efficient shoot day with professional lighting and direction.',
      },
      {
        title: 'Edit',
        description: 'We cut, retouch, grade, and caption every deliverable to spec.',
      },
      {
        title: 'Deliver',
        description: 'Organised, ready-to-post assets sized for every platform you need.',
      },
    ],
    benefits: [
      {
        title: 'Premium perception',
        description: 'High-quality visuals instantly make your brand look bigger and more trusted.',
      },
      {
        title: 'Content that performs',
        description: 'Edits built for the feed — designed to stop the scroll and get shares.',
      },
      {
        title: 'A full content bank',
        description: 'One shoot fuels weeks of posts, ads, and reels across channels.',
      },
      {
        title: 'Consistent look',
        description: 'A unified style and grade so every piece feels unmistakably yours.',
      },
    ],
    highlights: [
      { title: 'Gourmet Product Shoot', category: 'Photography' },
      { title: 'Pretty Reel Series', category: 'Short-form Video' },
      { title: 'Ewaan Brand Film', category: 'Video Editing' },
      { title: 'Ansika Catalogue Shoot', category: 'Product Photography' },
    ],
    whyChooseUs: [
      {
        title: 'Shoot + edit in-house',
        description: 'One team captures and finishes, so the look stays consistent and fast.',
      },
      {
        title: 'Built for social',
        description: 'Every asset is delivered sized and formatted for where it will live.',
      },
      {
        title: 'Fast turnaround',
        description: 'Tight, reliable timelines so your content never goes stale.',
      },
    ],
    faqs: [
      {
        question: 'Do you travel for shoots?',
        answer:
          'Yes — we shoot on location or in-studio. We plan logistics up front so the day runs smoothly.',
      },
      {
        question: 'Can you edit footage I already have?',
        answer:
          'Absolutely. Send us your raw photos or footage and we will retouch, edit, and grade it to a premium finish.',
      },
      {
        question: 'What formats do I receive?',
        answer:
          'You get assets sized for every platform — vertical reels, square posts, and high-res stills for web and print.',
      },
      {
        question: 'How fast is delivery?',
        answer:
          'Most edits are delivered within 48–72 hours, with full shoots delivered on an agreed schedule.',
      },
    ],
    ctaHeading: 'Make your content look premium.',
    ctaText: 'Tell us what you need to shoot and we will plan a session that delivers.',
  },

  'digital-signage': {
    slug: 'digital-signage',
    title: 'Digital Signage',
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

  'web-design-development': {
    slug: 'web-design-development',
    title: 'Web Design & Development',
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
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
