"use strict";

module.exports = function(app) {
  var video = require("../controllers/videoController");

  // videos Routes
  app.route("/video").post(video.create);

  app.route("/competition/:competitionId/videos/:state").get(video.list);

  app.route("/competition/:competitionId/videos").get(video.listById);

};
