let Expense = require('./Expense_Model');
let multer = require('multer');
let sharp = require('sharp');
let path = require('path');
let FS = require('fs');


const EndPoint = 'expenses'

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









let Expenses = async (req, res) => {
    let Data = await Expense.find().populate('category');
    res.status(200).json(Data);
};








let Create = async (req, res) => {
    try {
        let { date, name, amount, description, category } = req.body;

        if (!date) { return res.status(400).send('Date is required!'); }
        if (!name) { return res.status(400).send('Expense Name is required!'); }
        if (!amount) { return res.status(400).send('Amount is required!'); }
        if (!category) { return res.status(400).send('Category is required!'); }

        let images = [];
        if (req.files?.length) {
            images = await compressAndSaveImages(req.files, name.toLowerCase());
        }

        let newData = new Expense({
            date: new Date(date).toISOString().split('T')[0],
            name: name.toLowerCase(),
            amount,
            description,
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
    let viewOne = await Expense.findById(req.params.id).populate('category');
    res.send(viewOne);
};








let Update = async (req, res) => {
    try {
        let { name, amount, description, category } = req.body;

        if (!name) { return res.status(400).send('Expense Name is required!'); }
        if (!amount) { return res.status(400).send('Amount is required!'); }
        if (!category) { return res.status(400).send('Category is required!'); }

        let updateData = await Expense.findById(req.params.id);

        let images = [];
        if (req.files?.length) {
            images = await compressAndSaveImages(req.files, name.toLowerCase());
        }

        updateData.name = name.toLowerCase();
        updateData.amount = amount;
        updateData.description = description;
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
        const product = await Expense.findById(req.params.id);

        if (!product) {
            return res.status(404).send('Expense not found');
        }

        if (product.images?.length) {
            product.images.forEach((image) => {
                const imagePath = path.join(`Assets/Images/${EndPoint}/`, image);
                if (FS.existsSync(imagePath)) {
                    FS.unlinkSync(imagePath);
                }
            });
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).send('Deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Deleting Expense');
    }
};


module.exports = { Expenses, Create, View, Update, Delete, uploadImages };
