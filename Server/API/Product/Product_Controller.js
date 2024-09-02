const { Product, validate } = require('./Product_Model');
const Multer = require('multer');
const Sharp = require('sharp');
const FS = require('fs');




// Multer
const fileCounts = {};

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/Images/Products/');
    },
    filename: function (req, file, cb) {
        const productName = req.body.name.toLowerCase();
        const productFileCount = fileCounts[productName] || 0;
        const name = productName + '-' + productFileCount + '-' + 'Bikers Clan- ' + file.originalname;
        cb(null, name);
        fileCounts[productName] = productFileCount + 1;
    }
});


const uploadImages = Multer({ storage: storage }).array('images', 4);









const Products = async (req, res) => {
    let Data = await Product.find().populate('category');
    res.send(Data)
}



const Create = async (req, res) => {
    const { name, daraz_name, buying, selling, daraz_selling, stock, unit, description, feature, publish, category } = req.body;

    let { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const checkExistingName = await Product.findOne({ name: name.toLowerCase() });

        if (checkExistingName) { return res.status(400).json({ error: 'Product Already exists.' }); }

        const newProduct = new Product({
            name: name.toLowerCase(),
            daraz_name: daraz_name ? daraz_name.toLowerCase() : name.toLowerCase(),
            buying,
            selling,
            daraz_selling: daraz_selling ? daraz_selling : (selling * 25) / 100,
            stock,
            unit,
            description,
            feature,
            publish,
            category
        });

        if (req.files && req.files.length > 0) {
            const imageFilenames = await Promise.all(req.files.map(async (file) => {
                const buffer = await Sharp(file.path).resize({ width: 800, height: 600, fit: 'inside' }).toBuffer();

                await FS.promises.unlink(file.path);

                const destinationPath = 'Assets/Images/Products/' + file.filename;

                await FS.promises.writeFile(destinationPath, buffer);

                return file.filename;
            }));
            newProduct.images = imageFilenames ? imageFilenames : '';
        }

        await newProduct.save();
        res.json(newProduct);

    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
};




const View = async (req, res) => {
    let viewOne = await Product.findOne({
        name: req.params.name
    }).populate('category');

    res.json(viewOne);
};



const Update = async (req, res) => {
    const { name, daraz_name, buying, selling, daraz_selling, stock, unit, description, feature, publish, category } = req.body;

    let { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const checkName = await Product.findOne({ name: name.toLowerCase(), _id: { $ne: req.params.id } });

        if (checkName) { return res.status(400).json({ error: 'Product Already exists.' }); }

        const updateOne = await Product.findById(req.params.id);

        updateOne.name = name.toLowerCase();
        updateOne.daraz_name = daraz_name.toLowerCase();
        updateOne.buying = buying;
        updateOne.selling = selling;
        updateOne.daraz_selling = daraz_selling;
        updateOne.stock = stock;
        updateOne.unit = unit;
        updateOne.description = description;
        updateOne.feature = feature;
        updateOne.publish = publish;
        updateOne.category = category;

        if (req.files && req.files.length > 0) {
            const imageFilenames = await Promise.all(req.files.map(async (file) => {
                const buffer = await Sharp(file.path).resize({ width: 800, height: 600, fit: 'inside' }).toBuffer();

                await FS.promises.unlink(file.path);

                const destinationPath = 'Assets/Images/Products/' + file.filename;

                await FS.promises.writeFile(destinationPath, buffer);

                return file.filename;
            }));
            updateOne.images = imageFilenames;
        }

        await updateOne.save();
        res.json(updateOne);

    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}




const Delete = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Deleted')
}


module.exports = { Products, Create, View, Update, Delete, uploadImages }