## Pop Img

A simple jQuery plugin for poping imgs in articles without any additional css or image.

There are no settings in this plugin, so that making it much simple.

### usage

```javascript
$(".container img").popImg();
```

The effect is pop a half opacity layer fixed full of webpage, then show the target image in it's original size.

Click any area will close the img show.

> Attention: I set a very large `z-index` for layer and img.
 