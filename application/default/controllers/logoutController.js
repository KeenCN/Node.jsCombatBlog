var logoutController = {};
module.exports = logoutController;

logoutController.indexAction = function(req, res){
    req.session.user = null;
    req.flash('success', '登出成功');
    return res.redirect('/');
}