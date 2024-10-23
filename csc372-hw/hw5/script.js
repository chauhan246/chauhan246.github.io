const githubGallery = id('github-gallery');
const githubSearchBtn = id('github-search-btn');
const githubUsernameInput = id('github-username');

// My username as default
const defaultGithubUsername = 'chauhan246';

// Fetch repositories for a given username
async function fetchGitRepos(githubUsername) {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    if (response.status == 403) {
        throw new Error('API limit reached for repos');
    } else if (!response.ok) {
        throw new Error('User not found or could not fetch repos');
    }
    return await response.json();
}

// Fetch commits for a given repository
async function fetchGitCommits(githubUsername, repoName) {
    const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/commits`);
    if (response.status == 403) {
        throw new Error('API limit reached for commits');
    } else if (!response.ok) {
        throw new Error('Could not fetch commits');
    }
    return await response.json();
}

// Display repositories in the gallery
async function displayRepos(githubRepositories, githubUsername) {
    githubGallery.innerHTML = '';

    for (const gitRepos of githubRepositories) {
        let commitCounts = '';

        // Check if the repository has any content
        if (gitRepos.size > 0) {
            const commitCountData = await fetchGitCommits(githubUsername, gitRepos.name);
            // Get the commit count
            commitCounts = commitCountData.length;
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3><i class="fab fa-github"></i> ${gitRepos.name}</h3>
            <section><label>Description:</label> ${gitRepos.description || 'No description'}</section>
            <section><label>Created:</label> ${new Date(gitRepos.created_at).toLocaleDateString()}</section>
            <section><label>Updated:</label> ${new Date(gitRepos.updated_at).toLocaleDateString()}</section>
            <section><label>Commits:</label> ${commitCounts || 'No commits'}</section>
            <section><label>Languages:</label> ${gitRepos.language || 'N/A'}</section>
           <section><label>Watchers:</label> ${gitRepos.watchers}</section>
            <a href="${gitRepos.html_url}" class="btn">View on GitHub <i class="fab fa-github"></i></a>
        `;
        githubGallery.appendChild(card);
    }
}

// Handle search button click
githubSearchBtn.addEventListener('click', searchBtn);

// Search with new username
async function searchBtn() {
    const githubUsername = githubUsernameInput.value.trim() || defaultGithubUsername;
    try {
        const githubRepositories = await fetchGitRepos(githubUsername);
        await displayRepos(githubRepositories, githubUsername);
    } catch (error) {
        alert(error.message);
    }
}

// Initial load
async function initialLoad() {
    try {
        const githubRepositories = await fetchGitRepos(defaultGithubUsername);
        await displayRepos(githubRepositories, defaultGithubUsername);
    } catch (error) {
        alert(error.message);
    }
}

// Function will be called on first page load
initialLoad();

/*
* Handy Shortcut Functions
*/

function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}
