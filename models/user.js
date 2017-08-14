var userSchema = mongnose.Schema({
    name: {
        type: String,
        index: true
    },
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    created: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": Date.now
    }
})
var user = module.exports = mongnose.model('User', userSchema)

model.exports = {
    addUser: function(req, res) {
        var response = {};
        var userData = new user();
        userData.name = req.body.name;
        userData.username = req.body.username;
        userData.password = req.body.password;
        userData.email = req.body.email;
        userData.location = req.body.location;
        userData.created = new Date();
        userData.updated = new Date();
        userData.save(function(err) {
            if (err) {
                response = { "error": true, "messsage": "Error adding data" };
            } else {
                res.redirect('/allUser');
            }
        })
    },
    getAllUser: function(req, res) {
        var response = {};
        user.find(function(err, data) {
            if (err) {
                response = { "error": true, "messsage": "Error fetching data" };
            } else {
                res.render('allUser', { user: data });
            }
        })
    },
    deleteUser: function(req, res) {
        var response = {};
        user.findById(req.params.id, function(err) {
            if (err) {
                response = { "error": true, "messsage": "Error fetching data" };
            } else {
                user.remove({ _id: req.params.id }, function(err) {
                    if (err) {
                        response = { "error": true, "messsage": "Error deleting data" };
                    } else {
                        res.redirect('/allUser')
                    }
                })
            }
        })
    },
    getUserById: function(req, res) {
        var response = {};
        user.findById({ _id: req.params.id }, function(err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                res.render('edituser', { user: data })
            }
        })
    },
    updateUser: function(req, res) {
        var response = {};
        user.findById({ _id: req.params.id }, function(err, dataUser) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                dataUser.name = req.body.name;
                dataUser.username = req.body.username;
                dataUser.password = req.body.password;
                dataUser.email = req.body.email;
                dataUser.gender = req.body.gender;
                dataUser.location = req.body.location;
                dataUser.created = new Date();
                dataUser.updated = new Date();
                dataUser.save(function(err) {
                    if (err) {
                        response = { "error": true, "message": "Error deleting data" };
                    } else {
                        res.redirect('/allUser');
                    }

                })
            }
        })
    }



}