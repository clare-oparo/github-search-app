document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('searchInput').value;
    searchGitHubUser(username);
});

function searchGitHubUser(username) {
    fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
}

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

function displayRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(repos => updatePageWithRepos(username, repos))
    .catch(error => console.error('Error:', error));
}

function updatePageWithRepos(username, repos) {
    const results = document.getElementById('results');
    results.innerHTML = `<h2>${username}'s Repositories</h2>`;
    const list = document.createElement('ul');

    repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        list.appendChild(listItem);
    });

    results.appendChild(list);
}
