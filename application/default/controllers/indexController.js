indexController = {};
module.exports = indexController;


indexController.indexAction = function (req, res){
    res.render('index', {
        title: '主页',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};