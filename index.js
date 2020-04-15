const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const reviveDates = require('./helpers/reviveDates');
const queryParser = require('./helpers/queryParser');
const querySelectParser = require('./helpers/querySelectParser');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const PORT = process.env.PORT || 5000;

db.connect(err => console.log(err || "db has been connected"));


app.use(cors());
app.use(bodyParser.json({reviver: reviveDates}));
app.use(bodyParser.urlencoded({extended: true}));


const tables = [
    'meteo_stations',
    'meteo_grounds',
    'meteo_poles',
    'employees',
    'devices',
    'indicators',
    'meteo_posts',
    'transport',
];


app.get("/", (req, res) => res.json("It's meteo station API"));

app.get("/access_req", (req, res) => {
    const pass = req.query.pass;

    if (pass === process.env.DB_PASS) {
        res.json("success")
    }else {
        res.json({
            error: true,
            status:"Failed",
            message:"Incorrect password"
        })
    }
});

app.get("/data", (req, res) => {
    const table = req.query.table;
    const query = `SELECT * FROM ${table}`;

    db.query(query,(err, response) => {
        if (err){
            res.status(400).json(err)
        } else {
            res.status(200).json(response)
        }
    });
});

app.post("/post", (req, res) => {
    const table = req.query.table;
    const query = `INSERT INTO ${table} SET ?`;

    db.query(query, req.body, err => {
        if (err){
            res.status(400).json(err)
        } else {
            res.status(200).json(req.body)
        }
    });
});

app.put("/edit", (req, res) => {
    const {key, table} = req.query;
    const query = `UPDATE ${table} SET ${queryParser(req.body)} WHERE ${queryParser({[key]: req.body[key]})}`;

    db.query(query, req.body, err => {
        if (err){
            res.status(400).json(err)
        } else {
            res.status(200).json(req.body)
        }
    });
});

app.delete("/delete", (req, res) => {
    const {table, key, value} = req.query;
    const query = `DELETE FROM ${table} WHERE ${queryParser({[key]: value})}`;

    db.query(query, req.body, err => {
        if (err){
            res.status(400).json(err)
        } else {
            res.status(200).json({[key]: value})
        }
    });
});

app.get("/complex_selection", (req, res) => {
    const {table, key, values} = req.query;

    const query = `SELECT * FROM ${table} WHERE ${querySelectParser(key, values.split(","))}`;

    db.query(query,(err, response) => res.json(err ? err : response));

});

// app.get("/test", (req, res) => {
//
//     const data = {
//         name: "ВАЗ2110",
//         number: "АВ1368ФЕ",
//         type: "легковий автомобіль",
//         driver: "Мірошниченко Іван Федорович",
//         inspection_date: new Date(),
//         meteo_post: "ПТ-1"
//     };
//     const query = "INSERT INTO transport SET ?";
//
//     console.log(new Date())
//
//     db.query(query, data, (err, response) => {
//         res.json(err ? err : response)
//     });
//
//
//     // db.query(query,(err, response) => res.json(err ? err : response));
// });

app.listen(PORT, () => console.log(`app has been started on ${PORT} port`));



// get data "SELECT * FROM `meteo_stations`";


// post data

//weather_stations
// const data = {
//     name: "МС-4",
//     location: "25325, 34344",
//     city: "Львів",
//     degree: "II",
//     openingYear: "2010",
//     type: "лісова", //дорожня, лісова, гідрологічна, побутова
// };

//meteo_grounds
//const data = {
//         name: "ММ-13",
//         meteo_post: "ПТ-46",
//         type: "відкрита", //відкрита, закрита
//         surface: "асфальт", //бетон, трава, асфальт
//         size: "28*28",
//         altitude: 250,
//     };

//meteo_poles
// const data = {
//     name: "МТ-19",
//     height: 13,
//     type: "переносна", //'капітальна', 'переносна', 'розбірна'
//     meteo_ground: "ММ-131",
// };

// const query = "INSERT INTO meteo_stations SET ?";
//
// db.query(query, data, (err, response) => {
//     res.json(err ? err : response)
// });

// put "UPDATE weather_station SET city = 'Київ' WHERE city = 'Житомир'";

//delete "DELETE FROM weather_station WHERE name = 'МС-3'"

//create table
//weather_stations
// const query = "CREATE TABLE weather_stations(" +
//     "name TINYTEXT, " +
//     "location TEXT, " +
//     "city TINYTEXT, " +
//     "degree ENUM( 'І', 'II', 'ІІІ' ), " +
//     "openingYear TINYTEXT, " +
//     "type ENUM( 'дорожня', 'лісова', 'гідрологічна', 'побутова' ), " +
//     "PRIMARY KEY (name(10))" +
//     ")";

//meteo_grounds
// const query = "CREATE TABLE meteo_grounds(" +
//     "name TINYTEXT, " +
//     "meteo_post TINYTEXT, " +
//     "type ENUM( 'відкрита', 'закрита' ), " +
//     "surface ENUM( 'бетон', 'трава', 'асфальт' ), " +
//     "size TINYTEXT, " +
//     "altitude INT, " +
//     "PRIMARY KEY (name(10))" +
//     ")";

//meteo_poles
// const query = "CREATE TABLE meteo_poles(" +
//     "name TINYTEXT, " +
//     "height SMALLINT, " +
//     "type ENUM( 'капітальна', 'переносна', 'розбірна' ), " +
//     "meteo_ground TINYTEXT, " +
//     "PRIMARY KEY (name(10))" +
//     ")";

//employees
// const query = "CREATE TABLE employees(" +
//     "full_name TINYTEXT, " +
//     "birth_date DATE, " +
//     "meteo_station TINYTEXT, " +
//     "position TINYTEXT, " +
//     "meteo_post TINYTEXT, " +
//     "CONSTRAINT employee PRIMARY KEY (full_name(10), meteo_station(10))" +
//     ")";

//devices
// const query = "CREATE TABLE devices(" +
//     "name TINYTEXT, " +
//     "installation_date DATE, " +
//     "meteo_pole TINYTEXT, " +
//     "type ENUM( 'термометр', 'барометр', 'гігрометр', 'флюгер', 'опадомір' ), " +
//     "inspection_frequency TEXT, " +
//     "PRIMARY KEY (name(10))" +
//     ")";
//

//indicators
// const query = "CREATE TABLE indicators(" +
//     "value TEXT, " +
//     "device TINYTEXT, " +
//     "timestamp TIMESTAMP, " +
//     "type ENUM( 'термометр', 'барометр', 'гігрометр', 'флюгер', 'опадомір' ), " +
//     "CONSTRAINT indicator PRIMARY KEY (timestamp, device(10))" +
//     ")";

//meteo_posts
// const query = "CREATE TABLE indicators(" +
//     "name TINYTEXT, " +
//     "chief TEXT, " +
//     "transport TEXT, " +
//     "meteo_station TINYTEXT, " +
//     "time_zone TINYTEXT, " +
//     "PRIMARY KEY (name(10))" +

//transport
// const query = "CREATE TABLE transport(" +
//     "number TEXT, " +
//     "inspection_date DATE, " +
//     "name TEXT, " +
//     "type ENUM( 'гелікоптер', 'позашляховик', 'легковий автомобіль', 'квадроцикл', 'снігохід' ), " +
//     "driver TEXT, " +
//     "meteo_post TINYTEXT, " +
//     "PRIMARY KEY (number(20))" +
//     ")";



//create db "CREATE DATABASE test";

//delete db "DROP DATABASE test";
