module.exports = function(req, res, next){
    var path = req.path,
        controllerName = 'index',
        actionName = 'index',
        pathInfo = null,
        args = null;

    path = path.substr(1);
    pathInfo = path.split('/');
    controllerName = pathInfo[0] || controllerName;
    actionName = pathInfo[1] || actionName;
    args = pathInfo.slice(2);

    console.log(CONTROLLER_ROOT+'/'+controllerName+'Controller.js');

    try {
        var controller = require(CONTROLLER_ROOT+'/'+controllerName+'Controller.js');
        if (controller[actionName+'Action']) {
            controller[actionName+'Action'].apply(null, [req, res].concat(args));
        } else {
            next();
        }
    } catch (ex) {
        next();
    }
}