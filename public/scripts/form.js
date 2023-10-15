$(document).ready(function () {
  //Form Submission using JQuery
  $(".newtweet-form").on("submit", function (event) {
    event.preventDefault();
    // Hide the error message
    $("#error-message").slideUp();

    const tweetContent = $("#tweet-text").val();
    // Validate the tweet
    if (!isTweetValid(tweetContent)) {
      return; // Don't proceed with submission
    }

    // Escape the tweet content to make it safe for display in alerts
    //<script>alert("XSS attack!");</script>
    const safeTweetContent = $("<div>").text(tweetContent).html();
    const serializedData = { text: safeTweetContent };

    // POST tweets to the server
    $.post("/tweets/", serializedData)
      .then(() => {
        $("#tweet-text").val(""); // Clear the textarea
        $("#tweet-text").trigger("input"); // Reset the character counter

        // take only the last tweet submitted and add it to the tweet container.
        $.get("/tweets/")
          .then((data) => {
            $tweet = createTweetElement(data[data.length - 1]);
            const $container = $(".tweets-container");
            $container.prepend($tweet);
          })
          .catch(function (error) {
            console.log("Error:", error);
            // Display error message to the user
            $("#error-message")
              .text(
                "An error occurred while fetching tweets. Please try again later."
              )
              .slideDown();
          });
      })
      .catch(function (error) {
        console.log("Error:", error);
        // Display error message to the user
        $("#error-message")
          .text(
            "An error occurred while posting the tweet. Please try again later."
          )
          .slideDown();
      });
  });
});

// Helper function to validate tweet content
const isTweetValid = function (tweetContent) {
  const alertEmoji = "\u26A0\uFE0F";
  if (tweetContent.trim().length === 0) {
    // Display error message
    $("#error-message")
      .text(alertEmoji + "Tweet content is empty. Please enter your tweet.")
      .slideDown();
    return false;
  }

  if (tweetContent.length > 140) {
    // Display error message
    $("#error-message")
      .text(
        alertEmoji +
          "Tweet content exceeds the maximum character limit (140 characters)."
      )
      .slideDown();
    return false;
  }

  return true; // Tweet is valid
};
