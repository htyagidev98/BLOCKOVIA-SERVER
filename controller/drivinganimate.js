const DrivingAnimate = require('../models/drivinganimate')
bodyParser = require("body-parser")
Validator = require("validatorjs")

exports.drivingAnimateAdd = async (req, res) => {
    try {
        const rules = { title: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title } = req.body;
            let DrivingAnimateData = await DrivingAnimate.findOne({ title: title }).lean();
            if (!DrivingAnimateData) {
                let data = await DrivingAnimate.create({
                    title: title,
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

exports.drivingAnimateGet = async (req, res) => {
    try {
        const contentlist = await DrivingAnimate.find().sort({ createdAt: 1 });
        if (contentlist && contentlist.length > 0) {
            let animatedData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                };
                animatedData.push(contentObj);
            });
            return res.status(200).json({ responseMessage: "Successfully", responseData: animatedData });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};

exports.drivingAnimateGetById = async (req, res) => {
    try {
        const { _id } = req.query;
        const contentlist = await DrivingAnimate.findById(_id);
        if (contentlist) {
            return res.status(200).json({ responseMessage: "Successfully", contentlist });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
}

exports.drivingAnimateUpdate = async (req, res) => {
    // try {
        const rules = { title: "required" };
        const validation = new Validator(req.body, rules);

        if (validation.fails()) {
            return res.status(422).json({responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title } = req.body;
            const { _id } = req.query;
            let drivingAnimateData = await DrivingAnimate.findById(_id).lean();
            if (!drivingAnimateData) {
                return res.status(404).json({ responseMessage: "Data not found", responseData: {} });
            } else {
                const updatedData = {
                    title: title,                };
                const data = await DrivingAnimate.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });

                return res.status(200).json({ responseMessage: "Successfully updated", responseData: data });
            }
        }
    // } catch (err) {
    //     return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    // }
};
