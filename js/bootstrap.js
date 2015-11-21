$(document).ready(function () {

  isMobile() && FastClick.attach(document.body);

  var b2top = $('.back-to-top');
  var to = 0;
  $(window).bind('scroll', displayBTTOrNot);
  function displayBTTOrNot() {
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    to && clearTimeout(to);
    to = setTimeout(function () {
      if (b2top.css('display') == 'block' && st == 0) {
        if(isMobile()){
          b2top.css({transition: 'opacity .2s', opacity: '0'});
          setTimeout("$('.back-to-top').css({display: 'none'})",200);
        } else {
          b2top.velocity("slideUp", { duration: 200 });
        }
      } else if(st > 0 && b2top.css('display') == 'none'){
        if(isMobile()){
          b2top.css({display: 'block', opacity: '0'});
          setTimeout("$('.back-to-top').css({transition: 'opacity .2s', opacity: '0.3'})",50);
        } else{
          b2top.velocity("slideDown", { duration: 200 });
        }
      }
    }, 200);
  }
  b2top.on('click', function (e) {
    e.preventDefault();
    b2top.css('display','none');
    if(isMobile()){
      if($('body').scrollTop() > 1000){
        $('body').css({transition: 'opacity 0.2s'});
        $('body').css({opacity: '0'});
      }
      $('body').animate({scrollTop: 0}, {duration:600, complete: function() {
        $('body').css({opacity: '1'});
        setTimeout("$('body').removeAttr('style')", 200);
      }});
    }
    else{ $('body').velocity('scroll');}
  });

  // $('.back-to-top').on('click', function () {
  //   $('body').velocity('scroll');
  // });

  $('.site-nav-toggle button').on('click', function () {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function () {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

  // Define Motion Sequence.
  motionIntegrator
    .add(motionMiddleWares.logo)
    .add(motionMiddleWares.menu)
    .add(motionMiddleWares.postList)
    .add(motionMiddleWares.sidebar);

  !hasLoader() && $('.container').css('display','block');

  // Bootstrap Motion.
  CONFIG.motion && !hasLoader() && motionIntegrator.bootstrap();
});
