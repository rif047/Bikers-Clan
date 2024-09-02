const { Supplier, validate } = require('./Supplier_Model');


const Suppliers = async (req, res) => {
    const Data = await Supplier.find();
    res.json(Data)
}



const Create = async (req, res) => {
    try {
        const { name, phone, alt_phone, address, description } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const checkPhone = await Supplier.findOne({ phone });
        if (checkPhone) return res.status(400).send({ message: 'Phone Number already exist!' });

        const newSupplier = new Supplier({
            name,
            phone,
            alt_phone,
            address,
            description
        });

        await newSupplier.save();
        res.status(201).send(newSupplier)

    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}



const View = async (req, res) => {
    const viewOne = await Supplier.findOne({ phone: req.params.phone });
    res.send(viewOne)
}



const Update = async (req, res) => {
    try {
        const { name, phone, alt_phone, address, description } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const checkPhone = await Supplier.findOne({ phone: phone, _id: { $ne: req.params.id } });

        if (checkPhone) return res.status(400).send({ message: 'Phone Number already exist!' });

        const updateSupplier = await Supplier.findById(req.params.id);

        updateSupplier.name = name;
        updateSupplier.phone = phone;
        updateSupplier.alt_phone = alt_phone;
        updateSupplier.address = address;
        updateSupplier.description = description;


        await updateSupplier.save();
        res.send(updateSupplier)


    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}



const Delete = async (req, res) => {
    await Supplier.findByIdAndDelete(req.params.id)
    res.send('Deleted')
}

module.exports = { Suppliers, Create, View, Update, Delete }