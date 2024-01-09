//capture form submission

document.getElementById("search").addEventListener("submit", function(event){
    event.preventDefault(); //prevent default action
    const username = getElementById("searchInput").value; //get the input value
    searchGitHub(username);
})

//call GitHub API

function searchGitHub(username){
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
}

//show user results
function displayUsers(users) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user';

        userElement.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            <p class="username">${user.login}</p>
            <a href="${user.html_url}" target="_blank" class="profile-link">View Profile</a>
        `;

        userElement.addEventListener('click', () => displayRepositories(user.login));
        results.appendChild(userElement);
    });
}


//when a user is clicked, fetch and display their repositories

function displayRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            const results = document.getElementById('results');
            results.innerHTML = `<h2>${username}'s Repositories</h2>`;

        });
}
