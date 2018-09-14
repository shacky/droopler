/**
 * @file
 *
 * Behavior for toggling geysir overlay.
 */

(function ($) {
  'use strict';

  Drupal.behaviors.d_p_geysir_toggle = {
    attach: function (context, settings) {
      var cookieName = 'd_p_geysir_toggle';

      /**
       * Function for changing button state.
       *
       * @param $button
       *   Button jQuery object.
       * @param value
       *   New value.
       */
      function d_p_geysir_toggle ($button, value) {
        $button.toggleClass('is-active').attr('aria-pressed', (value === 1) ? 'true' : 'false');
        $('.geysir-field-paragraph-wrapper').toggleClass('disabled');
      }

      $('.toolbar-icon-geysir-toggle', context).once('d-p-geysir-toggle').each(function () {
        var $button = $(this);
        if (typeof $.cookie(cookieName) !== 'undefined' && $.cookie(cookieName) === '0') {
          d_p_geysir_toggle($button, $.cookie(cookieName));
        }
        $button.closest('.d-p-toolbar-tab').removeClass('hidden');

        // Button click callback.
        $button.click(function () {
          if (typeof $.cookie(cookieName) === 'undefined' || $.cookie(cookieName) === '1') {
            $.cookie(cookieName, '0', {
              expires: 1,
              path: '/',
            });
            d_p_geysir_toggle($button, 0);
          } else {
            $.cookie(cookieName, '1', {
              expires: -1,
              path: '/',
            });
            d_p_geysir_toggle($button, 1);
          }
        });
      });
    }
  };
})(jQuery);
