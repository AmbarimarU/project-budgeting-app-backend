const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

let budget = require("../models/budget");

// gets all transantions

router.get("/", (req, res) => {
  res.status(200).send(budget);
});

// gets a transation by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const found = budget.find((e) => e.id === id);

  if (!found) {
    res.status(404).json({
      status: false,
      message: "id not found",
    });
  } else {
    res.json({ status: true, data: found });
  }
});

//adds a transaction
router.post("/", (req, res) => {
  if (!budget.push(req.body)) {
    res.send("can't add transaction if empty");
  } else if (budget.push(req.body)) {
    res.status(200).json({
      status: true,
      message: "transaction added",
      data: budget[budget.length - 1],
    });
  }
});

//updating a transantion
router.put("update-by-id/:id", (req, res) => {
  const { id } = req.params;
  const found = budget.findIndex((e) => e.id === id);

  if (found === -1) {
    res.status(404).json({ status: false, message: "id not found" });
  } else {
    budget[found] = req.body;
    let foundtransaction = budget[found];
    res.status(200).json({
      status: true,
      message: "transaction updated",
      data: foundtransaction,
    });
  }
});

//deleting a transantion

router.delete("delete-by-id/:id", (req, res) => {
  const { id } = req.params;

  let founditem = budget.findIndex((e) => e.id === id);

  if (founditem === -1) {
    res
      .status(404)
      .json({ status: false, message: "try again, id enter can't be found!" });
  } else {
    budget.splice(founditem, 1);
    res.json(budget);
  }
});

module.exports = router;
