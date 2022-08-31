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
  let savedReco = {};
  let savedUser = {};
  console.log("tokenFromFront =>", req.body.tokenFromFront);
  let user = await userModel.findOne({
    token: req.body.tokenFromFront,
  });

  if (req.body.alreadyInDBFromFront == "true") {
    // "true" en string car via postman, il faudra sûrement changer en boolean quand la route sera vraiment appelée par le front
    user.recoList.push(req.body.recoIdFromFront);
    savedUser = await user.save();

    let reco = await recoModel.findOne({
      _id: req.body.recoIdFromFront,
    });
    reco.usersList.push(user.id);
    savedReco = await reco.save();
  } else if (req.body.alreadyInDBFromFront == "false") {
    let newReco = new recoModel({
      category: req.body.categoryFromFront,
      title: req.body.titleFromFront,
      imageUrl: req.body.imageUrlFromFront,
      APIid: req.body.APIidFromFront,
      usersList: [user.id],
    });
    savedReco = await newReco.save();

    user.recoList.push(savedReco.id);
    savedUser = await user.save();
  }

  if (savedUser && savedReco) {
    result = true;
  }

  res.json({ result, savedReco, savedUser });
});

// DELETE RECO
router.delete(
  "/deleteReco/:tokenFromFront/:recoIdFromFront",
  async function (req, res, next) {
    let result = false;
    let savedReco = {};

    let user = await userModel.findOne({
      token: req.params.tokenFromFront,
    });

    let reco = await recoModel.findOne({
      _id: req.params.recoIdFromFront,
    });

    user.recoList = user.recoList.filter((e) => e != reco.id);
    savedUser = await user.save();

    if (reco.usersList.length > 1) {
      reco.usersList = reco.usersList.filter((e) => e != user.id);
      savedReco = await reco.save();
      if (savedUser && savedReco) {
        result = true;
      }
    } else if (reco.usersList.length === 1) {
      let deletedReco = await recoModel.deleteOne({ _id: reco.id });
      if (savedUser && deletedReco) {
        result = true;
      }
    }

    res.json({ result, savedUser, savedReco });
  }
);

// SEARCH FILM
router.post("/searchFilm", async function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);
  let user = await userModel
    .findOne({ token: req.body.tokenFromFront })
    .populate({
      path: "recoList",
      populate: {
        path: "_id",
      },
    });

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
      let alreadyLiked = false;
      for (element of user.recoList) {
        if (element.id === data.id) {
          alreadyLiked = true;
        }
      }
      moviesList.push({
        category: "Movie",
        title: data.title,
        APIid: data.APIid,
        alreadyInDB: true,
        id: data.id,
        alreadyLiked: alreadyLiked,
        followers: data.usersList.length,
        imageUrl: data.imageUrl,
      });
    } else {
      moviesList.push({
        category: "Movie",
        title: element.original_title,
        APIid: element.id.toString(),
        alreadyInDB: false,
        id: null,
        alreadyLiked: false,
        followers: 0,
        imageUrl: `https://image.tmdb.org/t/p/w185${element.poster_path}`,
      });
    }
  }

  res.json(moviesList);
});

// SEARCH SERIE
router.post("/searchSerie", async function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);
  let user = await userModel
    .findOne({ token: req.body.tokenFromFront })
    .populate({
      path: "recoList",
      populate: {
        path: "_id",
      },
    });

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
      let alreadyLiked = false;
      for (element of user.recoList) {
        if (element.id === data.id) {
          alreadyLiked = true;
        }
      }
      seriesList.push({
        category: "Serie",
        title: data.title,
        APIid: data.APIid,
        alreadyInDB: true,
        id: data.id,
        alreadyLiked: alreadyLiked,
        followers: data.usersList.length,
        imageUrl: data.imageUrl,
      });
    } else {
      seriesList.push({
        category: "Serie",
        title: element.original_name,
        APIid: element.id.toString(),
        alreadyInDB: false,
        id: null,
        alreadyLiked: false,
        followers: 0,
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
  let user = await userModel
    .findOne({ token: req.body.tokenFromFront })
    .populate({
      path: "recoList",
      populate: {
        path: "_id",
      },
    });

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
      let alreadyLiked = false;
      for (element of user.recoList) {
        if (element.id === data.id) {
          alreadyLiked = true;
        }
      }
      booksList.push({
        category: "Book",
        title: data.title,
        APIid: data.APIid,
        alreadyInDB: true,
        id: data.id,
        alreadyLiked: alreadyLiked,
        followers: data.usersList.length,
        imageUrl: data.imageUrl,
      });
    } else {
      booksList.push({
        category: "Book",
        title: element.volumeInfo.title,
        APIid: element.id,
        alreadyInDB: false,
        id: null,
        alreadyLiked: false,
        followers: 0,
        imageUrl: `../bookimage${index}.png`,
      });
    }
  }

  res.json(booksList);
});

// SEARCH A PODCAST //
router.post("/searchPodcast", async function (req, res, next) {
  let encodedQuery = encodeURI(req.body.queryFromFront);
  let user = await userModel
    .findOne({ token: req.body.tokenFromFront })
    .populate({
      path: "recoList",
      populate: {
        path: "_id",
      },
    });

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
          category: "Podcast",
          title: element.title_original,
          APIid: element.id,
          alreadyInDB: false,
          id: null,
          followers: 0,
          alreadyLiked: false,
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
      for (reco of user.recoList) {
        if (reco.id === data.id) {
          element.alreadyLiked = true;
        }
      }
      element.id = data.id;
      element.followers = data.usersList.length;
    }
  }

  res.json(podcastsList);
});

//GET  ALL USER //
router.get("/getAllUsers", async function (req, res, next) {
  let users = await userModel.find({});
  res.json(users);
});

module.exports = router;
