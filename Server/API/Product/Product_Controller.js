let Product = require('./Product_Model');
let multer = require('multer');
let sharp = require('sharp');
let path = require('path');
let FS = require('fs');


const EndPoint = 'products'

let storage = multer.memoryStorage();

let fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb('Only JPG and PNG files are allowed!', false);
    }
    cb(null, true);
};

let uploadImages = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024,
        files: 5
    },
    fileFilter: fileFilter
}).array('images');


async function compressAndSaveImages(files, dataName) {
    const imageFilenames = [];
    for (const file of files) {
        const currentDateTime = new Date().toISOString().replace(/[:.-]/g, '');
        const imageName = `${dataName}-${currentDateTime}-${file.originalname}`;
        const outputPath = path.join(`Assets/Images/${EndPoint}/`, imageName);


        await sharp(file.buffer)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 })
            .toFile(outputPath);

        imageFilenames.push(imageName);
    }
    return imageFilenames;
}









let Products = async (req, res) => {
    let Data = await Product.find().populate('category');
    res.status(200).json(Data);
};








let Create = async (req, res) => {
    try {
        let { name, buying, selling, stock, description, feature, category, onWeb } = req.body;

        if (!name) { return res.status(400).send('Product Name is required!'); }
        if (!selling) { return res.status(400).send('Selling price is required!'); }
        if (!category) { return res.status(400).send('Category is required!'); }

        let checkName = await Product.findOne({ name: name.toLowerCase() });
        if (checkName) { return res.status(400).send('Product with this name already exists'); }


        let images = [];
        if (req.files?.length) {
            images = await compressAndSaveImages(req.files, name.toLowerCase());
        }

        let newData = new Product({
            name: name.toLowerCase(),
            buying,
            selling,
            stock: stock ? stock : 0,
            description,
            feature: feature ? feature : 0,
            onWeb: onWeb ? onWeb : 1,
            category,
            images
        });

        await newData.save();
        res.status(200).json(newData);
        console.log('Created Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Creation Error!!!');
    }
};





let View = async (req, res) => {
    let viewOne = await Product.findById(req.params.id).populate('category');
    res.send(viewOne);
};








let Update = async (req, res) => {
    try {
        let { name, buying, selling, stock, description, feature, category, onWeb } = req.body;

        if (!name) { return res.status(400).send('Product Name is required!'); }
        if (!selling) { return res.status(400).send('Selling price is required!'); }
        if (!category) { return res.status(400).send('Category is required!'); }

        let checkName = await Product.findOne({ name: name.toLowerCase(), _id: { $ne: req.params.id } });
        if (checkName) { return res.status(400).send('This name already exists'); }

        let updateData = await Product.findById(req.params.id);

        let images = [];
        if (req.files?.length) {
            images = await compressAndSaveImages(req.files, name.toLowerCase());
        }

        updateData.name = name.toLowerCase();
        updateData.selling = selling;
        updateData.buying = buying;
        updateData.stock = stock;
        updateData.description = description;
        updateData.feature = feature;
        updateData.onWeb = onWeb;
        updateData.category = category;
        updateData.images = images.length > 0 ? images : updateData.images;

        await updateData.save();
        res.status(200).json(updateData);
        console.log('Updated Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Updating Error!!!');
    }
};






let Delete = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        if (product.images?.length) {
            product.images.forEach((image) => {
                const imagePath = path.join(`Assets/Images/${EndPoint}/`, image);
                if (FS.existsSync(imagePath)) {
                    FS.unlinkSync(imagePath);
                }
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).send('Deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Deleting Product');
    }
};


module.exports = { Products, Create, View, Update, Delete, uploadImages };
