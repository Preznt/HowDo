import _attach from "./attach.js";
import _board_content from "./board_content.js";
import _image from "./image.js";
import _purchase from "./purchase.js";
import _reply from "./reply.js";
import _shorts from "./shorts.js";
import _user from "./user.js";
import _video from "./video.js";
import _view_history from "./view_history.js";

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

  user.belongsToMany(video, { through: "v_authority" });
  video.belongsToMany(user, { through: "v_authority" });

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

  user.belongsToMany(image, { through: "i_authority" });
  image.belongsToMany(user, { through: "i_authority" });

  user.belongsToMany(board_content, { through: "upvote" });
  board_content.belongsToMany(user, { through: "upvote" });

  user.belongsToMany(user, { as: "Children", through: "subscribe" });

  board_content.hasMany(attach, { foreignKey: "b_code" });
  attach.belongsTo(board_content, { foreignKey: "b_code" });

  board_content.hasMany(reply, { foreignKey: "b_code" });
  reply.belongsTo(board_content, { foreignKey: "b_code" });

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
  };
};

export default initModels;
