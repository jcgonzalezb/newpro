const amenities = new Array();
$(document).ready(function () {
    $("input").click(function () {
        alert(amenities.includes($(this).attr('data-name')))
        if ($(this).is(":checked")) {
            if (amenities.includes($(this).attr('data-name')) == false) {
                amenities.push($(this).attr('data-name'))
            }
        } else {
            for (let i = 0; i < amenities.length; i++) {
                console.log(amenities.length)
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
        console.log(amenities)
        // var idd = $(this).attr('data-id');
        // alert(idd);
    });
});
