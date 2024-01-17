document.addEventListener("DOMContentLoaded", function(){
    
    var dateTaskElement = document.querySelectorAll("#data-table-view tbody td:nth-child(4)");


    dateTaskElement.forEach(function(element){
        var dateTaskRaw = element.textContent;
        var dateTaskConvert = new Date(dateTaskRaw);

        var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Jakarta" // Sesuaikan dengan zona waktu yang sesuai
        };

        var formattedDate = dateTaskConvert.toLocaleDateString("id-ID", options);
        element.textContent = formattedDate;

    })
});