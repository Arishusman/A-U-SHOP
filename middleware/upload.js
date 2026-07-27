const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1000000) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {

        return cb(null, true);

    }

    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));

};

// Upload Middleware
const upload = multer({

    storage,

    limits: {

        fileSize: 5 * 1024 * 1024

    },

    fileFilter

});

module.exports = upload;