const express = require("express")
const router = express.Router()
const offerController = require("../controllers/offerController")

router.get("/", offerController.getAllOffers)
router.get("/:offerCode", offerController.getOfferByCode)
router.post("/:offerCode/create_order", offerController.createOrder)

module.exports = router
