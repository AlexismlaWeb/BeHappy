var express = require("express");
var router = express.Router();

var request = require("sync-request");
const { listenerCount } = require("../models/users");

// SEARCH A MOVIE //
router.post("/searchMovie", function (req, res, next) {
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
  res.json(dataParse);
});

// SEARCH A SERIES //
router.post("/searchSeries", function (req, res, next) {
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
  res.json(dataParse);
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
  console.log("dataParse =>", dataParse);

  console.log("dataParse =>", dataParse);

  let booksList = [];
  for (let element of dataParse.items) {
    booksList.push(element.volumeInfo.title);
  }
  console.log("booksList, ", booksList);
  res.json(dataParse);
});

// SEARCH A PODCAST //
// router.post("/searchPodcast", function (req, res, next) {
//   let APIkey = "AIzaSyDHHhDC57Jk0lZABqbjA0mvuH3NnC0zyUg";
//   let encodedQuery = encodeURI(req.body.queryFromFront);

//   var data = request(
//     "GET",
//     `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${APIkey}`
//   );

//   var dataParse = JSON.parse(data.body);

//   let podcastsList = [];
//   for (let element of dataParse.items) {
//     podcastsList.push(element.volumeInfo.title);
//   }
//   console.log("podcastsList, ", podcastsList);
//   res.json(dataParse);
// });

module.exports = router;
