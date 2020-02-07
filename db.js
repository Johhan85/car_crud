const Promise = require('bluebird');
const sqlite = require('sqlite');

const dbOpen = sqlite.open('./db.db', { Promise });

const getCars = async () => {
    const sql = 'SELECT id, regnr, brand, model FROM cars';
    const db = await dbOpen;
    return db.all(sql);
}

const getCar = async (id) => {
    const sql = 'SELECT id, regnr, brand, model FROM cars where id = ?';
    const db = await dbOpen;
    return db.all(sql, id);
}

const addCar = async (regnr, brand, model) => {
    const sql = 'INSERT INTO cars (regnr, brand, model) VALUES (?,?,?)';
    const db = await dbOpen;
    return db.run(sql, regnr, brand, model);
}

const deleteCar = async (id) => {
    const sql = 'DELETE from cars where id = ?';
    const db = await dbOpen;
    return db.run(sql, id);
}

const updateCar = async (regnr, brand, model, id) => {
    const sql = 'UPDATE cars SET regnr = ?, brand = ?, model = ? where id = ?'
    const db = await dbOpen;
    return db.run(sql, [regnr, brand, model, id]);
}


module.exports = { getCars : getCars, getCar : getCar, addCar : addCar, deleteCar : deleteCar, updateCar : updateCar };