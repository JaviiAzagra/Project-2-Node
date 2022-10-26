const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        title: {type: String, require: true},
        director: {type: String, require: true},
        year: {type: Number, require: true},
        genre: {type: String, require: true},
    },
    {
        timestamps: true,
    },
);

//* Creamos la coleccion llamada movies
const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;