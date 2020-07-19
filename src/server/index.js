var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const fetch = require("node-fetch");



const apiId = process.env.API_ID;
const apiKey = process.env.API_KEY;

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
    console.log(mockAPIResponse);
})

app.post('/analyze', function(req, res){
    let newData = req.body;
    let newText = newData.text;
    console.log(newText);
    getNewsData("https://api.aylien.com/news/autocompletes?type=source_names&term="+newText)
    .then(function(data){
        let newEntry = {
            autocompletes: data.autocompletes
        };
        console.log("this worked 1" + newEntry);
        console.log(newEntry);
        res.send(newEntry)
    })
})


const getNewsData = async (url = '') =>{
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-AYLIEN-NewsAPI-Application-ID': apiId,
            'X-AYLIEN-NewsAPI-Application-Key': apiKey
        }
    });
    
    try{
        const data = await res.json();
        console.log("this worked 2" + data);
        console.log(data);
        let newEntry = {
            autocompletes: data.autocompletes
        }
        console.log("this worked 3" + newEntry);
        console.log(newEntry);
        return data;
    } catch(error){
        console.log("error",error);
    }
}




  

