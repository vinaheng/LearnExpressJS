const Course = require("../models/Course");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
class AdminController {

  storedcourses(req, res, next) {
    let perPage = 6;
    let page = req.params.page<1?1:req.params.page;
    Promise.all([
      Course.find({})
        .skip(perPage * page - perPage)
        .limit(perPage),
      Course.countDocumentsDeleted(),
      Course.countDocuments(),
    ])
      .then(([courses, countDelete, countDocument]) => {
        const countItems = courses.length;
        var arrPage = [];
        courses.count = countItems;
        const countPages = Math.ceil(parseFloat(countDocument / perPage))
        for (var i = 1; i <= countPages; i++) {
          arrPage.push({id: i});
        }
        res.render("admin/storedCourses", {
          active:3,
          countItems,
          pageActive: Number(page),
          countPages,
          startItems:(perPage * page - perPage)!=0?(perPage * page - perPage)+1:1,
          endItems:((perPage * page - perPage) + perPage)<=countDocument?((perPage * page - perPage) + perPage):countDocument,
          pages: arrPage,
          countDelete,
          courses: mutipleMongooseToObject(courses.reverse()),
          
        });
      })
      .catch(next);
  }
  // [GET]
  create(req, res) {
    res.render("admin/create",{ active:2});
  }
  // [POST] 
  store(req, res) {
    // res.json(req.body)
    const formData = req.body;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/admin/stored/1"))
      .catch((error) => {});
  }

  // {Get}
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render("admin/edit", {active:3, course: mongooseToObject(course) });
      })
      .catch(next);
    // res.send(req.params.id)
  }
  // [PUT] admin/id:
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/stored/1"))
      .catch(next);
  }
  //   // [DELETE] admin/id:
  destroy(req, res, next) {
    var back = 'back'
    if(Number(req.query.item)<=1){
      back = `/admin/stored/${Number(req.query.page)-1}`
    }else if(Number(req.query.item)==Number(req.query.page)){
      back = 'back'
    }else{
      back = 'back'
    }
    Course.delete({ _id: req.params.id})
      .then(()=>res.redirect(back))
      .catch(next);
  }
  // [GET] admin/trash
  trash(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("admin/trashStoredCourses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  // [PATCH] admin/:id
  restor(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [Delete force Destroy]
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[Delete checked soft]
  checkedAllForDelete(req, res, next) {
   
    Course.delete({ _id: { $in: req.body.courseId} })
      .then(() => res.redirect("/admin/stored/1"))
      .catch(next);
  }

  selectRestor(req, res, next) {
    if (req.body.action == "Delete") {
      Course.deleteMany({ _id: { $in: req.body.itemids } })
        .then(() => res.redirect("back"))
        .catch(next);
    } else {
      Course.restore({ _id: { $in: req.body.itemids } })
        .then(() => res.redirect("back"))
        .catch(next);
    }
  }
  activeSwitch(req, res, next) {
    Course.findOneAndUpdate(
      { _id: req.params.id },
      { active: req.query.active }
    )
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new AdminController();
