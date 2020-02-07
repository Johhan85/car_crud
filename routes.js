const routes = require('express').Router();
const db = require('./db.js');

routes.get('/', (req, res) => {
    res.json({"msg" : "Hello World"});
});

routes.get('/getcars', async (req, res) => {
    try {
        const cars = await db.getCars();
        res.json(cars);
    } catch (error) {
        res.json(error);
    }
});

routes.get('/getcar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const car = await db.getCar(id);
        res.json(car);
    } catch (error) {
        res.json(error);
    }
});

routes.post('/addcar', async (req, res) => {
    const regnr = req.body.regnr;
    const brand = req.body.brand;
    const model = req.body.model;

    try {
        const addCar = await db.addCar(regnr, brand, model);
        res.json({"info" : "Insert successfully"});
    } catch (error) {
        res.json(error);
    }
});

routes.delete('/deletecar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteCar = await db.deleteCar(id);
        res.json({"info" : "Delete successfully"});
    } catch (error) {
        
    }
});

routes.put('/updatecar/:id', async (req, res) => {
    const regnr = req.body.regnr;
    const brand = req.body.brand;
    const model = req.body.model;
    const id = req.params.id;

    try {
        const updateCar = await db.updateCar(regnr, brand, model, id);
        res.json({"info" : "Update successfully"});
    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;