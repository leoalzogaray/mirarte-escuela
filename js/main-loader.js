(function () {
  const showOnPaths = ['/', '/index.html']; // ajustar según tu estructura
  const sessionKey = 'mainLoaderShown_v1';
  const fadeDuration = 350; // ms

  const isHome = showOnPaths.includes(location.pathname);
  const alreadyShown = sessionStorage.getItem(sessionKey);

  function removeExistingMainLoader() {
    const byId = document.getElementById('page-loader');
    if (byId) byId.remove();
    const dataNodes = document.querySelectorAll('[data-main-loader]');
    dataNodes.forEach(n => n.remove());
  }

  function createMainLoader() {
    if (document.getElementById('page-loader')) return null;
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'loader';
    loader.setAttribute('data-main-loader', 'true');
    loader.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
    document.body.appendChild(loader);
    return loader;
  }

  function hideAndRemove(el) {
    if (!el) return;
    el.style.transition = el.style.transition || `opacity ${fadeDuration}ms ease`;
    // Force reflow so transition applies
    void el.offsetWidth;
    el.style.opacity = '0';
    setTimeout(() => el.remove(), fadeDuration + 20);
  }

  if (isHome && !alreadyShown) {
    const existing = document.getElementById('page-loader') || document.querySelector('[data-main-loader]');
    const loader = existing || createMainLoader();

    window.addEventListener('load', () => {
      // pequeño delay para que se vea la animación si la carga fue muy rápida
      setTimeout(() => {
        hideAndRemove(loader);
      }, 200);
      sessionStorage.setItem(sessionKey, '1');
    });

    // caso en que el documento ya esté cargado
    if (document.readyState === 'complete') {
      setTimeout(() => {
        hideAndRemove(loader);
        sessionStorage.setItem(sessionKey, '1');
      }, 300);
    }
  } else {
    // No estamos en home o ya se mostró: eliminamos cualquier loader principal que exista
    removeExistingMainLoader();
  }
})();
