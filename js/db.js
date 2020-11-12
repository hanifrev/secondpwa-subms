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
      store.put(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: "Saved on Favorite Team" });
    })
    .catch(() => {
      M.toast({ html: "This teams already saved" });
    });
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
      M.toast({ html: "Team deleted" });
    });
}
