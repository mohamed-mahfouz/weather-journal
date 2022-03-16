// Setup empty JS object to act as endpoint for all routes
const projectData = {

};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

//configure express to use body-parser as middle-ware.
const parser = require('body-parser');
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { status } = require('express/lib/response');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//Configure server
const port = 8000;
app.listen(port , () =>console.log("Server is running!"));

// Callback function to complete GET '/all'
app.get('/all', getData);

function getData(request , response){
    response.send(projectData);
}
// Post Route
app.post('/add', AddData);

function AddData( request , response)
{
    
    projectData.date = request.body.date;
    projectData.temp = request.body.temp;
    projectData.content = request.body.content;
    response.status(201).send('');
}