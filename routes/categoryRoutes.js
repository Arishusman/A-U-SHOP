const express = require("express");

const router = express.Router();

const {

    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    assignProductToCategory,
    removeProductFromCategory

} = require("../Controllers/categoryController");


// GET ALL
router.get("/", getCategories);

// ADD
router.post("/", addCategory);

// UPDATE
router.put("/:id", updateCategory);

// DELETE
router.delete("/:id", deleteCategory);

// ASSIGN PRODUCT
router.post("/:id/product/:productId", assignProductToCategory);

// REMOVE PRODUCT
router.delete("/:id/product/:productId", removeProductFromCategory);

module.exports = router;