//declarations and imports
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Instruments = require('./instruments.js')
const mongoose = require('mongoose')

// app plugins or lib
app.use(bodyParser.urlencoded({ extended: false }))

//API ROUTES
app.get('/instruments', (req, res) => {
    Instruments.find((err, instruments) => {
        if (err) {
            res.send("Error occured no instrument retrieved.")
            return
        } res.send(instruments)
        console.log(instruments)
    })

    console.log("The database in progress.")

})

app.get('/instruments/:id', (req, res) => {
    const id = req.params.id;
    instruments.findById(id, (err, instrument) => {
        if (err) {
            res.send("The instrument was not found!")
        } res.send(instrument)
        console.log(instrument)
    })
})

app.post('/instruments', (req, res) => {
    console.log('Adding new data in the database.');
    let available = false;
    if (req.body.available === 'false') { available = true; }

    let instrument = new Instruments({
        model: req.body.model,
        stringsnumber: parseInt(req.body.stringsnumber),
        typlength: req.body.typlength,
        commontuning: req.body.commontuning,
        available: available
    });
    instrument.save(err => {
        if (err) {
            res.send('Instrument not inserted.')
        }
    })
    res.send("Inserting instrument into the database.")
    console.log("Successfully inserted")
    return;
})


app.put('/instrumentsupdated/:id', (req, res) => {
    console.log("Editing data from database")
    Instruments.findByIdAndUpdate(
        req.params.id, {
        stringsnumber: parseInt(req.body.stringsnumber),
        typlength: req.body.typlength,
        model: req.body.model,
        commontuning: req.body.commontuning,
        available: req.body.available
    }, err => {
        if (err) {
            res.send("Data was not edited.")
            return;
        } res.send("Data sucessfully edited.")
    })

})

app.delete('/instrumentsdeleted/:id', (req, res) => {
    Instruments.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.send("Data was not deleted.")
            return
        } res.send("Data successfully deleted.")
        console.log(`Instrument with id ${req.params.id} was deleted`)
    })
})

app.listen(port, () => {
    //my database link from mongodb
    mongoose.connect('mongodb+srv://admin:21789@instruments.ltiq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
        catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)
})
