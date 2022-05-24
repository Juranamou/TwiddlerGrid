$(document).ready(function(){

  // Runs timeago plugin
  jQuery("time.timeago").timeago();

  // gets rid of all hard coded html
  var $app = $('#app');
  $app.html('');

  // Title
  var $title = $('<h1>Middle Earthers</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Refresh feed button
  var $buttonFeed = $('<div id="update-feed">update news</div>');
  $buttonFeed.appendTo($app);

  // create div feed
  var $feed = $('<div id=feed></div>');
  $feed.appendTo($app);

  // generates tweets with all components
  var index = 0;
  var generateTweet = function(usernameSelected) {
    // initalize streamlength and streamIndex;
    index = 0;
    if (arguments.length === 0) {
      var streamLength = streams.home.length - 1;
      var streamIndex = streams.home[index];
    } else {
      var streamLength = streams.users[usernameSelected].length - 1;
      var streamIndex = streams.users[usernameSelected][index];
    }

    while(index <= streamLength){
      // recalculate streamLength and streamIndex
      if (arguments.length === 0) {
        streamLength = streams.home.length - 1;
        streamIndex = streams.home[index];
      } else {
        streamLength = streams.users[usernameSelected].length - 1;
        streamIndex = streams.users[usernameSelected][index];
      }
      var tweet = streamIndex;
      var $tweet = $('<div class="tweet"></div>');

      // Create a child with a class of message
      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      // Create a child with a class of username
      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      // Create a child with a class of timestamp
      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      // Create img tag
      var $profilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '">');
      $profilePhoto.appendTo($tweet);

      // Comment icon
      var $commentIcon = $('<i class="fa-solid fa-comment comment"></i>');
      $commentIcon.appendTo($tweet);

      // Retweet icon
      var $retweetIcon = $('<i class="fa-solid fa-retweet retweet"></i>')
      $retweetIcon.appendTo($tweet);

      // Like icon
      var $likeIcon = $('<i class="fa-solid fa-thumbs-up like"></i>')
      $likeIcon.appendTo($tweet);

      // Share icon
      var $shareIcon = $('<i class="fa-solid fa-share-from-square share"></i>')
      $shareIcon.appendTo($tweet);

      // append tweet to the feed
      $tweet.prependTo($feed);
      index += 1;
    }
  };

  // Generate homepage tweets
  generateTweet();

  //User Feed button
  $feed.on("click", function(event) {
    if (event) {
      var nameOfClass = event.target.className;
      if (nameOfClass === 'username'){
        $feed.html('');
        $buttonFeed.html("back");
        var selectionOfName = event.target.innerText.slice(1);
        generateTweet(selectionOfName);
      }
    }
  });

  //Generates more tweets on botton click
  $buttonFeed.on("click", function() {
    $feed.html('');
    $buttonFeed.html("update news");
    generateTweet();
  });

  window.isItBeautifulYet = true;
});


