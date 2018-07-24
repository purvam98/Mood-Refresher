const router = require("express").Router();
const controller = require("../../controllers/controller");
const cookieParser = require('cookie-parser');
const agentMan = require('../../config/config.js');
router.use(cookieParser(agentMan.secret));
router
  .route("/")
  .get(controller.getPlaces)
  .post(controller.save)

router
  .route("/logout")
  .get(controller.logout)

router
  .route("/auth/nav")
  .get(controller.authenticate)

router
  .route("/details")
  .get(controller.getPlacesDetails);

router
  .route("/:id")
  .delete(controller.remove);

router
  .route("/users")
  .get(controller.login)
  .post(controller.register)

router
  .route("/users/auth/")
  .get(controller.profile)

router
  .route("*")
  .get(controller.navigate);

module.exports = router;
