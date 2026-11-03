// Apply the saved preference before React and styles render. Dark is the default.
(() => {
  let theme = "dark";
  try {
    if (localStorage.getItem("organui-theme") === "light") theme = "light";
  } catch {
    /* Storage can be unavailable in private or restricted browsing. */
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#101814" : "#f6f7f3");
})();
