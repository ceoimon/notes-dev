$(document).ready(function() {
  $('#loader_mb').css({display: 'block',opacity: '1'});
  if(isMobile()){
    $('#mySVG').css({top: (($(window).height() / 2 - 155) + 'px'), left: (($(window).width() / 2 - 135) + 'px')});
    $('#mySVG_2').css({top: (($(window).height() / 2 + 75) + 'px'), left: (($(window).width() / 2 - 150) + 'px')});
    var rule = /(.png$|.jpg$|.jpeg$|.bmp$)/;
    var images = $('#posts').find('.has-mobile-pic');
    images.each(function() {
      var url = $(this).attr('data-original');
      var cap = rule.exec(url);
      $(this).attr('data-original', url + '@mb' + cap[0]);
    })
  }

  if(hasLoader()){
    $('body').bind("pageLoaderFinish", function () {
      setTimeout(function(){
        $("#mySVG").delay(50).animate({top: "35px", opacity: "0"}, 300, 'swing');
        $("#mySVG_2").delay(50).animate({top: "35px", opacity: "0"}, 300, 'swing', loaderCB);
      },300);
    });
    pageLoader();
  }

  function loaderCB() {
    $("#loader_mb").css('display','none');
    $('.container').css('display','block');
    motionIntegrator.bootstrap();
    $("#posts").find('img').lazyload({
      threshold : 200,
      effect: "fadeIn"
    });
    if(location.hash !== ''){
      var hash = location.hash;
      location.hash = 'ceoimon';
      location.hash = hash;
    }
  }

  function pageLoader() {
    var loaderContainer = $("#loader_mb");
    var counter = 0;

    if(!isMobile()) {
      imageLoader('/images/shejiao_32.png');
      imageLoader('/images/fancybox_btn.svg');
      imageLoader('/vendors/fancybox/source/fancybox_loading.gif');

      fontLoader('Lato', loaderContainer[0]);
      fontLoader('Lato', loaderContainer[0], 'bold');
      fontLoader('Lato', loaderContainer[0], 'italic');
      fontLoader('CEOIMONs Open Sans', loaderContainer[0]);
      fontLoader('CEOIMONs iconfront', loaderContainer[0]);
      fontLoader('FontAwesome', loaderContainer[0]);
      
      $('body').bind('fontLoaded', resourceLoaded);
    } else {
      $(window).bind('load', loadEnd);
    }


    function loadEnd() {
      $('body').trigger('pageLoaderFinish');
    }

    function resourceLoaded() {
      counter--;
      if(counter === 0){
        loadEnd();
      }
    }

    function imageLoader(url) {
      counter++;
      var imgElement = document.createElement("img");
      imgElement.src = url;
      $(imgElement).load(function() {
        $(this).off('load');
        resourceLoaded();
      })
    }

    function fontLoader(fontName,element,style) {
      counter++;
      var fontElement = document.createElement("span");

      fontElement.innerHTML = "\\f054gW@i#Q!T\\f09b";
      fontElement.style.opacity = "0";
      fontElement.style.fontSize = "23px";
      fontElement.style.fontFamily = 'initial';
      fontElement.style.position = 'absolute';

      if(style == 'bold') {
        fontElement.style['font-weight'] = 'bold';
      } else if (style == 'italic') {
        fontElement.style['font-style'] = 'italic';
      }

      element.appendChild(fontElement);

      var initialWidth = fontElement.offsetWidth;
      fontElement.style.fontFamily = fontName;
      var checker = setInterval(function() {
        if(fontElement.offsetWidth != initialWidth) {
          clearInterval(checker);
          $("body").trigger('fontLoaded');
          element.removeChild(fontElement);
          fontElement = null;
        }
      }, 50);
    }
  }
});