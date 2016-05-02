/**
 * Created by Jayant on 10-04-2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var teams = new mongoose.Schema({
    teamName: String,
    topic:String,
    users:Array,
    active: {type: Boolean, default: true}
});

// Inittialize model
mongoose.model('teams', teams);

/* GET teams listing. */
router.get('/', function (req, res, next) {
    getTeams(req, res, next);
});

// save team
router.post('/save', function (req, res) {
    mongoose.model('teams').create(req.body, function (err, blob) {
        if (err) {
            res.send("There is a problem. Please try again");
        } else {
            res.json(blob);
        }
    });
});
// Delete team here
router.delete('/delete/:teamId', function (req, res, next) {
    mongoose.model('teams').remove({_id: req.params.teamId}, function (err, result) {
        if (result) {
            getTeams(req, res, next);
        }
    });
});

function getTeams(req, res, next){
    // get room here
    mongoose.model('teams').find(function (err, blob) {
        if (err) {
            res.send("There is a problem. Please try again");
        } else {
            res.json(blob);
        }
    });
}

module.exports = router;