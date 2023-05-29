const Animated = require('../models/animated')
bodyParser = require("body-parser")
Validator = require("validatorjs")


exports.animatedAdd = async (req, res) => {
    try {
        const rules = { title: "required", paragraph: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph } = req.body;
            let animatedData = await Animated.findOne({ title: title }).lean();
            if (!animatedData) {
                let data = await Animated.create({
                    title: title,
                    paragraph: paragraph,
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

exports.animatedGet = async (req, res) => {
    try {
        const contentlist = await Animated.find().sort({ createdAt: 1 });
        if (contentlist && contentlist.length > 0) {
            const animateData = [];
            contentlist.forEach(content => {
                const contentObj = {
                    _id: content._id,
                    title: content.title,
                    paragraph: content.paragraph
                };
                animateData.push(contentObj);
            });
            return res.status(200).json({ responseMessage: "Successfully", responseData: animateData });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};

exports.animatedGetById = async (req, res) => {
    try {
        const { _id } = req.query;
        const contentlist = await Animated.findById(_id);
        if (contentlist) {
            return res.status(200).json({ responseMessage: "Successfully", contentlist });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} });
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
}

exports.animatedUpdate = async (req, res) => {
    try {
        const rules = { title: "required", paragraph: "required" };
        const validation = new Validator(req.body, rules);

        if (validation.fails()) {
            return res.status(422).json({
                responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title, paragraph } = req.body;
            const { _id } = req.query;
            let animatedData = await Animated.findById(_id).lean();
            if (!animatedData) {
                return res.status(404).json({ responseMessage: "Data not found", responseData: {} });
            } else {
                const updatedData = {
                    title: title,
                    paragraph: paragraph
                };
                const data = await Animated.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });

                return res.status(200).json({ responseMessage: "Successfully updated", responseData: data });
            }

        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};
