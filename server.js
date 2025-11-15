const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const LiveSession = require("./models/LiveSession");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();

const sessionRoutes = require("./routes/sessionRoutes");

app.use("/api", sessionRoutes);


// Serve frontend pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Session page
app.get("/session/:unique_id", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "session.html"));
});

// API: Create Session
app.post("/api/start-session", async (req, res) => {
    try {
        const unique_id = uuidv4();
        const type = "live_class";
        const userurl = `http://localhost:${process.env.PORT}/session/${unique_id}`;

        const session = await LiveSession.create({ type, unique_id, userurl });

        res.json({
            success: true,
            session: session
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on PORT ${process.env.PORT}`);
});
