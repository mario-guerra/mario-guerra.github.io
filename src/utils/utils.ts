// Format the date to a string
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  
    return new Date(date).toLocaleDateString(undefined, options);
  }
  // Capitalize the first letter
function capitalize(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  const HSThemeAppearance = {
    init() {
      const defaultTheme = "default";
      let theme = typeof window !== "undefined" && localStorage.getItem("hs_theme") || defaultTheme;
      const htmlElement = document.querySelector("html");
      if (htmlElement && htmlElement.classList.contains("dark")) return;
      this.setAppearance(theme);
    },
    setAppearance(theme: string): void {
      const htmlElement: HTMLElement | null = document.querySelector("html");
      if (htmlElement) {
      htmlElement.classList.add(theme);
      }
    },
    getAppearance() {
      return typeof window !== "undefined" && localStorage.getItem("hs_theme") || "default";
    },
  };

  export { formatDate, capitalize, HSThemeAppearance };
