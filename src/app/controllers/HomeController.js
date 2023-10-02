const Course = require("../models/Course");
const {mutipleMongooseToObject} = require('../../util/mongoose')
class HomeController {
  index(req, res,next) {
    Course.find({active:true})
      .then(courses => {
        res.render('home',{
          courses : mutipleMongooseToObject(courses)
        })
      })
      .catch(next);
  }
 
}
module.exports = new HomeController();
