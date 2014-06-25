var loginController = {};
module.exports = loginController;

loginController.indexAction = function(req, res){
    if (req.method=='POST') {
        var crypto = require('crypto'),
            User = require(MODEL_ROOT+'/user.js'),
            md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');

        User.get(req.body.username, function(err, user){
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('/login');
            }

            if (user.password !=password) {
                req.flash('error', '密码错误');
                return res.redirect('/login');
            }

            req.session.user = user;
            req.flash('success', '登陆成功');
            res.redirect('/');
        });
        return ;
    }
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}
