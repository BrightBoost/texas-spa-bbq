let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

let app = express();

let urlencodedParser =
    bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

///////////////////////////////////////////////////////////////
//   ROOT URL

app.get("/", function (req, res) {
    res.send("BBQ web site and API ready...");
});

///////////////////////////////////////////////////////////////
//   API ENDPOINTS 

// ex: GET /api/menus
app.get("/api/menus", function (req, res) {
    console.log("Got a GET request for all menu names");

    // read the menu data file
    let data =
        fs.readFileSync(__dirname + "/data/menus.json", "utf8");

    // send debug output to the console
    console.log(data);

    // send a response containing menu types
    res.end(data);
});

// ex: GET /api/items/bymenu/Breakfast
app.get("/api/items/bymenu/:name", function (req, res) {
    // get the menu type from the last URL segment
    let menuName = req.params.name.toLowerCase();
    console.log("Got a GET request for menu " + menuName);

    // read the menu_details data file
    let data = fs.readFileSync(__dirname + "/data/menu_details.json", "utf8");
    data = JSON.parse(data);

    // find the matching menu items
    let matching =
        data.filter(mi => mi.menu.toLowerCase() == menuName);

    // send debug output to the console
    console.log(matching);

    // send a response containing the menu items 
    res.end(JSON.stringify(matching));
});

// ex: GET /api/items
app.get("/api/items", function (req, res) {
    console.log("Got a GET request all items");

    // read the menu_details data file
    let data = fs.readFileSync(__dirname + "/data/menu_details.json", "utf8");

    // send debug output to the console
    console.log(data);

    // send a response containing all menu items
    res.end(data);
});

// ex: GET /api/items/D5
app.get("/api/items/:id", function (req, res) {
    // get the menu item id from the last URL segment
    let id = req.params.id;
    console.log("Got a GET request for item " + id);

    // read the menu_details data file
    let data = fs.readFileSync(__dirname + "/data/menu_details.json", "utf8");
    data = JSON.parse(data);

    // find the matching menu item
    let matching = data.find(mi => mi.id == id);

    // send a response containing the selected menu item
    res.end(JSON.stringify(matching));
});

///////////////////////////////////////////////////////////////
//   THE SERVER

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let server = app.listen(8082, function () {
    let port = server.address().port;
    console.log("App listening at port %s", port);
});