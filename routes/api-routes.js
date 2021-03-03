var db = require("../models");
var router = require("express").Router();

router.get("/api/workouts", function (req, res) {
    db.Workout
        // .find({})
        .aggregate([{
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }])
        .then(function (dbWorkouts) {
            res.json(dbWorkouts)
        })
});

router.post("/api/workouts", function (req, res) {
    db.Workout.create({day: Date.now()}).then(function (dbWorkouts) {
        res.json(dbWorkouts)
    })
});

router.put("/api/workouts/:id", function (req, res) {
    db.Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true },
    ).then(function (dbWorkouts) {
        res.json(dbWorkouts)
    })
});

router.get("/api/workouts/range", function (req, res) {
    db.Workout.find({}).then(function (dbWorkouts) {
        res.json(dbWorkouts)
    })
});

module.exports = router