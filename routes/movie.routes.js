const express = require('express')
const Movie = require('../models/movie.model');
require('dotenv').config();

const router = express.Router();


//* Devuelve todas las peliculas
router.get('/', async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);
    }
});

//* Devuelve las peliculas buscando por su ID
router.get('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const movieToFind = await Movie.findById(id);
        return res.status(200).json(movieToFind);
    } catch (error) {
        return next(error);
    }
});

//* Devuelve las peliculas buscando por el titulo
router.get('/title/:title', async (req, res, next) => {
    try {
        const title = req.params.title;
        const movieToFind = await Movie.find({title: title});
        return res.status(200).json(movieToFind);
    } catch (error) {
        return next(error);
    }
});

//* Devuelve segun el genero
router.get('/genre/:genre', async (req, res, next) => {
    try {
        const genre = req.params.genre;
        const movieToFind = await Movie.find({genre: genre});
        return res.status(200).json(movieToFind);
    } catch (error) {
        return next(error);
    }
});

//* Devuelve las peliculas mayores al año que tu le indiques
router.get('/year/:year', async (req, res, next) => {
    try {
        const year = req.params.year;
        const movieToFind = await Movie.find({year: {$gt: year}});
        return res.status(200).json(movieToFind);
    } catch (error) {
        return next(error);
    }
});

//* POST PUT DELETE 

router.post('/create', async (req, res, next) => {
    try {
        const movie = req.body;
        const newMovie = new Movie(movie);
        const created = await newMovie.save();
        return res.status(201).json({message: 'Se ha creado correctamente', created});
    } catch (error) {
        return next(error)
    }
});

router.put('/edit:/id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = req.body;
        const movieModify = new Movie(movie);
        movieModify._id = id;
        const movieUpdated = await Movie.findByIdAndUpdate(id, movieModify);
        return res.status(201).json({message: 'Editado correctamente', movieUpdated});
    } catch (error) {
        return next(error);
    }
});

router.delete('/delete:/id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const movieToDelete = await Movie.findByIdAndDelete(id);
      return res.status(201).json({message: 'Eliminado correctamente', movieToDelete});  
    } catch (error) {
        return next(error)
    }
});

module.exports = router;