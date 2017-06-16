$(function(){

  var mobileNav = function() {
    var body = $('body');
    var mobileNavTrigger = $('.nav-toggle');
    var mobileNavContainer = $('.main-nav .menu');

    mobileNavTrigger.bind('click', function(e){
      e.preventDefault();
      $(this).toggleClass('js-is-active');
      mobileNavContainer.toggleClass('js-is-active');
      body.toggleClass('js-no-scroll');
    });
  }

  var productFilterToggle = function() {
    var productFilterTrigger = $('.product-filter-toggle');
    var productFilterCategories = $('.product-filter-categories');

    productFilterTrigger.bind('click', function(e){
      e.preventDefault();
      $(this).parent().find(productFilterCategories).slideToggle();
    });
  }

  mobileNav();
  productFilterToggle();

});
