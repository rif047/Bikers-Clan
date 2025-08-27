let Supplier = require('./Supplier_Model');



let Suppliers = async (req, res) => {
    let Data = await Supplier.find();
    res.status(200).json(Data);
}




let Create = async (req, res) => {
    try {
        let { name, phone, address, description } = req.body;

        if (!name) { return res.status(400).send('Name is required!'); }


        let checkPhone = await Supplier.findOne({ phone });
        if (checkPhone) { return res.status(400).send('Phone already exists. Use different one.'); };



        let newData = new Supplier({
            name: name.toLowerCase(),
            address: address.toLowerCase(),
            phone: phone,
            description: description?.toLowerCase()
        });

        await newData.save();
        res.status(200).json(newData);
        console.log('Created Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Creation Error!!!');
    }
}






let View = async (req, res) => {
    let viewOne = await Supplier.findById(req.params.id);
    res.send(viewOne)
}




let Update = async (req, res) => {
    try {
        let { name, phone, address, description } = req.body;

        if (!name) { return res.status(400).send('Name is required!'); }


        let checkPhone = await Supplier.findOne({ phone: phone, _id: { $ne: req.params.id } });
        if (checkPhone) { return res.status(400).send('Phone already exists. Use different one.'); }



        let updateData = await Supplier.findById(req.params.id);

        updateData.name = name.toLowerCase();
        updateData.phone = phone;
        updateData.address = address.toLowerCase();
        updateData.description = description.toLowerCase();

        await updateData.save();
        res.status(200).json(updateData);
        console.log('Updated Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Updating Error!!!');
    }
}





let Delete = async (req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted')
}




module.exports = { Suppliers, Create, View, Update, Delete }