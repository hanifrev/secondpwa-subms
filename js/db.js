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
      console.log("Artikel berhasil di simpan.");
      // alert(`Saved on Favorite Team,
      // to remove click remove button`);
    })
    .catch(() => {
      console.log("This teams already saved");
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

function getAllSavedById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("favTeam", "readonly");
        var store = tx.objectStore("favTeam");
        return store.get(id);
      })
      .then((data) => {
        resolve(data);
      });
  });
}

// function displaySaved() {
//   getAll.then(function (favTeam) {
//     console.log(favTeam);
//     var savedHTML = "";
//     favTeam.forEach(function (showSave) {
//       savedHTML = `
//         <div class="card">
//           <p>${showSave}</p>
//         </div>
//       `;
//     });
//     document.getElementById("savedTeams").innerHTML = savedHTML;
//   });
// }
