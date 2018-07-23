const router = require("express").Router();
const controller = require("../../controllers/controller");
const verifyToken = require('../../auth.js').verifyToken

router
  .route("/")
  .get(controller.getPlaces)
  .get(controller.login)
  .post(controller.save)
  .delete(controller.remove);

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

//router.use(verifyToken)

router
  .route("/users/auth/:id")
  .get(controller.authenticate)
  
router
  .route("*")
  .get(controller.navigate);

module.exports = router;
