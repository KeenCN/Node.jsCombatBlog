module.exports = function(req, res, next){
    var path = req.path,
        controllerName = 'index',
        actionName = 'index',
        pathInfo = null;

    path = path.substr(1);
    pathInfo = path.split('/');
    controllerName = pathInfo[0] || controllerName;
    actionName = pathInfo[1] || actionName;

    var controller = require(CONTROLLER_ROOT+'/'+controllerName+'Controller.js');
    var controllerObj = new controller();
    req.method=='GET' ? controllerObj[actionName+'GetAction'](req, res) : controllerObj[actionName+'PostAction'](req, res);
}