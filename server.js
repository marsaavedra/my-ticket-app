var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var path 		= require("path");
const nodemailer = require('nodemailer');
const formidable = require('formidable');
const fs = require('fs');


var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//make static folder
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

//
app.get("/",function(req,res){
	res.sendFile((path.join(__dirname,"./public/index.html")));
});

//grab TicketManager constructor
var TicketManager = require("ticketman").TicketManager;



app.post("/createTicket",function(req,res){
	var ticketManager = new TicketManager("mars", "http://localhost:3456",{username: "dev",password:"123"});
	console.log(ticketManager);
	var title = req.body.title;
	var category = req.body.category;
	// var priority = req.body.priority;
	var content = req.body.content;

	ticketManager.issue(title,category,content,function(err,ticket){
		console.log("error: ", err);
		console.log("ticket: ", ticket);
		console.log("finished");
		// res.send(ticket);
	

	//send email upon pressing the 'Add Ticket' button
	let transporter = nodemailer.createTransport({
	          service: 'gmail',
	          secure: false,
	          port: 25,
	          auth: {
	            user: 'mytesting1991@gmail.com',
	            pass: 'La$sers34!'
	          },
	          tls: {
	            rejectUnauthorized: false
	          }
	        });
	      //Body of email message
	      let HelperOptions = {
	          from: req.body.Name + ' &lt;' + req.body.Email + '&gt;', //grab form data from the request body object
	          to: 'mytesting1991@gmail.com',
	          subject:'Ticket Submission',
	          text:"From:" +ticket.owner_id +"\n"+ "\n"+ "Email: " +" email would go here "+"\n" + "\n"+ "Priority: " +req.body.priority +"\n"+ "\n"+ "TicketID: " + ticket.id +"\n" +"\n" +ticket.content 
	      };

	      //sends mail

	      transporter.sendMail(HelperOptions, (error, info) => {
	        if (error) {
	          return console.log(error);
	        }
	        console.log("The message was sent!");
	        console.log(info);
	      });


		res.send(ticket);
	});
});

app.listen(port, function(err){
    if(!err){
    	console.log("Site is live on " + port);
    }
     else {
 		console.log(err);
 	}
});
