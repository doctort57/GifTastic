$(document).ready(function() {
  // Initial array of players
      var players = ["Bryce Harper", "Daniel Murphy", "Jayson Werth", "Max Scherzer","Gio Gonzalez","Anthony Rendon"];
      // displayPlayerInfo function re-renders the HTML to display the appropriate content

      function displayPlayerInfo() {
        var player = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&apikey=dc6zaTOxFJmzC&limit=10";
        // Creating an AJAX call for the specific player button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // get response data into var
          var results = response.data;
          // empty previous player images
          $("#player-view").empty();
          // Creating a div to hold the player image
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
              var naTsDiv = $("<div class='playerImg flex-item'>");
          // Creating an element to have the rating displayed
              var pOne = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
              $(pOne).addClass("p");
              naTsDiv.append(pOne);
          // Retrieving the URL for the fixed image and the animatied image
              var imgURL = results[i].images.fixed_height_still.url;
              var animateURL = results[i].images.fixed_height_downsampled.url;
          // Creating an element to hold the fixed image
              var image = $("<img>").attr("src", imgURL) ;
          // adding attr for the fixed image
              $(image).attr("data-still",imgURL);
          // adding attr for the animated image
              $(image).attr("data-animate",animateURL);
          // add attribute for data state to flip images on click
              $(image).attr("data-state","still");
          // add class for clicked event
              $(image).addClass("playerImg");
          // append image to div for each player
              $(naTsDiv).append(image);   
          // Putting the player img  above the previous player
              $("#player-view").prepend(naTsDiv);
             }
             setFocus();
          });
      }


      function animateGIF() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
              setFocus();
      };

      function setFocus() {
               $("#player-input").val("").focus();
      }

      // Function for displaying player data
      function renderButtons() {
        // Deleting the players prior to adding new players
        // (this is necessary otherwise you will have repeat buttons)
              $("#buttons-view").empty();
              // Looping through the array of players
              for (var i = 0; i < players.length; i++) {
        // Then dynamicaly generating buttons for each player in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
        // Adding a class of player to our button
                $(a).addClass("player");
                $(a).addClass("button");
                $(a).addClass("btn-lg");
        // Adding a data-attribute
                $(a).attr("data-name", players[i]);
        // Providing the initial button text
                $(a).text(players[i]);
        // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
              }
              setFocus();
      }

      // This function handles events where a player button is clicked
      $("#add-player").on("click", function(event) {
              event.preventDefault();
      // This line grabs the input from the textbox
              var player = $("#player-input").val().trim();
       // Adding player from the textbox to our array
              players.push(player);
       // Calling renderButtons which handles the processing of our player array
              renderButtons();
       });

     $(document).on("click", '.button', function(event){
        displayPlayerInfo(event)
      })

      // Adding a click event listener to all elements for adding buttons and clicking on player images
      $(document).on("click", ".playerImg", animateGIF);
      $(document).on("click", ".player", displayPlayerInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();  
});