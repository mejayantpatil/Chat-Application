/**
 * Created by Jayant on 09-04-2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var rooms = new mongoose.Schema({
    roomName: String,
    active: {type: Boolean, default: true}
});

// Inittialize model
mongoose.model('rooms', rooms);

/* GET rooms listing. */
router.get('/', function (req, res, next) {
    getRooms(req, res, next);
});

// save room
router.post('/save', function (req, res) {
    mongoose.model('rooms').create(req.body, function (err, blob) {
        if (err) {
            res.send("There is a problem. Please try again");
        } else {
            res.json(blob);
        }
    });
});
// Delete room here
router.delete('/delete/:roomId', function (req, res, next) {
    mongoose.model('rooms').remove({_id: req.params.roomId}, function (err, result) {
        if (result) {
            getRooms(req, res, next);
        }
    });
});

function getRooms(req, res, next){
    // get room here
    mongoose.model('rooms').find(function (err, blob) {
        if (err) {
            res.send("There is a problem. Please try again");
        } else {
            res.json(blob);
        }
    });
}

module.exports = router;