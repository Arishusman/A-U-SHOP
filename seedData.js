const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");
const Category = require("./models/categoryModel");


async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");


        await Product.deleteMany({});
        await Category.deleteMany({});


        console.log("Old data deleted");
        console.log("🚀 Creating Sample Data...");


        // ===================================
        // CREATE CATEGORIES
        // ===================================

        const lawCategory = await Category.create({

            name: "Law",
            description: "Law Books"

        });


        const cricketCategory = await Category.create({

            name: "Cricket",
            description: "Cricket Products"

        });


        const hockeyCategory = await Category.create({

            name: "Hockey",
            description: "Hockey Products"

        });


        console.log("✅ Categories Created");



        // ===================================
        // CREATE PRODUCTS
        // ===================================


        const products = [


            {
                name: "Criminal Law Book",
                category: "Law",
                price: 500,
                description: "Law book",
                image: "",
                stock: 20,
                discount: 0,
                status: "Available"
            },


            {
                name: "Constitution Law Book",
                category: "Law",
                price: 700,
                description: "Constitution book",
                image: "",
                stock: 15,
                discount: 0,
                status: "Available"
            },


            {
                name: "Cricket Bat",
                category: "Cricket",
                price: 3000,
                description: "Professional cricket bat",
                image: "",
                stock: 10,
                discount: 5,
                status: "Available"
            },


            {
                name: "Hockey Stick",
                category: "Hockey",
                price: 2500,
                description: "Hockey stick",
                image: "",
                stock: 8,
                discount: 0,
                status: "Available"
            },
            
{
    name: "Civil Law Book",
    category: "Law",
    price: 600,
    description: "Civil law reference book",
    image: "",
    stock: 12,
    discount: 0,
    status: "Available"
},

{
    name: "International Law Book",
    category: "Law",
    price: 800,
    description: "International law book",
    image: "",
    stock: 10,
    discount: 5,
    status: "Available"
},

{
    name: "Cricket Ball",
    category: "Cricket",
    price: 1200,
    description: "Professional cricket ball",
    image: "",
    stock: 20,
    discount: 0,
    status: "Available"
},

{
    name: "Cricket Gloves",
    category: "Cricket",
    price: 1800,
    description: "Batting gloves",
    image: "",
    stock: 15,
    discount: 10,
    status: "Available"
},

{
    name: "Hockey Ball",
    category: "Hockey",
    price: 900,
    description: "Hockey match ball",
    image: "",
    stock: 25,
    discount: 0,
    status: "Available"
}

        ];


        await Product.insertMany(products);


        console.log("✅ Products Created");


        console.log("🎉 Database Seed Completed");


        await mongoose.connection.close();


    } catch (error) {

        console.log("❌ Seed Error:", error);

    }

}


seedDatabase();