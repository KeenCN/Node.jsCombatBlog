var crypto = require('crypto'),
    User = require('../models/user.js');



module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: '主页'});
    }).get('/reg', function (req, res) {
        res.render('reg', {title: '注册'});
    }).post('/reg', function (req, res) {
        var name = req.body.name,
            password = req.body.password,
            password_re = req.body['password-repeat'];

        //confirm password
        if (password_re != password) {
            req.flash('error', '两次输入的密码不一致！');
            return res.redirect('/reg');
        }

        //create md5
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            name: req.body.name,
            password: password,
            email: req.body.email
        });

        //check user exist
        User.get(newUser.name, function(err, user){

            if (user) {
                req.flash('error', '用户已经存');
                return res.redirect('/reg');
            }

            //if isn't exist, then add the new user
            newUser.save(function(err, user){
                if(err) {
                    req.flash('error', err);
                    return res.redirect('/reg');//if regier error, then return to register page
                }
                req.session.user = user;
                req.flash('success', '注册');
                res.redirect('/');
            });
        });
    }).get('/login', function (req, res) {
        res.render('login', {title: '登录'});
    }).post('/login', function (req, res) {

    }).get('/post', function (req, res) {
        res.render('post', {title: '发表'});
    }).post('/post', function (req, res){

    }).get('/logout', function(req, res) {

    });
};
