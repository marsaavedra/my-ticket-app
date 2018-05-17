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

