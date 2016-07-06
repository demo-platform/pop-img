$.fn.popImg = function() {

  var $layer = $("<div/>").css({
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    zIndex: 9999999,
    background: "#000",
    opacity: "0.6",
    display: "none"
  }).attr("data-id", "b_layer");

  var cloneImg = function($node) {
    var left = $node.offset().left;
    var top = $node.offset().top;
    var nodeW = $node.width();
    var nodeH = $node.height();
    return $node.clone().css({
      position: "fixed",
      width: nodeW,
      height: nodeH,
      left: left,
      top: top,
      zIndex: 10000000
    });
  };

  var justifyImg = function($c) {
    var dW = $(window).width();
    var dH = $(window).height();
    $c.css("cursor", "zoom-out").attr("data-b-img", 1);
    var img = new Image();
    img.onload = function(){
      /*
       * define big image size
       */
      //make new size by default
      var bigImageHeight  = ($(window).height()*.9).toFixed(0);
      var bigImageWidth   = (this.width*bigImageHeight/this.height).toFixed(0);
      //if the big image over range of the screen，use width of the original image for new image size setting
      if(bigImageWidth > $(window).width())
      {
        bigImageWidth   = ($(window).width()*.9).toFixed(0);
        bigImageHeight  = (this.height*bigImageWidth/this.width).toFixed(0);
      }
      //if the new image is larger than the original one，let's use the original image size
      bigImageWidth   = bigImageWidth>this.width?this.width:bigImageWidth;
      bigImageHeight  = bigImageHeight>this.height?this.height:bigImageHeight;
      /*
       * end
       */
      $c.stop().animate({
        width: bigImageWidth,
        height: bigImageHeight,
        left: (dW - bigImageWidth) / 2,
        top: (dH - bigImageHeight) / 2
      }, 300);
    };
    img.src = $c.attr("src");
  };

  this.each(function(){
    $(this).css("cursor", "zoom-in").on("click", function(){
      var $b = $("body");
      $layer.appendTo($b);
      $layer.fadeIn(300);
      var $c = cloneImg($(this));
      $c.appendTo($b);
      justifyImg($c);
    });
  });

  var timer = null;
  $(window).on("resize", function(){
    $("img[data-b-img]").each(function(){
      var $this = $(this);
      timer && clearTimeout(timer);
      timer = setTimeout(function(){
        justifyImg($this);
      }, 10);
    });
  });

  $(window).on("click keydown", function(evt){
    if(evt.type == "keydown" && evt.keyCode === 27) {
      $layer.fadeOut(300);
      $("img[data-b-img]").remove();
    }
    var $this = $(evt.target);
    if($this.attr("data-id") == "b_layer" || $this.attr("data-b-img") == 1) {
      $layer.fadeOut(300);
      $("img[data-b-img]").remove();
    }
  });

};
