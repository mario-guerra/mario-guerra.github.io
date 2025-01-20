// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Blog", url: "/blog" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Ecosystem",
    links: [
      { name: "TypeSpec", url: "https://typespec.io" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About", url: "/about" },
      { name: "Blog", url: "/blog" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  linkedin: "https://www.linkedin.com/in/mario-guerra/",
  x: "https://twitter.com/_marioguerra_",
  github: "https://github.com/mario-guerra",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};