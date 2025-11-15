const LiveSession = require("../models/LiveSession");
const { v4: uuidv4 } = require("uuid");

exports.startSession = async (req, res) => {
    try {
        const unique_id = uuidv4();
        const userurl = `http://localhost:${process.env.PORT}/session/${unique_id}`;

        const session = await LiveSession.create({
            type: "live_class",
            unique_id,
            userurl
        });

        res.json({ success: true, session });

    } catch (err) {
        console.error("Error creating session:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
