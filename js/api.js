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
const ENDPOINT_CLUBS = "http://api.football-data.org/v2/teams/";
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
                      <p>${clubs.venue}</p>
                      <P><a href=${clubs.website} target="_blank">${clubs.website}</a></p>
                    </div>
                    <div class="card-action">
                      <a href="./article.html?id=${clubs.id}">MORE INFO</a>
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
                <p>${clubs.venue}</p>
                <p><a href=${clubs.website} target="_blank">${clubs.website}</a></p>
            </div>
            <div class="card-action">
              <a href="./article.html?id=${clubs.id}">MORE INFO</a>
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
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(ENDPOINT_TEAMS + "article/" + idParam)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              const info = data;
              var articleHTML = "";
              var midArtic = "";
              var showPlayer = "";
              // const matchresult = ENDPOINT_CLUBS + idParam + "/" + "matches";

              // fetchAPI(matchresult).then(function (resultmat) {
              //   console.log(resultmat.count);
              // });
              const clubLogo = info.crestUrl.replace(/^http:\/\//i, "https://");
              articleHTML += `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${clubLogo}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${info.name}</span>
                    <p>${info.address}</p>
                    <p>${info.phone}</p>
                    <p>${info.website}</p>
                    
                  </div>
                </div>
              `;
              midArtic += `
                <h5>${info.name}'s Squad</h5>
              `;

              const squadShow = info.squad;
              squadShow.forEach(function (players) {
                showPlayer += `
              <div>            
                  <p>${players.name}</p>
              </div>
              `;
              });

              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("body-content").innerHTML = articleHTML;
              document.getElementById("mid").innerHTML = midArtic;
              document.getElementById("show-player").innerHTML = showPlayer;
              resolve(data);
            });
          }
        });
    }

    fetchAPI(ENDPOINT_CLUBS + "/" + idParam)
      // .then(status)
      // .then(json)
      .then(function (data) {
        console.log(data);
        const info = data;
        var articleHTML = "";
        var midArtic = "";
        var showPlayer = "";
        // const matchresult = ENDPOINT_CLUBS + idParam + "/" + "matches";

        // fetchAPI(matchresult).then(function (resultmat) {
        //   console.log(resultmat.count);
        // });
        const clubLogo = info.crestUrl.replace(/^http:\/\//i, "https://");
        articleHTML += `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${clubLogo}" />
            </div>
            <div class="card-content">
              <span class="card-title">${info.name}</span>
              <p>${info.address}</p>
              <p>${info.phone}</p>
              <p>${info.website}</p>
              
            </div>
          </div>
        `;
        midArtic += `
        <h5>${info.name}'s Squad</h5>
      `;

        const squadShow = info.squad;
        squadShow.forEach(function (players) {
          showPlayer += `
        <div>
            
              <p>${players.name}</p>
              
            
        </div>
        `;
        });

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        document.getElementById("mid").innerHTML = midArtic;
        document.getElementById("show-player").innerHTML = showPlayer;
        resolve(data);
      });
  });
}

// function getSavedArticles() {
//   getAll().then(function (articles) {
//     console.log(articles);
//     // Menyusun komponen card artikel secara dinamis
//     var articlesHTML = "";
//     articles.forEach(function (article) {
//       var description = article.post_content.substring(0, 100);
//       articlesHTML += `
//                   <div class="card">
//                     <a href="./article.html?id=${article.ID}">
//                       <div class="card-image waves-effect waves-block waves-light">
//                         <img src="${article.cover}" />
//                       </div>
//                     </a>
//                     <div class="card-content">
//                       <span class="card-title truncate">${article.post_title}</span>
//                       <p>${description}</p>
//                     </div>
//                   </div>
//                 `;
//     });
//     // Sisipkan komponen card ke dalam elemen dengan id #body-content
//     document.getElementById("body-content").innerHTML = articlesHTML;
//   });
// }

function displaySaved() {
  // manok();
  getAllSaved().then(function (data) {
    console.log(data);
    var savedHTML = "";
    data.forEach(function (showSave) {
      savedHTML += `
      <div class="col s12 m7">
                
                <div class="card horizontal">
                  <div class="card-image">
                    <img src="${showSave.crestUrl}">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                    <span class="card-title"><p>${showSave.name}</p></span>
                      <p>${showSave.venue}</p>
                      <P><a href=${showSave.website} target="_blank">${showSave.website}</a></p>
                    </div>
                    <div class="card-action">
                      <a href="./article.html?id=${showSave.id}&saved=true">MORE INFO</a>
                    </div>
                  </div>
                </div>
      </div>
       `;
    });
    document.getElementById("savedTeams").innerHTML = savedHTML;
  });
}

function displaySavedById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  console.log(idParam);

  getAllSavedById(Number(idParam)).then((data) => {
    const info = data;
    var articleHTML = "";
    var midArtic = "";
    var showPlayer = "";

    const clubLogo = info.crestUrl.replace(/^http:\/\//i, "https://");
    articleHTML += `
     <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
            <img src="${clubLogo}" />
         </div>
        <div class="card-content">
             <span class="card-title">${info.name}</span>
            <p>${info.address}</p>
            <p>${info.phone}</p>
             <p>${info.website}</p>
                    
           </div>
         </div>
          `;
    midArtic += `
          <h5>${info.name}'s Squad</h5>
           `;

    const squadShow = info.squad;
    squadShow.forEach(function (players) {
      showPlayer += `
              <div>            
                  <p>${players.name}</p>
              </div>
              `;
    });
    document.getElementById("body-content").innerHTML = articleHTML;
    document.getElementById("mid").innerHTML = midArtic;
    document.getElementById("show-player").innerHTML = showPlayer;
    // resolve(data); dont put resolve here or u will get an error (serviceworken broken)
  });
}
