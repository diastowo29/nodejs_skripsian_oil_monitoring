var oil = $('#myBar').text()
$('#myBar').css('width', oil)

function toogleChange (toogle) {
    var toogleCheck = $(toogle).prop('checked')
        
    $.ajax({
        url: "/update-pump/" + toogleCheck,
        success: function(result){
            console.log(result);
        }
    })
}