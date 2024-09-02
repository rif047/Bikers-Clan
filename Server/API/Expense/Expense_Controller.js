const { Expense, validate } = require('./Expense_Model');
const Multer = require("multer");



const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/Images/Expenses/');
    },
    filename: function (req, file, cb) {
        const expenseName = req.body.name.toLowerCase();
        const name = expenseName + '-' + 'Expense-' + file.originalname;
        cb(null, name.toLowerCase());
    }
});


const uploadImages = Multer({ storage })


const Expenses = async (req, res) => {
    let Data = await Expense.find().populate('category');
    res.send(Data)
}



const Create = async (req, res) => {
    const { name, amount, date, description, category } = req.body;

    let { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const checkExistingName = await Expense.findOne({ name: name.toLowerCase() });

        if (checkExistingName) { return res.status(400).json({ error: 'Expense Already exists.' }); }

        const newExpense = new Expense({
            name: name.toLowerCase(),
            amount,
            date,
            description,
            category,
            image: req.file ? req.file.filename : '',
        });

        await newExpense.save();
        res.json(newExpense);

    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
};




const View = async (req, res) => {
    let viewOne = await Expense.findOne({
        name: req.params.name
    }).populate('category');

    res.json(viewOne);
};



const Update = async (req, res) => {
    const { name, amount, date, description, category } = req.body;

    let { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const checkName = await Expense.findOne({ name: name.toLowerCase(), _id: { $ne: req.params.id } });

        if (checkName) { return res.status(400).json({ error: 'Expense Already exists.' }); }

        const updateOne = await Expense.findById(req.params.id);

        updateOne.name = name.toLowerCase();
        updateOne.amount = amount;
        updateOne.date = date;
        updateOne.description = description;
        updateOne.category = category;
        if (req.file) {
            updateOne.image = req.file.filename;
        }

        await updateOne.save();
        res.json(updateOne);

    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}




const Delete = async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.send('Deleted')
}


module.exports = { Expenses, Create, View, Update, Delete, uploadImages }