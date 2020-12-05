const APIURL = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getUser("rocco-de-luca");

async function getUser(userName) {
     const resp = await fetch(APIURL + userName);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(userName);
    
}

async function getRepos(userName){
    const resp = await fetch(APIURL + userName + '/repos');
    const respData = await resp.json();
    addReposToCard(respData);
}


function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
         <div class="img-container">
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}"
         </div>
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li>${user.followers}<strong>Followers</strong> </li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repository</strong></li>
            </ul>
            <h4>Repository:</h4>
            <div id="repos"></div>
        </div>
    </div>
    
    `;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});


