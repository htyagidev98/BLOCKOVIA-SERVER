const Community = require('../models/community')
bodyParser = require("body-parser")
Validator = require("validatorjs")

exports.communityAdd = async (req, res) => {
    try {
        const rules = { title: "required", paragraph: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({ responseMessage: "Validation Error", responseData: validation.errors.all(), });
        } else {
            const { title, paragraph } = req.body;
            let communityData = await Community.findOne({ title: title }).lean();
            if (!communityData) {

                let data = await Community.create({
                    title: title,
                    paragraph: paragraph
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

exports.communityGet = async (req, res) => {
    try {
        const contentlist = await Community.findOne().sort({ createdAt: 1 });
        if (contentlist) {
            const contentObj = {
                _id: contentlist._id,
                title: contentlist.title,
                paragraph: contentlist.paragraph
            };
            return res.status(200).json({ responseMessage: "Successfully", responseData: contentObj });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};

exports.communityUpdate = async (req, res) => {
    // try {
    const rules = { title: "required", paragraph: "required" };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        return res.status(422).json({
            responseMessage: "Validation Error", responseData: validation.errors.all(),
        });
    } else {
        const { title, paragraph } = req.body;
        const { _id } = req.query;
        let communityData = await Community.findById(_id).lean();
        if (!communityData) {
            return res.status(404).json({ responseMessage: "Data not found", responseData: {} });
        } else {
            const updatedData = {
                title: title,
                paragraph: paragraph
            };
            const data = await Community.findByIdAndUpdate({ _id: _id }, updatedData, { new: true });

            return res.status(200).json({ responseMessage: "Successfully updated", responseData: data });
        }
    }
    // } catch (err) {
    //     return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    // }
};