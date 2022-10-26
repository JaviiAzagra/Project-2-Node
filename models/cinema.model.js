const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cinemaSchema = new Schema(
    {
        name: {type: String, required: true},
        location: {type: String, required: true},
        movies: [{ type: mongoose.Types.ObjectId, ref: 'movies' }],
    },
    {
        timestamps: true,
    },
    
);

//* Creamos la coleccion llamada cinemas
const Cinema = mongoose.model('cinemas', cinemaSchema);

module.exports = Cinema;