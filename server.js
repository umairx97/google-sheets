const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
const creds = require("./client_secret.json");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*", cors());

app.get("/data", async (req, res) => {
    const doc = new GoogleSpreadsheet("1gK-PGhklNW_j6BbnQ_fLKaCP7ByLZk6p14wdjhXxWAQ");
    try {
        await promisify(doc.useServiceAccountAuth)(creds);

        const info = await promisify(doc.getInfo)();
        const sheet = info.worksheets[0];

        const rows = await promisify(sheet.getRows)({
            offset: 1
        });


        rows.forEach(element => {
            console.log(element);
        });
        res.send(rows);
    } catch (error) {
        console.log('something went wrong')
    }
});

app.listen(4000, () => {
    console.log(`The server is running on port 4000`);
});
