const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
var mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String },
    description: { type: String },
    videoId: { type: String },
    level: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

// Add plugin
// Plugin thường mang trong mình một hoặc nhiều tính năng nổi bật nào đó giúp website có thể hiển thị và vận hành tốt hơn
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: true,
 });

module.exports = mongoose.model("Course", Course);
