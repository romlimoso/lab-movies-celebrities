const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")


router.get("/movies/create", (req,res,next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
    res.render("movies/new-movie", {celebrities: celebritiesFromDB})
    })
    .catch(err => res.render("/movies"))
})

router.post("/movies/create", (req,res,next) => {
    console.log(req.body)
    const { title, genre, plot, cast} = req.body

    Movie.create({ title, genre, plot, cast})
        .then(createdMovie => {
            res.redirect("/movies")
        })
        .catch(
            err => res.render("movies/new-movie")
        )
})


router.get("/movies", (req,res,next) =>{
    Movie.find()
    .then(moviesFromDB => {
    res.render("movies/movies", {movies: moviesFromDB})
    })
    .catch(err => next())
})


module.exports = router;
