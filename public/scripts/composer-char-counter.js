$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    // Update the counter based on the length of the input value
    const $textarea = $(this); // Convert plain DOM node to jQuery object
    const charCount = $textarea.val().length;
    const remainingChars = 140 - charCount;

    // Update the counter
    const $counter = $textarea.closest(".new-tweet").find(".counter");
    $counter.text(remainingChars);

    // Toggle the 'invalid' class based on counter validity
    $counter.toggleClass("invalid", remainingChars < 0);
  });
});
