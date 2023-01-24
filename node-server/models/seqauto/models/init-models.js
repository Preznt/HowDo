var DataTypes = require("sequelize").DataTypes;
var _attach = require("./attach");
var _board_content = require("./board_content");
var _i_authority = require("./i_authority");
var _image = require("./image");
var _purchase = require("./purchase");
var _reply = require("./reply");
var _shorts = require("./shorts");
var _subscribe = require("./subscribe");
var _upvote = require("./upvote");
var _user = require("./user");
var _v_authority = require("./v_authority");
var _video = require("./video");
var _view_history = require("../../view_history");

function initModels(sequelize) {
  var attach = _attach(sequelize, DataTypes);
  var board_content = _board_content(sequelize, DataTypes);
  var i_authority = _i_authority(sequelize, DataTypes);
  var image = _image(sequelize, DataTypes);
  var purchase = _purchase(sequelize, DataTypes);
  var reply = _reply(sequelize, DataTypes);
  var shorts = _shorts(sequelize, DataTypes);
  var subscribe = _subscribe(sequelize, DataTypes);
  var upvote = _upvote(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var v_authority = _v_authority(sequelize, DataTypes);
  var video = _video(sequelize, DataTypes);
  var view_history = _view_history(sequelize, DataTypes);

  board_content.belongsToMany(user, {
    as: "userUsername_user_upvotes",
    through: upvote,
    foreignKey: "boardContentBCode",
    otherKey: "userUsername",
  });
  image.belongsToMany(user, {
    as: "userUsername_users",
    through: i_authority,
    foreignKey: "imageICode",
    otherKey: "userUsername",
  });
  user.belongsToMany(board_content, {
    as: "boardContentBCode_board_contents",
    through: upvote,
    foreignKey: "userUsername",
    otherKey: "boardContentBCode",
  });
  user.belongsToMany(image, {
    as: "imageICode_images",
    through: i_authority,
    foreignKey: "userUsername",
    otherKey: "imageICode",
  });
  user.belongsToMany(user, {
    as: "ChildUsername_users",
    through: subscribe,
    foreignKey: "userUsername",
    otherKey: "ChildUsername",
  });
  user.belongsToMany(user, {
    as: "userUsername_user_subscribes",
    through: subscribe,
    foreignKey: "ChildUsername",
    otherKey: "userUsername",
  });
  user.belongsToMany(video, {
    as: "videoVCode_videos",
    through: v_authority,
    foreignKey: "userUsername",
    otherKey: "videoVCode",
  });
  video.belongsToMany(user, {
    as: "userUsername_user_v_authorities",
    through: v_authority,
    foreignKey: "videoVCode",
    otherKey: "userUsername",
  });
  upvote.belongsTo(board_content, {
    as: "boardContentBCode_board_content",
    foreignKey: "boardContentBCode",
  });
  board_content.hasMany(upvote, {
    as: "upvotes",
    foreignKey: "boardContentBCode",
  });
  i_authority.belongsTo(image, {
    as: "imageICode_image",
    foreignKey: "imageICode",
  });
  image.hasMany(i_authority, { as: "i_authorities", foreignKey: "imageICode" });
  i_authority.belongsTo(user, {
    as: "userUsername_user",
    foreignKey: "userUsername",
  });
  user.hasMany(i_authority, {
    as: "i_authorities",
    foreignKey: "userUsername",
  });
  subscribe.belongsTo(user, {
    as: "userUsername_user",
    foreignKey: "userUsername",
  });
  user.hasMany(subscribe, { as: "subscribes", foreignKey: "userUsername" });
  subscribe.belongsTo(user, {
    as: "ChildUsername_user",
    foreignKey: "ChildUsername",
  });
  user.hasMany(subscribe, {
    as: "ChildUsername_subscribes",
    foreignKey: "ChildUsername",
  });
  upvote.belongsTo(user, {
    as: "userUsername_user",
    foreignKey: "userUsername",
  });
  user.hasMany(upvote, { as: "upvotes", foreignKey: "userUsername" });
  v_authority.belongsTo(user, {
    as: "userUsername_user",
    foreignKey: "userUsername",
  });
  user.hasMany(v_authority, {
    as: "v_authorities",
    foreignKey: "userUsername",
  });
  v_authority.belongsTo(video, {
    as: "videoVCode_video",
    foreignKey: "videoVCode",
  });
  video.hasMany(v_authority, { as: "v_authorities", foreignKey: "videoVCode" });

  return {
    attach,
    board_content,
    i_authority,
    image,
    purchase,
    reply,
    shorts,
    subscribe,
    upvote,
    user,
    v_authority,
    video,
    view_history,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
