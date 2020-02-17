const express = require("express");
const path = require("path");
const hbs = require("hbs");
const gecode = require("./utils/geoencoding")
const forecast = require("./utils/forecast")

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index",{
        title: "Weather",
        name: "Shresth Dewan",
        age: 20
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Shresth Dewan",
        age: 20
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Shresth Dewan"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please enter an address!"
        })
    }

    gecode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        } 
        forecast(latitude, longitude, (error, response) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                place: place,
                forecast: response
            })
        })
    })
})

app.get("help/*", (req, res) => {
    res.render("error", {
        title: "404 error",
        message: "Help article not found!"
    });
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "404 error",
        message: "Page not found"
    })
})



app.listen(3000, () => {
    console.log("Server running on port 3000.");
})