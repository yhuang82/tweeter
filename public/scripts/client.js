/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //composer-char-counter
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

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets
    $(".tweets-container").empty();
    tweets.forEach((element) => {
      const $tweet = createTweetElement(element);
      $(".tweets-container").append($tweet);
    });
  };

  const createTweetElement = function (tweet) {
    const { user, content, created_at } = tweet;
    // using the timeage to Displaying the Time Passed Since a Tweet
    const whenCreated = timeago.format(created_at);
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${user.avatars}" alt="Profile Image">
            <div class="user-details">
              <h3>${user.name}</h3>
              <p>${user.handle}</p>
            </div>
          </div>
        </header>
        <div class="tweet-content">
          <p>${content.text}</p>
        </div>
        <footer>
          <p>${whenCreated}</p>
          <div class="tweet-actions">
            <i class="fas fa-reply icon-blue"></i>
            <i class="fas fa-retweet icon-blue"></i>
            <i class="fas fa-heart icon-red"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  //Form Submission using JQuery
  $("form").on("submit", function (event) {
    event.preventDefault();
    // Hide the error message
    $("#error-message").slideUp();

    // Validate tweet content length
    const tweetContent = $("#tweet-text").val();
    const alertEmoji = "\u26A0\uFE0F"; // Unicode escape sequences for alert emoji
    if (tweetContent.trim().length === 0) {
      // Display error message
      $("#error-message")
        .text(alertEmoji + "Tweet content is empty. Please enter your tweet.")
        .slideDown();
      return; // Don't proceed with submission
    }

    if (tweetContent.length > 140) {
      // Display error message
      $("#error-message")
        .text(alertEmoji +
          "Tweet content exceeds the maximum character limit (140 characters)."
        )
        .slideDown();
      return;
    }
    // Escape the tweet content to make it safe for display in alerts
    //<script>alert("XSS attack!");</script>
    const safeTweetContent = $("<div>").text(tweetContent).html();
    const serializedData = { text: safeTweetContent };

    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: serializedData,
    })
      .then(function (response) {
        console.log("Server response:", response);
        loadTweets();
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "json",
    })
      .then(function (response) {
        renderTweets(response);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };
});
