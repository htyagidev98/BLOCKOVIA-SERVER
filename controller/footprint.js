const Footprint = require('../models/footprint')
bodyParser = require("body-parser")
Validator = require("validatorjs")


exports.footprintAdd = async (req, res) => {
    try {
        const rules = { title: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title} = req.body;
            let networkData = await Footprint.findOne({ title: title }).lean();
            if (!networkData) {
                let data = await Footprint.create({
                    title: title
                });
                return res.status(200).json({ responseMessage: "Successfully", responseData: { data }, });
            } else {
                return res.status(403).json({ responseMessage: "title Exist", responseData: {} })
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })

    }
}

exports.footprintGet = async (req, res) => {
    try {
        const contentlist = await Footprint.findOne().sort({ createdAt: -1 });
        if (contentlist) {
            const contentObj = {
                _id: contentlist._id,
                title: contentlist.title       
            };
            return res.status(200).json({ responseMessage: "Successfully", responseData: contentObj });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};

exports.footprintUpdate = async (req, res) => {
    try {
    const rules = { title: "required" };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        return res.status(422).json({
            responseMessage: "Validation Error", responseData: validation.errors.all(),
        });
    } else {
        const { title} = req.body;
        const { _id } = req.query;
        let footprintData = await Footprint.findById(_id).lean();
        if (!footprintData) {
            return res.status(404).json({ responseMessage: "Data not found", responseData: {} });
        } else {
           
            const updatedData = {
                title: title
            };
            const data = await Footprint.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });

            return res.status(200).json({ responseMessage: "Successfully updated", responseData: data });
        }
    }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};