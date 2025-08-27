let Customer = require('./Customer_Model');



let Customers = async (req, res) => {
    let Data = await Customer.find();
    res.status(200).json(Data);
}




let Create = async (req, res) => {
    try {
        let { name, phone, alt_phone, address, shipping_address, email, password, answer } = req.body;

        if (!name) { return res.status(400).send('Customer Name is required!'); }
        if (!phone) { return res.status(400).send('Phone is required!'); }
        if (!address) { return res.status(400).send('Address is required!'); }
        if (!email) { return res.status(400).send('Email is required!'); }
        if (!password) { return res.status(400).send('Password is required!'); }
        if (!answer) { return res.status(400).send('Answer is required!'); }


        let checkPhone = await Customer.findOne({ phone });
        if (checkPhone) { return res.status(400).send('Phone number already exists. Use different one.'); };

        let checkEmail = await Customer.findOne({ email });
        if (checkEmail) { return res.status(400).send('Email already exists. Use different one.'); };



        let newData = new Customer({
            name: name.toLowerCase(),
            phone,
            alt_phone,
            address: address.toLowerCase(),
            shipping_address: shipping_address?.toLowerCase(),
            email: email.toLowerCase(),
            password,
            answer: answer.toLowerCase()
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
    let viewOne = await Customer.findById(req.params.id);
    res.send(viewOne)
}




let Update = async (req, res) => {
    try {
        let { name, phone, alt_phone, address, shipping_address, email, password, answer } = req.body;

        if (!name) { return res.status(400).send('Customer Name is required!'); }
        if (!phone) { return res.status(400).send('Phone is required!'); }
        if (!address) { return res.status(400).send('Address is required!'); }
        if (!email) { return res.status(400).send('Email is required!'); }
        if (!password) { return res.status(400).send('Password is required!'); }
        if (!answer) { return res.status(400).send('Answer is required!'); }


        let checkPhone = await Customer.findOne({ phone: phone, _id: { $ne: req.params.id } });
        if (checkPhone) { return res.status(400).send('Phone number already exists. Use different one.'); }

        let checkEmail = await Customer.findOne({ email: email.toLowerCase(), _id: { $ne: req.params.id } });
        if (checkEmail) { return res.status(400).send('Email already exists. Use different one.'); }


        let updateData = await Customer.findById(req.params.id);

        updateData.name = name.toLowerCase();
        updateData.phone = phone;
        updateData.alt_phone = alt_phone;
        updateData.address = address.toLowerCase();
        updateData.shipping_address = shipping_address?.toLowerCase();
        updateData.email = email.toLowerCase();
        updateData.password = password;
        updateData.answer = answer.toLowerCase();

        await updateData.save();
        res.status(200).json(updateData);
        console.log('Updated Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Updating Error!!!');
    }
}





let Delete = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted')
}




module.exports = { Customers, Create, View, Update, Delete }