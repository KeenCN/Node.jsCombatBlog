var regController = {};
module.exports = regController;


regController.indexAction = function (req, res){
    if (req.method=='POST') {
        var crypto = require('crypto'),
            User = require(MODEL_ROOT+'/user.js'),
            username = req.body.username,
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
            username: req.body.username,
            password: password,
            email: req.body.email
        });

        //check user exist
        User.get(newUser.username, function(err, user){

            if (user) {
                req.flash('error', '用户已经存在');
                return res.redirect('/reg');
            }

            //if isn't exist, then add the new user
            newUser.save(function(err, user){
                if(err) {
                    req.flash('error', err);
                    return res.redirect('/reg');//if regier error, then return to register page
                }
                req.session.user = user;
                req.flash('success', '注册成功');
                res.redirect('/');
            });
        });
        return ;
    }
    res.render('reg', {
        title: '注册',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};