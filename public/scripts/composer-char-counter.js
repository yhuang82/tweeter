$(document).ready(function () {
  $(".new-tweet textarea").on("input", onInput);
});

const onInput = function () {
  // Update the counter based on the length of the input value
  const $textarea = $(this); // Convert plain DOM node to jQuery object
  const charCount = $textarea.val().length;
  const remainingChars = 140 - charCount;

  // Update the counter
  const $counter = $textarea.closest(".new-tweet").find(".counter");
  $counter.text(remainingChars);

  // Toggle the 'form--red' class based on counter validity
  if (remainingChars < 0) {
    $counter.addClass("form--red");
    return;
  }

  $counter.removeClass("form--red");
};
