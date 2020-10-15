var path = require('path');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var app = express();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads'});

// nicely log http requests to terminal
app.use(logger('dev'));

// serve folder with userContent statically
app.use('/api/uploads/', express.static('uploads'));

// api subrouter
var router = express.Router();
// default data
const memes  =  [{image:"http://localhost:8000/api/uploads/default.png", text: "a funny joke"}, {image:"http://localhost:8000/api/uploads/default.png", text: "the punchline"}, {image:"http://localhost:8000/api/uploads/default.png", text: "the applause"}];
// json body parser
router.use(express.json())
// allow cors so frontend dev can access api
router.use(cors())

// retrieve a list of very fine memes
router.get('/memes', function(req, res) {
    res.json(memes)
});

router.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

// logs request and returns request body
router.post('/log', function(req, res) {
    console.log((req.body))
    res.json(req.body)
});

// add the router to the api subroute
app.use('/api', router)

// serve static frontend build
app.use( express.static('build'));

// if other paths dont match serve index.html for single page app routing
app.use(function(req, res) {
    res.sendFile(path.join(__dirname,'../build/index.html'));
});


app.listen(8000)

