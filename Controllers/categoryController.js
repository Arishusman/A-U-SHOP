const Category = require("../models/categoryModel");
const Product = require("../models/product");

// ======================================
// GET ALL CATEGORIES
// ======================================

exports.getCategories = async (req, res) => {

    try {

        const categories = await Category.find()
            .populate("products")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            categories

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// ADD CATEGORY
// ======================================

exports.addCategory = async (req, res) => {

    try {

        const {

            name,
            description,
            banner,
            products

        } = req.body;

        const exists = await Category.findOne({ name });

        if (exists) {

            return res.status(400).json({

                success: false,

                message: "Category already exists"

            });

        }

        const category = await Category.create({

            name,
            description,
            banner,
            products

        });

        res.status(201).json({

            success: true,

            message: "Category Added",

            category

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// UPDATE CATEGORY
// ======================================

exports.updateCategory = async (req, res) => {

    try {

        const category = await Category.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!category) {

            return res.status(404).json({

                success: false,

                message: "Category not found"

            });

        }

        res.json({

            success: true,

            message: "Category Updated",

            category

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// DELETE CATEGORY
// ======================================

exports.deleteCategory = async (req, res) => {

    try {

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {

            return res.status(404).json({

                success: false,

                message: "Category not found"

            });

        }

        res.json({

            success: true,

            message: "Category Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// ASSIGN PRODUCT TO CATEGORY
// ======================================

exports.assignProductToCategory = async (req, res) => {

    try {

        const { id, productId } = req.params;

        const category = await Category.findById(id);

        if (!category) {

            return res.status(404).json({

                success: false,

                message: "Category not found"

            });

        }

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }

        if (!category.products.some((item) => item.toString() === productId)) {

            category.products.push(productId);

            await category.save();

        }

        res.json({

            success: true,

            message: "Product assigned to category",

            category

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// REMOVE PRODUCT FROM CATEGORY
// ======================================

exports.removeProductFromCategory = async (req, res) => {

    try {

        const { id, productId } = req.params;

        const category = await Category.findById(id);

        if (!category) {

            return res.status(404).json({

                success: false,

                message: "Category not found"

            });

        }

        category.products = category.products.filter(

            (item) => item.toString() !== productId

        );

        await category.save();

        res.json({

            success: true,

            message: "Product removed from category",

            category

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};