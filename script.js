let repoInput = document.querySelector(".get-repo input");
let repoBtn = document.querySelector("button");
let repoData = document.querySelector(".show-data");


repoBtn.onclick = getRepo;

function getRepo()
{
    if(repoInput.value ===""){
        repoData.innerHTML = "<span>Please write GitHup UserName</span>";
    }
    else{
        repoData.innerHTML = "";
        fetch(`https://api.github.com/users/${repoInput.value}/repos`)
        .then((response)=>{
            if(!response.ok)
            {
                repoData.innerHTML = "<span>User not found!</span>";
                return;
            }
            return response.json();
        })
        .then((repos)=>{
            if(!repos) return;
            repos.forEach(repo => {
                let maindiv = document.createElement("div");
                maindiv.textContent = repo.name;
                maindiv.classList.add("repo-card");

                let theUrl = document.createElement('a');
                theUrl.textContent = "Visit";
                theUrl.href = `https://github.com/${repoInput.value}/${repo.name}`;
                theUrl.setAttribute("target","_blank");
                maindiv.appendChild(theUrl);

                let size = document.createElement("p");
                size.innerHTML = `size: ${repo.size}`;
                maindiv.appendChild(size);

                let star = document.createElement("p");
                star.innerHTML = `Stars: ${repo.stargazers_count}`;
                maindiv.appendChild(star);

                let watchers = document.createElement("p");
                watchers.innerHTML = `watchers: ${repo.watchers_count}`;
                maindiv.appendChild(watchers);

                let language = document.createElement("p");
                language.innerHTML = `language: ${repo.language}`;
                maindiv.appendChild(language);

                repoData.appendChild(maindiv);
            });
        })
    }
}