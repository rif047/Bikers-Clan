const { Expense_Category, validate } = require('./Expense_Category_Model');

const Expense_Categories = async (req, res) => {
    let Data = await Expense_Category.find();
    res.json(Data)
}



const Create = async (req, res) => {
    try {
        let { name } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        let checkName = await Expense_Category.findOne({ name: name.toLowerCase() });

        if (checkName) return res.status(400).send({ message: 'Category already exist!' });

        let newCategory = new Expense_Category({
            name: name.toLowerCase()
        });

        await newCategory.save();
        res.status(201).send(newCategory)

    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}



const View = async (req, res) => {
    let viewOne = await Expense_Category.findOne({ name: req.params.name });
    res.send(viewOne)
}



const Update = async (req, res) => {
    try {
        let { name } = req.body;

        let { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        let checkName = await Expense_Category.findOne({ name: name.toLowerCase(), _id: { $ne: req.params.id } });

        if (checkName) return res.status(400).send({ message: 'Category already exist!' });

        const updateCategory = await Expense_Category.findById(req.params.id);

        updateCategory.name = name.toLowerCase()


        await updateCategory.save();
        res.send(updateCategory)


    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}



const Delete = async (req, res) => {
    await Expense_Category.findByIdAndDelete(req.params.id)
    res.send('Deleted')
}


module.exports = { Expense_Categories, Create, View, Update, Delete }