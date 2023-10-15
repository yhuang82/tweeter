$(document).ready(function () {
  // Show/hide scroll-to-top button based on scroll position
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#scrollToTop").fadeIn();
      $(".containerNav").fadeOut();
    } else {
      $("#scrollToTop").fadeOut();
      $(".containerNav").fadeIn();
    }
  });

  // Scroll to top when button is clicked
  $("#scrollToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".new-tweet form").slideDown("fast");
  });
});
