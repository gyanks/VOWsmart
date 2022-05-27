let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Project Model
let projectSchema = require("../models/Project");

// CREATE  Project 
router.post("/", (req, res, next) => {
projectSchema.create(req.body, (error, data) => {
	if (error) {
	return next(error);
	} else {
	console.log(data);
	res.json(data);
	}
});
});

// READ Projects 
router.get("/", (req, res) => {
projectSchema.find((error, data) => {
	if (error) {
	return next(error);
	} else {
	res.json(data);
	}
});
});

// UPDATE student
router
.route("/:id")
// Get Single Student
.get((req, res) => {
	projectSchema.findById(
		req.params.id, (error, data) => {
	if (error) {
		return next(error);
	} else {
		res.json(data);
	}
	});
})

// Update Student Data
router.put((req, res, next) => {
	projectSchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	},
	(error, data) => {
		if (error) {
		return next(error);
		console.log(error);
		} else {
		res.json(data);
		console.log("Project  updated successfully !");
		}
	}
	);
});

// Delete Student
router.delete("/:id",
(req, res, next) => {
projectSchema.findByIdAndRemove(
	req.params.id, (error, data) => {
	if (error) {
	return next(error);
	} else {
	res.status(200).json({
		msg: data,
	});
	}
});
});

module.exports = router;
