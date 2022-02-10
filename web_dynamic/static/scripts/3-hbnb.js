const amenities = new Array();
$(document).ready(function () {
    $("input").click(function () {
        if ($(this).is(":checked")) {
            if (amenities.includes($(this).attr('data-name')) == false) {
                amenities.push($(this).attr('data-name'))
            }
        } else {
            for (let i = 0; i < amenities.length; i++) {
                if (amenities[i] == $(this).attr('data-name')) {
                    amenities.splice(i, 1);
                    break;
                }
            }
        }
        $('#amenities_filter').text('')
        for (let i = 0; i < amenities.length; i++) {
            if (i == 0)
                $('#amenities_filter').append(amenities[i])
            else
                $('#amenities_filter').append(", " + amenities[i])
        }
    });
});

$.get("http://172.24.238.0:5001/api/v1/status/", function(data, textStatus)
{
	if (data.status === "OK") {
		$("#api_status").addClass("available");
	} else {
		$("#api_status").removeClass("available");
	}
});

$.ajax({
    type: "POST",
    url: "http://localhost:5001/api/v1/places_search",
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function(data){
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
            function(data_user)
            {
                $("section.places article#" + data[i].id + " div.user").append($("<b>Owner: </b>"))
                $("section.places article#" + data[i].id + " div.user").append((data_user.first_name + " " + data_user.last_name))
            });
            $("section.places article#" + data[i].id + "").append($("<div class='description'></div>"))
            $("section.places article#" + data[i].id + " div.description").append(data[i].description)
        }
    },
    dataType: 'json'
  });
