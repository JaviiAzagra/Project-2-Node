const express = require('express')
const Cinema = require('../models/cinema.model');
require('dotenv').config();

const router = express.Router();


//* Crear los métodos GET, POST, PUT y DELETE de la colección Cinema.

router.get('/', async(req, res, next) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        /* console.log(allCinemas); */
        return res.status(200).json(allCinemas);
    } catch (error) {
       return next(error);
    }
});

router.post('/create', async(req, res, next) => {
    try {
        const cinema = req.body;
        const newCinema = new Cinema(cinema);
        const created = await newCinema.save();
        return res.status(201).json(created);
    } catch (error) {
        return next(error);
    }
});

router.put('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const cinema = req.body;
        const cinemaModify = new Cinema(cinema)
        cinemaModify._id = id;
        const cinemaUpdated = await Cinema.findByIdAndUpdate(id, cinemaModify);
        return res.status(201).json({message: 'Modificado correctamente', cinemaUpdated});
    } catch (error) {
        return next(error)
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const cinemaToDelete = await Cinema.findByIdAndDelete(id);
        return res.status(201).json({message: 'Eliminado correctamente', cinemaToDelete});
    } catch (error) {
        return next(error);
    }
});

module.exports = router;