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

        if(await searchID(id)) {
            res.json(car);
        } else {
            res.json({"info" : `Could not fetch car with id: ${ id }`});
        }
        
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
        if(await searchID(id)) {
            const deleteCar = await db.deleteCar(id);
            res.json({"info" : "Delete successfully"});
        } else {
            res.json({"info" : `Could not find car with id: ${ id }`});
        }
    } catch (error) {
        res.json(error);
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

const searchID = async (id) => {
    const searchID = await db.getCar(id);
    if(searchID.length !== 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = routes;