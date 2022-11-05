const Course = require("../models/Course");
const {multipleMongooseToObject} = require('../../util/mongoose')
// Home, search, contact
class SiteController {
  // [GET] /
  index(req, res) {
    Course.find({})
      .then((courses) =>{
        res.render("home", {
          courses : multipleMongooseToObject(courses)
        })
      })
      .catch((err) => next(err)); // phương thức next() sẽ return về phần tử kế tiếp, đồng thời ghi nhận luôn phần tử đã lặp là phần tử next()
    // res.render('home');
  }
  // [GET] / search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
