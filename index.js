const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
app.use(express.json());
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.get("/", function (req, res) {
    res.json({
        msg: "it is working perfectly fine",
    });
});

app.use(rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
