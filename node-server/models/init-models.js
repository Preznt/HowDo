import _attach from "./attach.js";
import _board_content from "./board_content.js";
import _image from "./image.js";
import _purchase from "./purchase.js";
import _reply from "./reply.js";
import _shorts from "./shorts.js";
import _user from "./user.js";
import _video from "./video.js";
import _view_history from "./view_history.js";
import _i_authority from "./i_authority.js";
import _v_authority from "./v_authority.js";
import _subscribe from "./subscribe.js";
import _upvote from "./upvote.js";

const initModels = (sequelize) => {
  const attach = _attach(sequelize);
  const board_content = _board_content(sequelize);
  const image = _image(sequelize);
  const purchase = _purchase(sequelize);
  const reply = _reply(sequelize);
  const shorts = _shorts(sequelize);
  const user = _user(sequelize);
  const video = _video(sequelize);
  const view_history = _view_history(sequelize);
  const i_authority = _i_authority(sequelize);
  const v_authority = _v_authority(sequelize);
  const subscribe = _subscribe(sequelize);
  const upvote = _upvote(sequelize);

  user.belongsToMany(video, { through: v_authority, foreignKey: "username" });
  video.belongsToMany(user, { through: v_authority, foreignKey: "v_code" });

  user.belongsToMany(video, {
    as: "f_video",
    through: view_history,
    foreignKey: "username",
  });
  video.belongsToMany(user, {
    as: "f_user_v",
    through: view_history,
    foreignKey: "v_code",
  });

  user.belongsToMany(video, {
    as: "f_purchase_video",
    through: purchase,
    foreignKey: "username",
  });

  video.belongsToMany(user, {
    as: "f_purchase_user_v",
    through: purchase,
    foreignKey: "v_code",
  });

  user.belongsToMany(image, {
    as: "f_image",
    through: view_history,
    foreignKey: "username",
  });

  image.belongsToMany(user, {
    as: "f_user_i",
    through: view_history,
    foreignKey: "i_code",
  });

  user.belongsToMany(image, {
    as: "f_purchase_image",
    through: purchase,
    foreignKey: "username",
  });

  image.belongsToMany(user, {
    as: "f_purchase_user_i",
    through: purchase,
    foreignKey: "i_code",
  });

  user.belongsToMany(image, { through: i_authority, foreignKey: "username" });
  image.belongsToMany(user, { through: i_authority, foreignKey: "i_code" });

  user.belongsToMany(board_content, {
    through: upvote,
    foreignKey: "username",
  });
  board_content.belongsToMany(user, { through: upvote, foreignKey: "b_code" });

  user.belongsToMany(user, {
    as: "Children",
    through: subscribe,
    foreignKey: "username",
  });

  board_content.hasMany(attach, { foreignKey: "b_code" });
  attach.belongsTo(board_content, { foreignKey: "b_code" });

  board_content.hasMany(reply, { foreignKey: "b_code" });
  reply.belongsTo(board_content, { foreignKey: "b_code" });

  user.hasMany(board_content, { foreignKey: "username" });
  board_content.belongsTo(user, { foreignKey: "username" });

  user.hasMany(reply, { foreignKey: "username" });
  reply.belongsTo(user, { foreignKey: "username" });

  user.hasMany(image, { foreignKey: "username" });
  image.belongsTo(user, { foreignKey: "username" });

  user.hasMany(video, { foreignKey: "username" });
  video.belongsTo(user, { foreignKey: "username" });

  video.hasMany(shorts, { foreignKey: "v_code" });
  shorts.belongsTo(video, { foreignKey: "v_code" });

  return {
    attach,
    board_content,
    image,
    purchase,
    reply,
    shorts,
    user,
    video,
    view_history,
    i_authority,
    v_authority,
    subscribe,
    upvote,
  };
};

export default initModels;
