/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets();
});

// GET tweets from the server
const loadTweets = function () {
  $.get("/tweets/")
    .then(renderTweets)
    .catch((error) => {
      console.log("Error:", error);
    });
};

// Good work on problem decomposition! With your current implementation, you are emptying the tweet container and re-rendering all tweets when a new one is submitted. A more efficient way would be to take only the last tweet submitted and add it to the tweet container.

//loop through the tweets and dynamiclly render each
const renderTweets = function (tweets) {
  const $container = $(".tweets-container");
  $container.html(" ");

  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $container.prepend($tweet);
  }
};

//render each tweet to index
const createTweetElement = function (tweet) {
  const { user, content, created_at } = tweet;
  // using the timeage to Displaying the Time Passed Since a Tweet
  const whenCreated = timeago.format(created_at);
  const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
          <div class="user-details">
            <img src="${user.avatars}" alt="Profile Image">
            <h3>${user.name}</h3>
          </div>
              <p>${user.handle}</p>
          </div>
        </header>
        <div class="tweet-content">
          <p>${content.text}</p>
        </div>
        <footer>
          <p>${whenCreated}</p>
          <div class="tweet-actions">
            <i class="fas fa-flag icon-red"></i>
            <i class="fas fa-retweet icon-blue"></i>
            <i class="fas fa-heart icon-red"></i>
          </div>
        </footer>
      </article>
    `);

  return $tweet;
};
