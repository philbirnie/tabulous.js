/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function($, window, document, undefined) {

  var pluginName = "tabulous",
    defaults = {
      effect: 'scale',
      showFirst: true
    };

  // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

  function Plugin(element, options) {
    this.element = element;
    this.$elem = $(this.element);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {

    init: function() {

      var $tabsContentContainer = this.$elem.find('.tabs__container');

      var $allContetDivs = $tabsContentContainer.children('div');

      var $navigation = this.$elem.find('.tabs__navigation');

      var $navigationLinks = $navigation.children('li');

      var $hideScaleElements = this.$elem.children('.tabs__container').children('div');

      if (this.options.showFirst) {
        var firstNavigationElement = $navigationLinks.eq(0);

        $hideScaleElements = $hideScaleElements.not(':first');

        var firstdivheight = $tabsContentContainer.find('div:first').outerHeight(true);

        $tabsContentContainer.css('height', firstdivheight + 'px');

        firstNavigationElement.addClass('tabulous_active');
      }

      $allContetDivs.css({'position': 'absolute'});

      if (this.options.effect == 'scale') {
        $hideScaleElements.addClass('hidescale');
      } else if (this.options.effect == 'slideLeft') {
        $hideScaleElements.addClass('hideleft');
      } else if (this.options.effect == 'scaleUp') {
        $hideScaleElements.addClass('hidescaleup');
      } else if (this.options.effect == 'flip') {
        $hideScaleElements.addClass('hideflip');
      }

      $navigationLinks.bind('click', {myOptions: this.options}, function(e) {
        e.preventDefault();

        var $options = e.data.myOptions;
        var effect = $options.effect;

        var $clickedLink = $(this);
        var thislink = $clickedLink.children('a').eq(0).attr('href');
        var thisdivwidth;

        var linkWasOpen = $clickedLink.hasClass('tabulous_active');

        $tabsContentContainer.addClass('transition');

        $navigationLinks.removeClass('tabulous_active');
        if (!linkWasOpen) {
          $clickedLink.addClass('tabulous_active');
          thisdivwidth = $tabsContentContainer.find('div' + thislink).outerHeight(true);

          if (effect == 'scale') {
            $allContetDivs.removeClass('showscale').addClass('make_transist').addClass('hidescale');
            $tabsContentContainer.find('div' + thislink).addClass('make_transist').addClass('showscale');
          } else if (effect == 'slideLeft') {
            $allContetDivs.removeClass('showleft').addClass('make_transist').addClass('hideleft');
            $tabsContentContainer.find('div' + thislink).addClass('make_transist').addClass('showleft');
          } else if (effect == 'scaleUp') {
            $allContetDivs.removeClass('showscaleup').addClass('make_transist').addClass('hidescaleup');
            $tabsContentContainer.find('div' + thislink).addClass('make_transist').addClass('showscaleup');
          } else if (effect == 'flip') {
            $allContetDivs.removeClass('showflip').addClass('make_transist').addClass('hideflip');
            $tabsContentContainer.find('div' + thislink).addClass('make_transist').addClass('showflip');
          }
        } else {
          $allContetDivs.removeClass('showscale').addClass('make_transist').addClass('hidescale');
          thisdivwidth = 0;
        }

        $tabsContentContainer.css('height', thisdivwidth + 'px');

      });
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      new Plugin(this, options);
    });
  };

})(jQuery, window, document);

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = function(func, wait, immediate) {
  let timeout;
  return function() {
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  };
};

module.exports = debounce;
