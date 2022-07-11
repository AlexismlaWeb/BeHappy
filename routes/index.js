const { response } = require("express");
var express = require("express");
var router = express.Router();

var request = require("sync-request");
const { listenerCount } = require("../models/users");
const { Client } = require("podcast-api");

// SEARCH A FILM //
router.post("/searchFilm", function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);

  var data = request(
    "GET",
    `https://api.themoviedb.org/3/search/movie?api_key=b3b092670c7516d9cd1ef6866ace306d&language=en-US&query=${encodedQuery}&page=1&include_adult=false`
  );
  var dataParse = JSON.parse(data.body);

  let moviesList = [];
  for (let element of dataParse.results) {
    moviesList.push(element.original_title);
  }
  console.log("moviesList, ", moviesList);
  res.json(moviesList);
});

// SEARCH A SERIES //
router.post("/searchSerie", function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);

  var data = request(
    "GET",
    `https://api.themoviedb.org/3/search/tv?api_key=b3b092670c7516d9cd1ef6866ace306d&language=en-US&page=1&query=${encodedQuery}&include_adult=false`
  );
  var dataParse = JSON.parse(data.body);

  let seriesList = [];
  for (let element of dataParse.results) {
    seriesList.push(element.original_name);
  }
  console.log("seriesList, ", seriesList);
  res.json(seriesList);
});

// SEARCH A BOOK //
router.post("/searchBook", function (req, res, next) {
  let APIkey = "AIzaSyDHHhDC57Jk0lZABqbjA0mvuH3NnC0zyUg";
  let encodedQuery = encodeURI(req.body.queryFromFront);

  var data = request(
    "GET",
    `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${APIkey}`
  );

  var dataParse = JSON.parse(data.body);

  let booksList = [];
  for (let element of dataParse.items) {
    booksList.push(element.volumeInfo.title);
  }
  console.log("booksList, ", booksList);
  res.json(booksList);
});

// SEARCH A PODCAST //
router.post("/searchPodcast", function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);

  const client = Client({ apiKey: "5ab7d2dd84224806a056cfe9a777dd7c" });

  let podcastsList = [];

  client
    .search({
      q: encodedQuery,
      sort_by_date: 0,
      type: "podcast",
      language: "French",
      safe_mode: 0,
    })
    .then((response) => {
      for (let element of response.data.results) {
        podcastsList.push(element.title_original);
      }
      console.log("dans client =>", podcastsList);
    })
    .catch((error) => {
      console.log("error", error);
    });

  console.log("après client =>", podcastsList);

  res.json(podcastsList);
});

// SEARCH A PODCAST (2) //
// router.post("/searchPodcast", function (req, res, next) {
//   let encodedQuery = encodeURI(req.body.queryFromFront);

//   var data = request(
//     "GET",
//     `https://listen-api.listennotes.com/api/v2/search?q=${encodedQuery}&type=episode&key=5ab7d2dd84224806a056cfe9a777dd7c`
//   );

//   console.log("data => ", data);
//   res.json(data);
// });

module.exports = router;
