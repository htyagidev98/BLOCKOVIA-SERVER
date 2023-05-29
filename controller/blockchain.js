const Blockchain = require('../models/blockchain');
bodyParser = require("body-parser")
Validator = require("validatorjs")

exports.blockchainAdd = async (req, res) => {
    try {
        const rules = { title: "required" };
        var validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({
                responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title } = req.body;
            let blockchainData = await Blockchain.findOne({ title: title }).lean();
            if (!blockchainData) {
                let data = await Blockchain.create({
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

exports.blockchainGet = async (req, res) => {
    try {
        const contentlist = await Blockchain.findOne().sort({ createdAt: 1 });
        if (contentlist) {
            const contentObj = {
                _id: contentlist._id,
                title: contentlist.title
            }
            return res.status(200).json({ responseMessage: "Successfully", responseData: contentObj });
        } else {
            return res.status(404).json({ responseMessage: "No Data found", responseData: {} })
        };
    } catch (err) {
        return res.status(500).json({ responseMessage: " Internal Sever Error", responseData: {} })
    }
};

exports.blockchainContentUpdate = async (req, res, images) => {
    try {
        const rules = { title: "required" };
        const validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(422).json({
                responseMessage: "Validation Error", responseData: validation.errors.all(),
            });
        } else {
            const { title } = req.body;
            const { _id } = req.query;
            let BlockchainData = await Blockchain.findById(_id).lean();
            if (!BlockchainData) {
                return res.status(404).json({ responseMessage: "Data not found", responseData: {} });
            } else {
                const updatedData = { title: title };
                const data = await Blockchain.findByIdAndUpdate({ _id: BlockchainData._id }, updatedData, { new: true });
                return res.status(200).json({ responseMessage: "Successfully updated", responseData: data });
            }
        }
    } catch (err) {
        return res.status(500).json({ responseMessage: "Internal Server Error", responseData: {} });
    }
};

