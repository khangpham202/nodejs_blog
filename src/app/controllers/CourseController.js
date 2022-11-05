const Course = require("../models/Course");
const { mongoosesArrayToObject } = require("../../util/mongoose");

// Course detail page
class CourseController {
  // [GET] / courses /:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((courses) => {
        res.render("courses/show", {
          courses: mongoosesArrayToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] / courses /create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] / courses /store
  store(req, res, next) {
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  // [GET] / courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongoosesArrayToObject(course),
        })
      )
      .catch(next);
  }
  // [PUT] / courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  // [DELETE] / courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] / courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [PATCH] / courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [POST] / courses/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Invalid action", error: req.body.error });
    }
  }
  // [POST] / courses/handle-trash-form-action
  handletrashFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.deleteOne({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Invalid action", error: req.body.error });
    }
  }
}
// GET : gửi y/c lên server, trả lại dữ liệu cho client
// POST: gửi y/c lên server, y/c server lưu hay tạo mới dữ liệu
// PUT - Replace all, PATCH - Replace by feature, DELETE OPTIONS HEAD
module.exports = new CourseController();
