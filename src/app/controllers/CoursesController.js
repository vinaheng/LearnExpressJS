const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
class CoursesController {
  show(req, res, next) {
    Course.findOne({ _id: req.params.slug })
      .then((courses) => {
        res.render("courses/courses", {
          courses: mongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new CoursesController();
