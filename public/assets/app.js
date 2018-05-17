var yourTickId = "Your Ticket ID is: "


console.log("connected");


$("#addTicket").on("click", function(event){
	event.preventDefault();
	
	var title = $("#myTitle").val().trim();
	var category = $("#myCategory").val().trim();
	var priority = $("#myPriority").val().trim();
	var content = $(".md-textarea").val().trim();

	$.post("/createTicket",{content, title, category, priority}, function(ticket, err){

		console.log("data:", ticket);

		$("#ticketIdHolder").text(ticket.id).prepend(yourTickId);

	})
});
// for the file input page

$('.upload-btn').on('click', function (){
    $('#upload-input').click();
});

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
      }
    });

  }
});