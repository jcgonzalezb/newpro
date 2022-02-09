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

$.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus)
{
	if (data.status === "OK") { 
		console.log("perfecto")
		$("#api_status").addClass("available");
	} else {
		$("#api_status").removeClass("available");
	}
});

