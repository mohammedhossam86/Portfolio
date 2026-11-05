// Initialize theme before render to prevent flash
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();

