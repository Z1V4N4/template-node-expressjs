const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// routes
require("./routes/authRoutes")(app);

//cek koneksi oracle
const db_oracle = require("./models");
db_oracle.sequelize.sync({ force: false, alter: false })
    .then(() => {
        console.log("koneksi oracle ok");
    })
    .catch((err) => {
        console.log("koneksi oracle gagal: " + err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
