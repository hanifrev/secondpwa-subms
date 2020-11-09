// var dbPromise = idb.open("mydatabase", 1, function (upgradeDb) {
//   if (!upgradeDb.objectStoreNames.contains("events")) {
//     upgradeDb.createObjectStore("events");
//   }
// });

var dbPromised = idb.open("efl-portal", 2, (upgradedDb) => {
  var teamSaved = upgradedDb.createObjectStore("favTeam", {
    keyPath: "id",
  });
  teamSaved.createIndex("name", "name", {
    unique: false,
  });
});

function saveFavTeam(team) {
  dbPromised
    .then((db) => {
      var tx = db.transaction("favTeam", "readwrite");
      var store = tx.objectStore("favTeam");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      alert("Saved on Favorite Team");
      // alert(`Saved on Favorite Team,
      // to remove click remove button`);
    })
    .catch(() => {
      alert("This teams already saved");
    });
}

function manok() {
  console.log("manok");
}

function getAllSaved() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("favTeam", "readonly");
        var store = tx.objectStore("favTeam");
        return store.getAll();
      })
      .then((favTeam) => {
        resolve(favTeam);
      });
    // .catch(() => {
    //   reject;
    // });
  });
}

function getAllSavedById(idParam) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("favTeam", "readonly");
        var store = tx.objectStore("favTeam");
        return store.get(idParam);
      })
      .then((data) => {
        resolve(data);
      });
  });
}

function deleteTeam(id) {
  dbPromised
    .then((db) => {
      var tx = db.transaction("favTeam", "readwrite");
      tx.objectStore("favTeam").delete(id);
      return tx.complete;
    })
    .then(() => {
      alert("Team deleted");
    });
}
