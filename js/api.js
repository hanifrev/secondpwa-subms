// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

const apiKey = "c324a93dadd041058d92d4fcac1dd530";
const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

const ENDPOINT_TEAMS =
  "https://api.football-data.org/v2/competitions/2016/teams";
const ENDPOINT_STAND =
  "https://api.football-data.org/v2/competitions/2016/standings?standingType=TOTAL";
function showStanding() {
  if ("caches" in window) {
    caches.match(ENDPOINT_STAND).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          const klasemen = data.standings[0].table;
          let thehtml = "";
          const standTable = document.getElementById("standtable");
          // console.log(klasemen);

          klasemen.forEach(function (theTable) {
            standTable.innerHTML += `
               
                <tr>
                    <td>${theTable.position}</td>
                    <td>${theTable.team.name}</td>
                    <td>${theTable.playedGames}</td>
                    <td>${theTable.won}</td>
                    <td>${theTable.draw}</td>
                    <td>${theTable.lost}</td>
                    <td>${theTable.goalDifference}</td>
                   <td>${theTable.points}</td>
                </tr>
                      
          `;
          });

          // document.getElementById("standtable").innerHTML = thehtml;
        });
      }
    });
  }

  fetchAPI(ENDPOINT_STAND)
    // .then(status)
    // .then(json)
    .then(function (data) {
      const klasemen = data.standings[0].table;
      let thehtml = "";
      const standTable = document.getElementById("standtable");
      // console.log(klasemen);

      klasemen.forEach(function (theTable) {
        standTable.innerHTML += `
        
            <tr>
                <td>${theTable.position}</td>
                <td>${theTable.team.name}</td>
                <td>${theTable.playedGames}</td>
                <td>${theTable.won}</td>
                <td>${theTable.draw}</td>
                <td>${theTable.lost}</td>
                <td>${theTable.goalDifference}</td>
                <td>${theTable.points}</td>
             </tr>
           
        
         `;
      });

      // document.getElementById("standtable").innerHTML = thehtml;
    })
    .catch(error);
}
/////////////
function clubInfo() {
  if ("caches" in window) {
    caches.match(ENDPOINT_TEAMS).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          const info = data.teams;
          let thehtml = "";
          const clubCard = document.getElementById("team-info");
          // console.log(klasemen);

          info.forEach(function (clubs) {
            const clubLogo = clubs.crestUrl.replace(/^http:\/\//i, "https://");
            clubCard.innerHTML += `
          
            
              <div class="col s12 m7">
                
                <div class="card horizontal">
                  <div class="card-image">
                    <img src="${clubLogo}">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                    <span class="card-title"><p>${clubs.name}</p></span>
                      <p>Vanue: ${clubs.venue}</p>
                      <P><a href=${clubs.website} target="_blank">${clubs.website}</a></p>
                    </div>
                    <div class="card-action">
                      <a href="#">MORE INFO</a>
                    </div>
                  </div>
                </div>
              </div>

          `;
          });

          // document.getElementById("standtable").innerHTML = thehtml;
        });
      }
    });
  }
  fetchAPI(ENDPOINT_TEAMS)
    // .then(status)
    // .then(json)
    .then(function (data) {
      const info = data.teams;
      let thehtml = "";
      const clubCard = document.getElementById("team-info");
      // console.log(klasemen);

      info.forEach(function (clubs) {
        const clubLogo = clubs.crestUrl.replace(/^http:\/\//i, "https://");
        clubCard.innerHTML += `
        <div class="col s12 m7">
        
        <div class="card horizontal">
          <div class="card-image">
            <img src="${clubLogo}">
          </div>
          <div class="card-stacked">
            <div class="card-content">
            <span class="card-title"><p>${clubs.name}</p></span>
                <p>Vanue: ${clubs.venue}</p>
                <p><a href=${clubs.website} target="_blank">${clubs.website}</a></p>
            </div>
            <div class="card-action">
              <a href="#">MORE INFO</a>
            </div>
          </div>
        </div>
      </div>
         `;
      });

      // document.getElementById("standtable").innerHTML = thehtml;
    })
    .catch(error);
}

function getArticleById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "article/" + idParam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
        });
      }
    });
  }

  fetch(base_url + "article/" + idParam)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.result.cover}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.result.post_title}</span>
              ${snarkdown(data.result.post_content)}
            </div>
          </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}

function getSavedArticles() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {
      var description = article.post_content.substring(0, 100);
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.ID}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.cover}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}
