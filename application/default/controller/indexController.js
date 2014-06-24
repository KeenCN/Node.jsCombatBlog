var controller = require(CORE_ROOT+'/controller.js');
function indexController(){};
indexController.prototype.__proto__ = controller.prototype;
module.exports = indexController;


indexController.prototype.indexPostAction = function (req, res, next){
    res.render('index', {
        title: '主页',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};

indexController.prototype.indexGetAction = function (req, res, next){
    res.render('index', {
        title: '主页',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};




