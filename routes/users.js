var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var users = new mongoose.Schema({
    account:Object,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    active: {type: Boolean, default: true}
});

// Connect to DB
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Inittialize model
mongoose.model('users', users);


/* GET users listing. */
router.get('/', function (req, res, next) {
    getUsers(req, res, next);
});

router.get('/:id', function (req, res, next) {
    getUser(req, res, next);
});

router.post('/validate', function (req, res, next) {
    // validate user here
    mongoose.model('users').find({email:{$eq:req.body.username},password:{$eq:req.body.password}},function (err, blob) {
        if (err) {
            res.send("Invalid user");
        } else {
            res.json(blob);
        }
    });
});

router.post('/save', function (req, res) {
    // check for user limit
    mongoose.model('accounts').find({_id:req.body.account._id}).find(function(err, accounts){
        console.log('accounts='+parseInt(accounts[0].numberOfUsers));
        // get user count here
        mongoose.model('users').find(function(err, users){
            //ToDo need to work on this for loop
            var counter =0;
            for(var i=0; i<users.length;i++){
                if(users[i].account._id == accounts[0]._id){
                    counter++;
                }
            }
            // check limit
            if(counter < parseInt(accounts[0].numberOfUsers)){
                // save user here
                mongoose.model('users').create(req.body, function (err, blob) {
                    if (err) {
                        res.send("There was a problem user. Please try again");
                    } else {
                        res.json(blob);
                    }
                });
            }else{
                res.status(404).send('Limit Exceeds!');
            }
        });
    });
});

router.put('/update/:userId', function (req, res, next) {
    // update user here
    mongoose.model('users').update({_id: req.params.userId}, {
        $set: {
            account:req.body.account,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
    }, function (err, result) {
        if (result) {
            getUsers(req, res, next);
        }
    });
});

router.delete('/delete/:userId', function (req, res, next) {
    // delete user here
    mongoose.model('users').remove({_id: req.params.userId}, function (err, result) {
        if (result) {
            getUsers(req, res, next);
        }
    });
});

router.put('/activate/:userId', function (req, res, next) {
    // delete user here
    mongoose.model('users').update({_id: req.params.userId}, {
        $set: {
            active: true
        }
    }, function (err, result) {
        if (result) {
            getUsers(req, res, next);
        }
    });
});

router.put('/deActivate/:userId', function (req, res, next) {
    // delete user here
    mongoose.model('users').update({_id: req.params.userId}, {
        $set: {
            active: false
        }
    }, function (err, result) {
        if (result) {
            getUsers(req, res, next);
        }
    });
});


function getUsers(req, res, next) {
    // get user here
    mongoose.model('users').find(function (err, blob) {
        if (err) {
            res.send("There was a problem user. Please try again");
        } else {
            res.json(blob);
        }
    });
}

function getUser(req, res, next) {
    // get user here
    mongoose.model('users').find({_id: req.params.id}, function (err, blob) {
        if (err) {
            res.send("There was a problem user. Please try again");
        } else {
            res.json(blob);
        }
    });
}
module.exports = router;
