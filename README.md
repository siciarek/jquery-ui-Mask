jquery-ui-Mask
==============

Simple extension to the jquery.ui library that displays fullscreen spinning loader.
View and message can be customized. No external graphics, css nor divs is required.

## Installation

Include script *after* the jQuery library and jQuery.ui script and css stylesheets (unless you are packaging scripts somehow else):

    <link type="text/css" media="all" rel="stylesheet" href="jquery-ui-1.8.21.custom/css/smoothness/jquery-ui-1.8.21.custom.css"/>
    <script type="text/javascript" src="jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="jquery-ui-1.8.21.custom/js/jquery-ui-1.8.21.custom.min.js"></script>

    <script type="text/javascript" src="/path/to/jquery.ui.Mask.js"></script>

## Demo page

[http://siciarek.linuxpl.info/jquery-star-rating-plugin/demo/index.html](http://siciarek.linuxpl.info/jquery-star-rating-plugin/demo/index.html)


## Usage

Default settings:

    jQuery.ui.Mask.show();                      // default message 'Please wait'.
    jQuery.ui.Mask.show('Hello, World!');       // customized message 'Hello World!'.
    jQuery.ui.Mask.hide();                      // hides loader.

Customized settings:

    var settings = {
        id: 'myLoadingScreen',
        loadingImg: 'images/ajax-loader.gif',
        fgColor: 'red',
        bgColor: 'yellow',
        defaultMessage: 'Hello, World!'
    };

    jQuery.ui.Mask.new(settings).show();        // Customized layout
    var loader = jQuery.ui.Mask.new(settings);  // Customized layout OOP approach

    loader.show();
    loader.hide();

Restore default settings:

    jQuery.ui.Mask.reset();


## Options

    {
        id: 'loadingScreen',
        loadingImg: 'data:image/gif;base64,R0lG...EQA7',
        fgColor: 'gray',
        bgColor: 'none',
        defaultMessage: 'Please wait'
    }

## Development

- Source hosted at [GitHub](https://github.com/siciarek/jquery-star-rating-plugin)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/siciarek/jquery-star-rating-plugin/issues)

## Authors

[Jacek Siciarek](https://github.com/siciarek)
