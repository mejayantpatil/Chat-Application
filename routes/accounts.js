/**
 * Created by Jayant on 09-04-2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var accounts = new mongoose.Schema({
    accountName: String,
    companyName:String,
    numberOfUsers:Number,
    active: {type: Boolean, default: true}
});

// Inittialize model
mongoose.model('accounts', accounts);

/* GET accounts listing. */
router.get('/', function (req, res, next) {
    getAccounts(req, res, next);
});

// save account
router.post('/save', function (req, res) {
    mongoose.model('accounts').create(req.body, function (err, blob) {
        if (err) {
            res.send("There is a problem. Please try again");
        } else {
            res.json(blob);
        }
    });
});
// Delete account here
router.delete('/delete/:accountId', function (req, res, next) {
    mongoose.model('accounts').remove({_id: req.params.accountId}, function (err, result) {
        if (result) {
            getAccounts(req, res, next);
        }
    });
});

function getAccounts(req, res, next){
    // get room here
    mongoose.model('accounts').find(function (err, blob) {
        if (err) {
            res.send("There is a problem. Please try again");
        } else {
            res.json(blob);
        }
    });
}

module.exports = router;