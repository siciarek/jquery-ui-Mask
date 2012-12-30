/**
 * Fullscreen spinning loader with no external graphics, styles nor divs.
 *
 * Author: jsiciarek
 * Date: 30.07.12
 * Time: 13:52
 * Usage:
 *     // BASIC:
 *     jQuery.ui.Mask.show();                      // default message 'Please wait'.
 *     jQuery.ui.Mask.show('Hello, World!');       // customized message 'Hello World!'.
 *     jQuery.ui.Mask.hide();                      // hides loader.
 *
 *     // CUSTOMIZED:
 *     var settings = {
 *         id: 'myLoadingScreen',
 *         loadingImg: 'images/ajax-loader.gif',
 *         fgColor: 'red',
 *         bgColor: 'yellow',
 *         defaultMessage: 'Hello, World!'
 *     };
 *
 *     jQuery.ui.Mask.new(settings).show();        // Customized layout
 *     var loader = jQuery.ui.Mask.new(settings);  // Customized layout
 *
 *     loader.show();
 *     loader.hide();
 *
 *     jQuery.ui.Mask.reset();                     // restores default settings
 */

(function ($) {

    // This plugin requires jQuery.ui GUI framework:

    if (typeof $.ui == 'undefined') {
        alert('jQuery.ui object is required for jQuery.ui.Mask');
    }

    $.ui['Mask'] = {

        screen: null,
        dialog: null,
        settings: {},
        defaults: {
            id: 'loadingScreen',
            loadingImg: 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7',
            fgColor: 'gray',
            bgColor: 'white',
            defaultMessage: 'Please wait'
        },

        reset: function (options) {
            options = options || {};
            this.screen = null;
            this.dialog = null;
            this.settings = $.extend({}, this.defaults, options);
            return this;
        },

        new: function (options) {
            this.reset(options);
            return this.init();
        },

        init: function () {

            this.reset();

            if (this.screen == null) {
                this.screen = document.createElement('div');
                this.screen.setAttribute('id', this.settings.id);
                $('body').append(this.screen);
            }

            var fgcol = (typeof this.settings.fgColor != 'undefined') ? this.settings.fgColor : null;
            var bgcol = (typeof this.settings.bgColor != 'undefined') ? this.settings.bgColor : null;

            var csssettings = {};

            if (fgcol != null) {
                csssettings['border-color'] = fgcol;
            }

            if (bgcol != null) {
                csssettings['background-color'] = bgcol;
            }

            if (csssettings != {}) {
                $('.ui-corner-all').css(csssettings);
            }

            if (this.dialog == null) {
                $('#' + this.settings.id).dialog({
                    autoOpen: false,
                    dialogClass: this.settings.id + 'Window',
                    closeOnEscape: false,
                    draggable: false,
                    width: 'auto',
                    minHeight: 38,
                    modal: true,
                    buttons: {},
                    resizable: false,
                    open: function () {
                        // scrollbar fix for IE
                        $('body').css('overflow', 'hidden');
                    },
                    close: function () {
                        // reset overflow
                        $('body').css('overflow', 'auto');
                    }
                });
            }

            return this;
        },

        show: function (message) {

            if (this.dialog == null) {
                this.init();
            }

            message = message || this.settings.defaultMessage;

            $('.' + this.settings.id + 'Window .ui-dialog-titlebar').css({
                display: 'none'
            });

            var fgcol = (typeof this.settings.fgColor != 'undefined') ? this.settings.fgColor : null;
            var bgcol = (typeof this.settings.bgColor != 'undefined') ? this.settings.bgColor : 'white';

            var csssettings = {
                "background-image": "url(" + this.settings.loadingImg + ")",
                "background-repeat": "no-repeat",
                "background-position": "8px 6px",
                "background-color": bgcol,

                border: "1px solid " + fgcol,
                fontSize: 12,
                fontFamily: "sans-serif",
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 32
            };

            if (fgcol != null) {
                csssettings['color'] = fgcol;
            }

            $('#' + this.settings.id).css(csssettings);

            $('#' + this.settings.id).html(message + '&hellip;');
            $('#' + this.settings.id).dialog('open');
        },

        hide: function () {
            $('#' + this.settings.id).dialog('close');
        }
    };

})(jQuery);
