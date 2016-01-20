# Background Attach Picture
This plugin allows you to add a background-attachment: fixed; effect to your picture element. What happens behind the scene is that it will create a mirrored image of the current image using 'currentSrc' on the <img/>. So when you change screen size based on your media attribute it will change the currentSrc of the image, which will then update the mirrored image.


## Why should I use this?
If you are building a CMS and you plan on using picture elements but you need a background-attachment effect. It also is written in just JavaScript and it is supported on IE8+ and all modern browsers.


## How to use
If you want to use a banner with content positioned in front of it then you would use this html structure.

### HTML
```
<section class="banner">
	<h1 class="banner__heading">
		Banner Heading
	</h1>

	<picture class="picture-element banner__picture" data-fixed-picture>
		<source media="(min-width: 1440px)" srcset="_client/images/banner-large-1x.jpg 1x, _client/images/banner-large-2x.jpg 2x" />
		<source media="(min-width: 1024px)" srcset="_client/images/banner-medium-1x.jpg 1x, _client/images/banner-medium-2x.jpg 2x" />
		<source media="(min-width: 0px)" srcset="_client/images/banner-small-1x.jpg 1x, _client/images/banner-small-2x.jpg 2x" />

		<img alt="Some image text" class="picture-element__image banner__image" src="_client/images/banner-large-1x.jpg" />
	</picture>
```

It is important that you add the the data attribute 'data-fixed-picture' to the picture element so the javascript can pick it up when the script is loaded in.


### CSS
```
/* This attribute gets added to the element that gets created from the picture element */

[data-fixed-scroller] {
	background-attachment: fixed;
	background-size: 100%;
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}

.picture-element {
	display: block;
	height: inherit;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: -1;
}

.picture-element__image {
	display: block;
	width: 100%;
}

.banner {
	display: block;
	height: 400px;
	position: relative;
}

```

## Browser support
We wrote this in JavaScript so the JS functionality works in IE8+ and all modern browsers. The only problem is you may need a fallback image for IE8 because background-size is not supported in IE8.
