// import idb from "idb";

// await idb.open(…);

const dbPromised = idb.open("news-reader", 1, (upgradedDb) => {
  const articlesObjectStore = upgradedDb.createObjectStore("articles", {
    keyPath: "ID",
  });
  articlesObjectStore.createIndex("post_title", "post_title", {
    unique: false,
  });
});

function saveForLater(article) {
  dbPromised
    .then((db) => {
      let tx = db.transaction("articles", "readwrite");
      let store = tx.objectStore("articles");
      console.log(article);
      store.add(article.result);
      return tx.complete;
    })
    .then(() => {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then((articles) => {
        resolve(articles);
      });
  });
}
