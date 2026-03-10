const express = require("express");
const fixedSample = require("../samples/fixed-sample");
const createRandomSample = require("../samples/create-random-sample");
const router = express.Router();

//pick either fixedSample or call createRandomSample to generate random packages
const dataset = fixedSample;
console.log('dataset size:', dataset.length)

/* GET packages listing w/o dependencies. */
router.get("/", function (req, res, next) {
  res.send(
    dataset.map((package) => ({
      id: package.id,
      weeklyDownloads: package.weeklyDownloads,
      dependencyCount: package.dependencies.length,
    }))
  );
});

/* GET package. */
router.get("/:id", function (req, res, next) {
  const match = dataset.find((p) => p.id === req.params.id);
  if (!match) {
    res.status(404);
    return;
  }
  res.send({
    id: match.id,
    weeklyDownloads: match.weeklyDownloads,
    dependencyCount: match.dependencies.length,
  });
});

/* GET package dependencies. */
router.get("/:id/dependencies", function (req, res, next) {
  const match = dataset.find((p) => p.id === req.params.id);
  if (!match) {
    res.status(404);
    return;
  }
  res.send(match.dependencies);
});

module.exports = router;
