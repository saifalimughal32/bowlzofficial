/**
 * Bowlz Shopify Theme — main JavaScript
 */
(function () {
  'use strict';

  var STORAGE_AGE = 'bowlz_age_verified';
  var cartDrawerSectionId = 'cart-drawer';

  /* ── Utilities ── */
  function formatMoney(cents, currency) {
    currency = currency || 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(cents / 100);
  }

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function formatCount(value) {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  }

  /* ── Age Gate ── */
  function initAgeGate() {
    var gate = document.getElementById('age-gate');
    if (!gate) return;
    var verified = localStorage.getItem(STORAGE_AGE) === 'true';
    if (verified) {
      gate.hidden = true;
      return;
    }
    gate.hidden = false;
    document.body.style.overflow = 'hidden';
    var yesBtn = gate.querySelector('[data-age-verify]');
    if (yesBtn) {
      yesBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_AGE, 'true');
        gate.hidden = true;
        document.body.style.overflow = '';
      });
    }
  }

  /* ── Header scroll & mobile menu ── */
  function initHeader() {
    var header = document.querySelector('[data-site-header]');
    if (!header) return;

    var bar = header.querySelector('[data-header-bar]');
    var mobileMenu = header.querySelector('[data-mobile-menu]');
    var menuToggle = header.querySelector('[data-menu-toggle]');
    var shopToggle = header.querySelector('[data-shop-toggle]');
    var shopSubmenu = header.querySelector('[data-shop-submenu]');
    var staticHeader = header.dataset.staticHeader === 'true';

    function updateScroll() {
      var scrolled = window.scrollY > 40;
      var solid = scrolled || staticHeader || (mobileMenu && mobileMenu.classList.contains('is-open'));
      if (bar) {
        bar.classList.toggle('site-header__bar--solid', solid);
        bar.classList.toggle('site-header__bar--transparent', !solid);
      }
      var logo = header.querySelector('[data-logo]');
      if (logo) logo.classList.toggle('logo-link--light', !solid);
      header.querySelectorAll('[data-header-icon]').forEach(function (btn) {
        btn.classList.toggle('header-icon-btn--dark', solid);
        btn.classList.toggle('header-icon-btn--light', !solid);
      });
      header.querySelectorAll('[data-nav-link]').forEach(function (link) {
        link.classList.toggle('nav-link-dark', solid);
        link.classList.toggle('nav-link-light', !solid);
      });
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
        updateScroll();
      });
    }

    if (shopToggle && shopSubmenu) {
      shopToggle.addEventListener('click', function () {
        var open = shopSubmenu.classList.toggle('is-open');
        shopToggle.setAttribute('aria-expanded', open);
      });
    }
  }

  /* ── Animated Counter ── */
  function initAnimatedCounters() {
    document.querySelectorAll('[data-counter]').forEach(function (el) {
      var end = parseInt(el.dataset.counter, 10) || 0;
      var suffix = el.dataset.counterSuffix || '';
      var duration = parseInt(el.dataset.counterDuration, 10) || 2000;
      var started = false;

      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          observer.disconnect();
          var start = performance.now();
          function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            el.textContent = formatCount(easeOutExpo(progress) * end) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      }, { threshold: 0.3 });
      observer.observe(el);
    });
  }

  /* ── Product Carousel ── */
  function initCarousels() {
    document.querySelectorAll('[data-product-carousel]').forEach(function (wrap) {
      var track = wrap.querySelector('[data-carousel-track]');
      var prevBtn = wrap.querySelector('[data-carousel-prev]');
      var nextBtn = wrap.querySelector('[data-carousel-next]');
      if (!track) return;

      function updateState() {
        var maxScroll = track.scrollWidth - track.clientWidth;
        if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
        if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 2;
      }

      function scroll(dir) {
        var slide = track.querySelector('[data-carousel-slide]');
        var gap = parseFloat(getComputedStyle(track).gap) || 24;
        var amount = slide ? slide.offsetWidth + gap : track.clientWidth * 0.8;
        track.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
      }

      track.addEventListener('scroll', updateState, { passive: true });
      window.addEventListener('resize', updateState);
      if (prevBtn) prevBtn.addEventListener('click', function () { scroll('left'); });
      if (nextBtn) nextBtn.addEventListener('click', function () { scroll('right'); });
      updateState();
    });
  }

  /* ── Product Gallery ── */
  function initProductGalleries() {
    document.querySelectorAll('[data-product-gallery]').forEach(function (gallery) {
      var mainImg = gallery.querySelector('[data-gallery-main]');
      var thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
      thumbs.forEach(function (thumb, i) {
        thumb.addEventListener('click', function () {
          thumbs.forEach(function (t) { t.classList.remove('product-gallery-thumb-active'); });
          thumb.classList.add('product-gallery-thumb-active');
          if (mainImg) {
            mainImg.src = thumb.dataset.src || '';
            mainImg.alt = thumb.dataset.alt || '';
          }
        });
      });
    });
  }

  /* ── Variant Picker ── */
  function initVariantPickers() {
    document.querySelectorAll('[data-variant-picker]').forEach(function (picker) {
      var form = picker.closest('form') || document.querySelector('[data-product-form]');
      if (!form) return;

      var variantInput = form.querySelector('[name="id"]');
      var priceEl = document.querySelector('[data-product-price]');
      var compareEl = document.querySelector('[data-product-compare]');
      var saveEl = document.querySelector('[data-product-save]');
      var addBtn = form.querySelector('[data-add-to-cart]');
      var variants = JSON.parse(picker.dataset.variants || '[]');

      function findVariant(selections) {
        return variants.find(function (v) {
          return v.options.every(function (opt, i) {
            return selections[i] === opt;
          });
        });
      }

      function updateVariant() {
        var selections = [];
        picker.querySelectorAll('[data-option-group]').forEach(function (group) {
          var selected = group.querySelector('.is-selected, .variant-pill.is-selected, .color-swatch.is-selected');
          selections.push(selected ? selected.dataset.value : group.dataset.default);
        });
        var variant = findVariant(selections);
        if (!variant) return;

        if (variantInput) variantInput.value = variant.id;
        if (priceEl) priceEl.textContent = formatMoney(variant.price, variant.currency);
        if (compareEl) {
          if (variant.compare_at_price && variant.compare_at_price > variant.price) {
            compareEl.textContent = formatMoney(variant.compare_at_price, variant.currency);
            compareEl.style.display = '';
            if (saveEl) {
              saveEl.textContent = 'Save $' + Math.round((variant.compare_at_price - variant.price) / 100);
              saveEl.style.display = '';
            }
          } else {
            compareEl.style.display = 'none';
            if (saveEl) saveEl.style.display = 'none';
          }
        }
        if (addBtn) {
          addBtn.disabled = !variant.available;
          addBtn.textContent = variant.available ? addBtn.dataset.labelAdd || 'Add to Cart' : 'Sold Out';
        }
      }

      picker.querySelectorAll('[data-option-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var group = btn.closest('[data-option-group]');
          group.querySelectorAll('[data-option-value]').forEach(function (b) {
            b.classList.remove('is-selected');
          });
          btn.classList.add('is-selected');
          updateVariant();
        });
      });

      updateVariant();
    });
  }

  /* ── Sticky ATC ── */
  function initStickyAtc() {
    var buybox = document.getElementById('buybox');
    var sticky = document.querySelector('[data-sticky-atc]');
    if (!buybox || !sticky) return;

    var observer = new IntersectionObserver(function (entries) {
      sticky.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0 });
    observer.observe(buybox);

    var stickyBtn = sticky.querySelector('[data-sticky-add]');
    var mainBtn = document.querySelector('[data-add-to-cart]');
    if (stickyBtn && mainBtn) {
      stickyBtn.addEventListener('click', function () { mainBtn.click(); });
    }
  }

  /* ── FAQ Accordion ── */
  function initFaq() {
    document.querySelectorAll('[data-faq-item]').forEach(function (item) {
      var btn = item.querySelector('[data-faq-toggle]');
      var panel = item.querySelector('[data-faq-panel]');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open);
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
      });
    });
  }

  /* ── Wholesale section ── */
  function initWholesale() {
    var section = document.querySelector('[data-wholesale-section]');
    if (!section) return;

    var options = section.querySelector('[data-wholesale-options]');
    var formWrap = section.querySelector('[data-wholesale-form]');
    var backBtn = section.querySelector('[data-wholesale-back]');

    section.querySelectorAll('[data-wholesale-option]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (options) options.hidden = true;
        if (formWrap) formWrap.hidden = false;
      });
    });

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (options) options.hidden = false;
        if (formWrap) formWrap.hidden = true;
      });
    }
  }

  /* ── Cart Drawer (Ajax Cart API) ── */
  var Cart = {
    drawer: null,
    overlay: null,
    isOpen: false,
    isLoading: false,

    init: function () {
      this.overlay = document.getElementById('cart-drawer-overlay');
      this.drawer = document.getElementById('cart-drawer');
      if (!this.overlay) return;

      var self = this;
      document.querySelectorAll('[data-cart-open]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          self.open();
        });
      });

      this.overlay.querySelector('[data-cart-close]')?.addEventListener('click', function () {
        self.close();
      });
      this.overlay.querySelector('[data-cart-backdrop]')?.addEventListener('click', function () {
        self.close();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && self.isOpen) self.close();
      });

      this.updateCount();
      if (this.drawer) this.bindDrawerEvents();
    },

    open: function () {
      this.isOpen = true;
      this.overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      this.refresh();
    },

    close: function () {
      this.isOpen = false;
      this.overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    },

    refresh: function () {
      var self = this;
      fetch('/cart?section_id=' + cartDrawerSectionId)
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');
          var newDrawer = doc.getElementById('cart-drawer');
          if (newDrawer && self.drawer) {
            self.drawer.innerHTML = newDrawer.innerHTML;
            self.bindDrawerEvents();
          }
          self.updateCount();
        });
    },

    bindDrawerEvents: function () {
      var self = this;
      this.drawer.querySelectorAll('[data-cart-qty-change]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.dataset.lineKey;
          var qty = parseInt(btn.dataset.qty, 10);
          self.changeLine(key, qty);
        });
      });
      this.drawer.querySelectorAll('[data-cart-remove]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          self.changeLine(btn.dataset.lineKey, 0);
        });
      });
      this.drawer.querySelector('[data-cart-checkout]')?.addEventListener('click', function () {
        window.location.href = '/checkout';
      });
      var upsellBtn = this.drawer.querySelector('[data-cart-upsell]');
      if (upsellBtn) {
        upsellBtn.addEventListener('click', function () {
          var id = upsellBtn.dataset.variantId;
          if (id) self.add(parseInt(id, 10), 1);
        });
      }
    },

    updateCount: function () {
      fetch('/cart.js')
        .then(function (r) { return r.json(); })
        .then(function (cart) {
          document.querySelectorAll('[data-cart-count]').forEach(function (el) {
            el.textContent = cart.item_count;
            el.style.display = cart.item_count > 0 ? '' : 'none';
          });
        });
    },

    add: function (variantId, quantity) {
      var self = this;
      if (self.isLoading) return Promise.resolve();
      self.isLoading = true;
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: variantId, quantity: quantity || 1 }] })
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          self.isLoading = false;
          self.open();
          return self.refresh();
        })
        .catch(function () { self.isLoading = false; });
    },

    changeLine: function (key, quantity) {
      var self = this;
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity })
      }).then(function () { self.refresh(); });
    }
  };

  /* ── Add to Cart forms & buttons ── */
  function initAddToCart() {
    document.querySelectorAll('[data-product-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('[data-add-to-cart]');
        var variantId = parseInt(form.querySelector('[name="id"]').value, 10);
        if (!variantId || btn.disabled) return;

        btn.disabled = true;
        var originalText = btn.textContent;
        btn.textContent = 'Adding…';

        Cart.add(variantId, 1).then(function () {
          btn.classList.add('btn-success-pulse');
          btn.textContent = 'Added ✓';
          setTimeout(function () {
            btn.classList.remove('btn-success-pulse');
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        });
      });
    });

    document.querySelectorAll('[data-quick-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var variantId = parseInt(btn.dataset.variantId, 10);
        if (!variantId || btn.disabled) return;
        btn.disabled = true;
        btn.textContent = 'Adding…';
        Cart.add(variantId, 1).then(function () {
          btn.textContent = 'Added ✓';
          setTimeout(function () {
            btn.textContent = btn.dataset.label || 'Add to Cart';
            btn.disabled = false;
          }, 2000);
        });
      });
    });
  }

  /* ── Newsletter / Contact mailto forms ── */
  function initMailtoForms() {
    document.querySelectorAll('[data-mailto-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.dataset.mailtoEmail || '';
        var subject = form.dataset.mailtoSubject || 'Contact';
        var bodyFn = form.dataset.mailtoBodyFn;
        var body = '';
        if (bodyFn && window[bodyFn]) {
          body = window[bodyFn](new FormData(form));
        } else {
          var fd = new FormData(form);
          body = Array.from(fd.entries()).map(function (p) { return p[0] + ': ' + p[1]; }).join('\n');
        }
        window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        var success = form.parentElement.querySelector('[data-form-success]');
        if (success) {
          form.hidden = true;
          success.hidden = false;
        }
      });
    });
  }

  window.bowlzWholesaleBody = function (fd) {
    var lines = [
      'Name/Shop: ' + fd.get('nameShop'),
      'Tax ID/EIN: ' + (fd.get('taxId') || '—'),
      'Email: ' + fd.get('email'),
      'Phone: ' + fd.get('phone'),
      'Country: ' + fd.get('country'),
      'Address: ' + fd.get('address'),
      'City: ' + fd.get('city'),
      'Postal code: ' + fd.get('postalCode'),
      'Preferred contact: ' + fd.get('contactMethod'),
      '',
      fd.get('message') || ''
    ];
    return lines.join('\n');
  };

  window.bowlzContactBody = function (fd) {
    return 'Name: ' + fd.get('name') + '\nEmail: ' + fd.get('email') + '\n\n' + (fd.get('message') || '');
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initAgeGate();
    initHeader();
    initAnimatedCounters();
    initCarousels();
    initProductGalleries();
    initVariantPickers();
    initStickyAtc();
    initFaq();
    initWholesale();
    Cart.init();
    initAddToCart();
    initMailtoForms();
  });

  window.BowlzCart = Cart;
})();
