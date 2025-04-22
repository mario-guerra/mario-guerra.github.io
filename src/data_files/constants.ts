import ogImageSrc from "@images/mario-chipset.png";

export const SITE = {
  title: "Mario Guerra",
  tagline: "Product Manager",
  description: "Product Manager for TypeSpec at Microsoft, specializing in increasing developer productivity through generative AI, modern build tools, and industry best practices.",
  description_short: "Product Manager at Microsoft, enhancing developer productivity with generative AI, modern tools, and best practices.",
  url: "https://marioguerra.xyz",
  author: "Mario Guerra",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: ${SITE.tagline}`,
  description: SITE.description,
  image: ogImageSrc,
};
