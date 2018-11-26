$(function() {

  $(".menu ul li.first").click(function () {
    $(this).parent().toggleClass('open');
  });


  $(".menu ul li").click(function () {
    var section = $(this).data('section');
    $('html,body').animate({
      scrollTop: $("section." + section).offset().top - 64
    }, 'fast');
  });

});
