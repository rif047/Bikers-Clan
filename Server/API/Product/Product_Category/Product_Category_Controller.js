const { Product_Category, validate } = require('./Product_Category_Model');
const Multer = require('multer');



const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Assets/Images/Product_Categories/");
    },
    filename: function (req, file, cb) {
        const categoryName = req.body.name.toLowerCase();
        const name = categoryName + '-' + 'Bikers Clan- ' + file.originalname;
        cb(null, name);
    },
});

const uploadImages = Multer({ storage: storage });





const Product_Categories = async (req, res) => {
    let Data = await Product_Category.find();
    res.json(Data)
}



const Create = async (req, res) => {
    try {
        let { name, slug } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        let checkName = await Product_Category.findOne({ name: name.toLowerCase() });
        let checkSlug = await Product_Category.findOne({ slug: slug.toLowerCase() });

        if (checkName) return res.status(400).send({ message: 'Category already exist!' });
        if (checkSlug) return res.status(400).send({ message: 'Slug already exist!' });

        let newCategory = new Product_Category({
            name: name.toLowerCase(),
            slug: slug.toLowerCase()
        });

        await newCategory.save();
        res.status(201).send(newCategory)

    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}



const View = async (req, res) => {
    let viewOne = await Product_Category.findOne({ name: req.params.name });
    res.send(viewOne)
}



const Update = async (req, res) => {
    try {
        let { name, slug } = req.body;

        let { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        let checkName = await Product_Category.findOne({ name: name.toLowerCase(), _id: { $ne: req.params.id } });
        let checkSlug = await Product_Category.findOne({ slug: slug.toLowerCase(), _id: { $ne: req.params.id } });

        if (checkName) return res.status(400).send({ message: 'Category already exist!' });
        if (checkSlug) return res.status(400).send({ message: 'Slug already exist!' });

        const updateCategory = await Product_Category.findById(req.params.id);

        updateCategory.name = name.toLowerCase()
        updateCategory.slug = slug.toLowerCase()


        await updateCategory.save();
        res.send(updateCategory)


    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}



const Delete = async (req, res) => {
    await Product_Category.findByIdAndDelete(req.params.id)
    res.send('Deleted')
}


module.exports = { Product_Categories, Create, View, Update, Delete, uploadImages }