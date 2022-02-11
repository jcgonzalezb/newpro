const amenities = new Array();
const amenities_id = new Array();
const cities = new Array();
const cities_id = new Array();
const states = new Array();
const states_id = new Array();
const locations = new Array();

$(document).ready(function () {
  $('input.input_amenities').click(function () {
    if ($(this).is(':checked')) {
      if (amenities.includes($(this).attr('data-name')) == false) {
        amenities.push($(this).attr('data-name'));
        amenities_id.push($(this).attr('data-id'));
      }
    } else {
      for (let i = 0; i < amenities.length; i++) {
        if (amenities[i] == $(this).attr('data-name')) {
          amenities.splice(i, 1);
          amenities_id.splice(i, 1);
          break;
        }
      }
    }
    $('#amenities_filter').text('');
    for (let i = 0; i < amenities.length; i++) {
      if ($('#amenities_filter')[0].textContent.length < 40) {
        if (i == 0) { $('#amenities_filter').append(amenities[i]); } else { $('#amenities_filter').append(', ' + amenities[i]); }
      } else {
        $('#amenities_filter').append('...');
        break;
      }
    }
  });

  $('input.input_states').click(function () {
    if ($(this).is(':checked')) {
      if (states.includes($(this).attr('data-name')) == false) {
        states.push($(this).attr('data-name'));
        console.log(states);
        states_id.push($(this).attr('data-id'));
        console.log(states_id);
      }
    } else {
      for (let i = 0; i < states.length; i++) {
        if (states[i] == $(this).attr('data-name')) {
          states.splice(i, 1);
          states_id.splice(i, 1);
          break;
        }
      }
    }
    $('#states_filter').text('');
    for (let i = 0; i < states.length; i++) {
      if ($('#states_filter')[0].textContent.length < 30) {
        if (i == 0) { $('#states_filter').append(states[i]); } else { $('#states_filter').append(', ' + states[i]); }
      } else {
        $('#states_filter').append('...');
        break;
      }
    }
  });

  $('input.input_cities').click(function () {
    if ($(this).is(':checked')) {
      if (cities.includes($(this).attr('data-name')) == false) {
        cities.push($(this).attr('data-name'));
        cities_id.push($(this).attr('data-id'));
      }
    } else {
      for (let i = 0; i < cities.length; i++) {
        if (cities[i] == $(this).attr('data-name')) {
          cities.splice(i, 1);
          cities_id.splice(i, 1);
          break;
        }
      }
    }
    $('#states_filter').text('');
    for (let i = 0; i < cities.length; i++) {
      if ($('#states_filter')[0].textContent.length < 40) {
        if (i == 0) { $('#states_filter').append(cities[i]); } else { $('#states_filter').append(', ' + cities[i]); }
      } else {
        $('#states_filter').append('...');
        break;
      }
    }
  });

  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').css('background-color', '#ff545f');
      $('#api_status').addClass('available');
    } else {
      $('#api_status').css('background-color', '#cccccc');
      $('#api_status').removeClass('available');
    }
  });
});

$.ajax({
    type: "POST",
    url: "http://localhost:5001/api/v1/places_search",
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            $("section.places").append($("<article id=" + data[i].id + "></article>"))
            $("section.places article#" + data[i].id).append($("<div class='title_box'></div>"))
            $("section.places article#" + data[i].id + " div.title_box").append($("<h2>" + data[i].name + "</h2>"))
            $("section.places article#" + data[i].id + " div.title_box").append($("<div class='price_by_night'>$" + data[i].price_by_night + "</div>"))
            $("section.places article#" + data[i].id + "").append($("<div class='information'></div>"))
            $("section.places article#" + data[i].id + " div.information").append($("<div class='max_guest'> Guest " + data[i].max_guest + (data[i].max_guest != 1 ? 's' : '') + "</div>"))
            $("section.places article#" + data[i].id + " div.information").append($("<div class='number_rooms'> " + data[i].number_rooms + " Bedroom" + (data[i].max_guest != 1 ? 's' : '') + "</div>"))
            $("section.places article#" + data[i].id + " div.information").append($("<div class='number_bathrooms'>" + data[i].number_bathrooms + " Bathroom" + (data[i].number_bathrooms != 1 ? 's' : '') + "</div>"))
            $("section.places article#" + data[i].id + "").append($("<div class='user'></div>"))
            $.get("http://localhost:5001/api/v1/users/" + data[i].user_id,
            function (data_user) {
                $("section.places article#" + data[i].id + " div.user").append($("<b>Owner: </b>"))
                $("section.places article#" + data[i].id + " div.user").append((data_user.first_name + " " + data_user.last_name))
            });
            $("section.places article#" + data[i].id + "").append($("<div class='description'></div>"))
            $("section.places article#" + data[i].id + " div.description").append(data[i].description)
            // REVIEWS
            $.get("http://localhost:5001/api/v1/places/" + data[i].id + "/reviews" ,
            function (data_reviews) {
                console.log(data_reviews)
                $("section.places article#" + data[i].id).append($("<div class='reviews'></div>"))
                $("section.places article#" + data[i].id + " div.reviews").append($("<h2>" + data_reviews.length + " Reviews</h2><span>Show</span>"))
                $("section.places article#" + data[i].id + " div.reviews").append($("<ul id=" + data_reviews[0].place_id +"></ul>"))
                for (let i = 0; i < data_reviews.length; i++) {
                    $("section.places article#" + data[i].id + " div.reviews ul#" + data_reviews[0].place_id).append($("<li></li>"))
                    // $("section.places article#" + data[i].id + " div.reviews ul#" + data_reviews[0].place_id + " li").append($("<h3>From Bob Dylan the 27th January 2017</h3>"))
                    // $("section.places article#" + data[i].id + " div.reviews ul#" + data_reviews[0].place_id + " li").append($("<p>Runshi is an epic host. Nothing more I can say. 5 stars!</p>"))
                }
            });

        }
    },
    dataType: 'json'
});

function search_places() {
    console.log("busqueda exitosa")
    const dict = {
        "states": states_id,
        "cities": cities_id,
        "amenities": amenities_id
    };
    $("article").remove();
    $.ajax({
        type: "POST",
        url: "http://localhost:5001/api/v1/places_search",
        data: JSON.stringify(dict),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                $("section.places").append($("<article id=" + data[i].id + "></article>"))
                $("section.places article#" + data[i].id).append($("<div class='title_box'></div>"))
                $("section.places article#" + data[i].id + " div.title_box").append($("<h2>" + data[i].name + "</h2>"))
                $("section.places article#" + data[i].id + " div.title_box").append($("<div class='price_by_night'>$" + data[i].price_by_night + "</div>"))
                $("section.places article#" + data[i].id + "").append($("<div class='information'></div>"))
                $("section.places article#" + data[i].id + " div.information").append($("<div class='max_guest'> Guest " + data[i].max_guest + (data[i].max_guest != 1 ? 's' : '') + "</div>"))
                $("section.places article#" + data[i].id + " div.information").append($("<div class='number_rooms'> " + data[i].number_rooms + " Bedroom" + (data[i].max_guest != 1 ? 's' : '') + "</div>"))
                $("section.places article#" + data[i].id + " div.information").append($("<div class='number_bathrooms'>" + data[i].number_bathrooms + " Bathroom" + (data[i].number_bathrooms != 1 ? 's' : '') + "</div>"))
                $("section.places article#" + data[i].id + "").append($("<div class='user'></div>"))
                $.get("http://localhost:5001/api/v1/users/" + data[i].user_id,
                    function (data_user) {
                        $("section.places article#" + data[i].id + " div.user").append($("<b>Owner: </b>"))
                        $("section.places article#" + data[i].id + " div.user").append((data_user.first_name + " " + data_user.last_name))
                    });
                $("section.places article#" + data[i].id + "").append($("<div class='description'></div>"))
                $("section.places article#" + data[i].id + " div.description").append(data[i].description)
            }
        },
        dataType: 'json'
    });
}
