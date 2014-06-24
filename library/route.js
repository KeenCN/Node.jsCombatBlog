module.exports = function(app){
    app.all('*', function(req, res){
        setRoute(req, res);
    });
}

function setRoute (req, res){
    var path = req.path,
        controllerName = 'index',
        actionName = 'index',
        pathInfo = null;

    path = path.substr(1);
    pathInfo = path.split('/');
    controllerName = pathInfo[0] || controllerName;
    actionName = pathInfo[1] || actionName;

    console.log(CONTROLLER_ROOT+'/'+controllerName+'Controller.js', actionName);

    var controller = require(CONTROLLER_ROOT+'/'+controllerName+'Controller.js');
    var controllerObj = new controller();
    controllerObj[actionName+'Action'](req, res);
}