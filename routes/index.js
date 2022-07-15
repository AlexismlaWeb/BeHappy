const { response } = require("express");
var express = require("express");
var router = express.Router();

var request = require("sync-request");
const { listenerCount } = require("../models/users");
const { Client } = require("podcast-api");

var recoModel = require("../models/recommendations");
var userModel = require("../models/users");

// Get all recommendations
router.get("/getAllRecommendations", async function (req, res) {
  var allRecommendations = await recoModel.find();
  res.json(allRecommendations);
});

// Get User Info By Token

router.get("/getUserInfoByToken/:tokenFromFront", async function (req, res) {
  var token = req.params.tokenFromFront;
  var userInfo = await userModel.findOne({ token: token }).populate({
    path: "recoList",
    populate: {
      path: "_id",
    },
  });
  res.json({ user: userInfo });
});

// ADD RECO
router.post("/addReco", async function (req, res, next) {
  let result = false;

  let newReco = new recoModel({
    category: req.body.categoryFromFront,
    title: req.body.titleFromFront,
    imageUrl: req.body.linkFromFront,
    APIid: req.body.APIidFromFront,
    usersList: [req.body.tokenFromFront],
  });
  let saveReco = await newReco.save();

  let user = await userModel.findOne({
    token: req.body.tokenFromFront,
  });
  user.recoList.push(saveReco.id);
  let saveUser = await user.save();

  if (saveUser && saveReco) {
    result = true;
  }

  res.json({ result, saveReco, saveUser });
});

// SEARCH FILM
router.post("/searchFilm", async function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);

  // SEARCH IN THE API
  var data = request(
    "GET",
    `https://api.themoviedb.org/3/search/movie?api_key=b3b092670c7516d9cd1ef6866ace306d&language=en-US&query=${encodedQuery}&page=1&include_adult=false`
  );
  var dataParse = JSON.parse(data.body);

  // SEARCH IN DB WITH APIID + CREATION OF THE RESULTSLIST
  let moviesList = [];
  for (let element of dataParse.results) {
    const data = await recoModel.findOne({
      APIid: element.id,
    });
    if (data) {
      moviesList.push({
        title: data.title,
        alreadyInDB: true,
        APIid: data.APIid,
        imageUrl: data.imageUrl,
        id: data.id,
      });
    } else {
      let APIid = element.id;
      moviesList.push({
        title: element.original_title,
        alreadyInDB: false,
        APIid: APIid.toString(),
        imageUrl: `https://image.tmdb.org/t/p/w185${element.poster_path}`,
      });
    }
  }

  res.json(moviesList);
});

// SEARCH SERIE
router.post("/searchSerie", async function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);

  // SEARCH IN THE API
  var data = request(
    "GET",
    `https://api.themoviedb.org/3/search/tv?api_key=b3b092670c7516d9cd1ef6866ace306d&language=en-US&page=1&query=${encodedQuery}&include_adult=false`
  );
  var dataParse = JSON.parse(data.body);

  // SEARCH IN DB WITH APIID + CREATION OF THE RESULTSLIST
  let seriesList = [];
  for (let element of dataParse.results) {
    const data = await recoModel.findOne({
      APIid: element.id,
    });
    if (data) {
      seriesList.push({
        title: data.title,
        alreadyInDB: true,
        APIid: data.APIid,
        imageUrl: data.imageUrl,
        id: data.id,
      });
    } else {
      let APIid = element.id;
      seriesList.push({
        title: element.original_name,
        alreadyInDB: false,
        APIid: APIid.toString(),
        imageUrl: `https://image.tmdb.org/t/p/w185${element.poster_path}`,
      });
    }
  }

  res.json(seriesList);
});

// SEARCH BOOK //
router.post("/searchBook", async function (req, res, next) {
  let APIkey = "AIzaSyDHHhDC57Jk0lZABqbjA0mvuH3NnC0zyUg";
  let encodedQuery = encodeURI(req.body.queryFromFront);

  // SEARCH IN THE API
  var data = request(
    "GET",
    `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${APIkey}`
  );
  var dataParse = JSON.parse(data.body);

  // SEARCH IN DB WITH APIID + CREATION OF THE RESULTSLIST
  let booksList = [];

  for (let element of dataParse.items) {
    let index = Math.floor(Math.random() * 3);

    const data = await recoModel.findOne({
      APIid: element.id,
    });
    if (data) {
      booksList.push({
        title: data.title,
        alreadyInDB: true,
        APIid: data.APIid,
        imageUrl: data.imageUrl,
        id: data.id,
      });
    } else {
      booksList.push({
        title: element.volumeInfo.title,
        alreadyInDB: false,
        APIid: element.id,
        imageUrl: `../bookimage${index}.png`,
      });
    }
  }

  res.json(booksList);
});

// SEARCH A PODCAST //
router.post("/searchPodcast", async function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);

  // SEARCH IN THE API
  const client = Client({ apiKey: "5ab7d2dd84224806a056cfe9a777dd7c" });
  let podcastsList = [];

  await client
    .search({
      q: encodedQuery,
      sort_by_date: 0,
      type: "podcast",
      language: "French",
      safe_mode: 0,
    })
    .then((response) => {
      for (let element of response.data.results) {
        podcastsList.push({
          title: element.title_original,
          APIid: element.id,
          alreadyInDB: false,
          imageUrl: element.image,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });

  // SEARCH IN DB WITH APIID + CREATION OF THE RESULTSLIST
  for (element of podcastsList) {
    let data = await recoModel.findOne({
      APIid: element.APIid,
    });
    if (data) {
      element.alreadyInDB = true;
      element.id = data.id;
    }
  }

  res.json(podcastsList);
});

module.exports = router;
