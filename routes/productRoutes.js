const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const upload = require("../middleware/upload");

// ===================================
// GET ALL PRODUCTS
// ===================================

router.put("/:id", upload.single("image"), async (req, res) => {

    console.log("BODY =", req.body);
    console.log("FILE =", req.file);

    try {

        const products = await Product.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            products
        });

    }

    catch (error) {

    console.error("UPDATE ERROR =", error);

    res.status(500).json({
        success: false,
        message: error.message
    });

}

});


// ===================================
// ADD PRODUCT
// ===================================

// ===================================
// ADD PRODUCT
// ===================================

router.post("/", upload.single("image"), async (req, res) => {

    console.log("REQ.FILE =", req.file);

    try {

        const product = new Product({

            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount || 0,
            image: req.file ? req.file.path : "",
            stock: req.body.stock,
            status: req.body.status

        });


        const savedProduct = await product.save();


        res.status(201).json({

            success: true,
            message: "Product Added Successfully",
            product: savedProduct

        });


    } 
    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// ===================================
// UPDATE PRODUCT
// ===================================

router.put("/:id", upload.single("image"), async (req, res) => {

    
    try { const updateData = {

    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    stock: req.body.stock,
    status: req.body.status

};

if (req.file) {

    updateData.image = req.file.path;

}

        const updatedProduct = await Product.findByIdAndUpdate(

            req.params.id,

            updateData,

            { new: true }

        );

        res.json({

            success: true,
            product: updatedProduct

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// ===================================
// DELETE PRODUCT
// ===================================

router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({

            success: true,
            message: "Product Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});

module.exports = router;