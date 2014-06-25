var postController = {};
module.exports = postController;

postController.indexAction = function (req, res){
    if (req.method=='POST') {

    }
    res.render('post', {title: '发表'});
}