const router = require("express").Router();
const controller = require("../../controllers/controller");

router
  .route("/")
  .get(controller.getPlaces)
  .post(controller.save)
  .delete(controller.remove);
  
router
  .route("/details")
  .get(controller.getPlacesDetails);
  
  router
  .route("/:id")
  .delete(controller.remove);

  router
  .route("*")
  .get(controller.navigate);

module.exports = router;
