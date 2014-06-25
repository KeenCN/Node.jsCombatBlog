var mongodb = require(MODEL_ROOT+'/db.js');

function User(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;


//save user info
User.prototype.save = function (callback) {
    //save db for user document
    var user = {
        username: this.username,
        password: this.password,
        email: this.email
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        //reading users list
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //save user info to  users list
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }

                callback(null, user[0]);
            });
        });
    });
};

//reading user info
User.get = function(username, callback) {

    //open db
    mongodb.open(function (err, db){
        if (err) {
            mongodb.close();
            return callback(err);
        }

        //read user list
        db.collection('users', function(err, collection){
            if(err) {
                mongodb.close();
                return callback(err);
            }

            //find user name document for name key
            collection.findOne({
                username: username
            }, function (err, user){
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    });
};