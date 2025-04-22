// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Blog", url: "/blog" },
  { name: "Videos", url: "/videos" },
  { name: "Documentation", url: "/documentation" },
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
x: "https://x.com/_marioguerra_",
  github: "https://github.com/mario-guerra",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
