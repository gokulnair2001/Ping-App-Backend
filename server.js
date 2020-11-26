const express = require('express')
const mongoose = require('mongoose')
const data = require('./noteSchema')
var app = express() 
var Data = require('./noteSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {

    console.log("Connected to database!")

}).on("error", (error) => {

    console.log("failed to connect! " + error)

})

// CEATE NOTE 
// POST request

app.post("/create", (req, res) => {
    
    var note = new Data({
     note: req.get("note"),
     title: req.get("title"),
     date: req.get("date"),

    })

    note.save().then(() => {
        if(note.isNew == false){
            console.log("Saved Data!")
            res.send("Saved data!")
        }else{
            console.log("Failed to save data!")
        }
    })
})

// FETCH NOTE
// GET request

app.get('/fetch', (req, res) => {

    Data.find({}).then((DBitems) => {
       res.send(DBitems)
    })
})

// DELETE NOTE
// POST request

app.post("/delete", (req, res) => {

    data.findByIdAndRemove({

       _id: req.get("id") 
    }, (err) => {
        console.log("Failed " + err)
    })

    res.send("Deleted!")

})

// UPDATE NOTE 
// POST request

app.post('/update', (req,res) => {
    Data.findOneAndUpdate({
        _id: req.get("id")
    },{
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")

    }, (err) => {
         console.log("Failed to update " +err)
    })
    res.send("Updated!")
})


//Enter your URL
var server = app.listen(8081, "Your IP address", () => {
    console.log("Server is Running!")
})





