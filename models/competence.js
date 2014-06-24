//This is competence controller
var Competence = function (req, res, next){

    var config = require(APP_CONFIG_DIR + '/competence.json');
    //var pathname = req._parsedUrl.pathname.toString();
    var pathname = req.path.toString();

    if (CompetenceEach(pathname, config.loginPage)) {
        if(!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect(config.loginPageURL);
        }
        return next();
    }

    if (CompetenceEach(pathname, config.notLoginPage)) {
        if(req.session.user) {
            req.flash('error', '已登录');
            return res.redirect('back');
        }
        return next();
    }



    if (CompetenceEach(pathname, config.adminLoginPage) && pathname!= config.adminLoginPageURL) {
        if(!req.session.adminUser) {
            req.flash('error', '未登录');
            return res.redirect(config.adminLoginPageURL);
        }
        return next();
    }
    return next();
};

function CompetenceEach(pathname, URLArray) {
    for(i in URLArray){
        var pathnameSub = pathname.substr(0,URLArray[i].length);
        if (pathnameSub==URLArray[i]) return true;
    }
    return false;
}

module.exports = Competence;

