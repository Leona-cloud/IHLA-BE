const express = require("express");
const saveAnswers = require("../controllers/forms/save-answers");
const exportData = require("../controllers/forms/export-data");
const router = express.Router();

router.post("/populate-sheet", saveAnswers);
router.get("/export-data", exportData);

module.exports = router;
