;(function(){
    var antimoderate_images = document.querySelectorAll('.antimoderate');
    for(var i=0; i<antimoderate_images.length; ++i) {
        var img = antimoderate_images[i];
        AntiModerate.process(img, img.getAttribute("data-antimoderate-idata"), img.getAttribute("data-antimoderate-scale"));
    }
})();