const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => res.render("index"));

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    if (!req.file) return res.json({ error: "no file found" });
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    });
});

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
