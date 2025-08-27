let Expense_Category = require('./Expense_Category_Model')



let Expense_Categories = async (req, res) => {
    let Data = await Expense_Category.find();
    res.json(Data);
}




const Create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) { return res.status(400).send('Category Name is required!'); }

        const checkName = await Expense_Category.findOne({ name: name.toLowerCase() });

        if (checkName) { return res.status(400).send('Category already exists'); }

        const newData = new Expense_Category({ name: name.toLowerCase() });
        await newData.save();
        res.json(newData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}






let View = async (req, res) => {
    let viewOne = await Expense_Category.findById(req.params.id);
    res.send(viewOne)
}




let Update = async (req, res) => {
    try {
        let { name } = req.body;

        if (!name) { return res.status(400).send('Category Name is required!'); }

        const checkName = await Expense_Category.findOne({ name: name.toLowerCase(), _id: { $ne: req.params.id } });

        if (checkName) { return res.status(400).send('Category already exists'); }

        let Data = await Expense_Category.findById(req.params.id);
        Data.name = name.toLowerCase();
        await Data.save();
        res.json(Data)

    } catch (error) {
        res.status(501).send(error);
    }
}





let Delete = async (req, res) => {
    await Expense_Category.findByIdAndDelete(req.params.id);
    res.send('Deleted')
}




module.exports = { Expense_Categories, Create, View, Update, Delete }