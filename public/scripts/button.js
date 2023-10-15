// Make the form slide up or down when the (new) "Compose" button, STRETCH
$(document).ready(function () {
  $("#iconAngle").on("click", function () {
    $(".new-tweet form").slideToggle("fast", function () {
      // If the Compose Tweet box is visible, auto-focus the textarea
      if ($(".new-tweet").is(":visible")) {
        $("#tweet-text").focus();
      }
    });
  });
});
