/**
 * main-loader.js
 * 
 * Safe main loader implementation that displays the site-wide loading overlay
 * only on the first (home) page and removes/hides loader elements on other pages.
 * 
 * Usage:
 * Include this script in the global template/footer:
 * <script src="js/main-loader.js"></script>
 * 
 * Configuration:
 * - showOnPaths: Array of paths where the loader should be shown (default: ['/', '/index.html'])
 * - sessionStorage key: 'mirarteLoaderShown' - set to 'true' after first display
 * 
 * The script will:
 * 1. Check if current page is in showOnPaths
 * 2. If yes and not shown in session, inject/show loader
 * 3. If no, remove any existing loader elements
 * 4. Store session flag to avoid repeating in same session
 */

(function() {
  'use strict';

  // Configuration: paths where the loader should be shown
  const showOnPaths = ['/', '/index.html'];
  
  // Session storage key for tracking if loader was already shown
  const storageKey = 'mirarteLoaderShown';
  
  // Get current path (normalized)
  const currentPath = window.location.pathname;
  const normalizedPath = currentPath === '/' || currentPath === '' ? '/' : currentPath;
  
  // Check if we're on a page that should show the loader
  const shouldShowLoader = showOnPaths.some(path => {
    if (path === '/') {
      return normalizedPath === '/' || normalizedPath.endsWith('/index.html');
    }
    return normalizedPath.endsWith(path);
  });
  
  // Check if loader was already shown in this session
  const loaderAlreadyShown = sessionStorage.getItem(storageKey) === 'true';
  
  /**
   * Remove all existing loader elements from the page
   */
  function removeExistingLoaders() {
    // Remove elements with id="loader"
    const loaderById = document.getElementById('loader');
    if (loaderById) {
      loaderById.remove();
    }
    
    // Remove elements with data-main-loader attribute
    const loadersByAttr = document.querySelectorAll('[data-main-loader]');
    loadersByAttr.forEach(loader => loader.remove());
    
    // Ensure scroll is enabled
    document.body.style.overflow = 'auto';
    
    // Show main content if it's hidden
    const main = document.querySelector('main');
    if (main && main.style.display === 'none') {
      main.style.display = 'block';
    }
  }
  
  /**
   * Initialize and show the loader (only on home page, first visit)
   */
  function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) {
      console.warn('Loader element not found. Expected element with id="loader".');
      return;
    }
    
    // Hide scroll while loading
    document.body.style.overflow = 'hidden';
    
    // Show loader with fade-in
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    
    // Wait for page to load
    window.addEventListener('load', function() {
      setTimeout(function() {
        // Add fade-out class
        loader.classList.add('fade-out');
        
        setTimeout(function() {
          // Hide loader completely
          loader.style.display = 'none';
          
          // Restore scroll
          document.body.style.overflow = 'auto';
          
          // Show main content
          const main = document.querySelector('main');
          if (main && main.style.display === 'none') {
            main.style.display = 'block';
          }
          
          // Mark loader as shown in this session
          sessionStorage.setItem(storageKey, 'true');
        }, 800); // Match fade-out transition time
      }, 1500); // Total loader visible time
    });
  }
  
  // Main logic
  if (shouldShowLoader && !loaderAlreadyShown) {
    // We're on the home page and haven't shown the loader yet - initialize it
    initLoader();
  } else {
    // We're on another page OR already showed loader - remove any existing loaders
    removeExistingLoaders();
  }
})();
