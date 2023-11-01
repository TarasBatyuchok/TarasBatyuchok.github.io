// TODO
import {startLoader, stopLoader} from "./helpers.js";
import FetchWrapper from "./fetch-wrapper.js";

const GithubAPI  = new FetchWrapper("https://api.github.com/");

const form = document.querySelector("#repos-form");
const username = document.querySelector("#github-username");
const button = document.querySelector("#get-repos");
const list = document.querySelector("#repos-list");

form.addEventListener("submit", event => {
    event.preventDefault();

    startLoader(button);
    GithubAPI.get(`users/${username.value}/repos`)
    .then(data => {
        list.innerHTML = "";
        data.forEach(repo => {
            console.log(repo)
                list.insertAdjacentHTML("beforeend", `<li>
                <a href="${repo.html_url}" target="_blank">
                    <h2>${repo.full_name}</h2>
                    <p>${repo.description}</p>
                </a>
            </li>`);
        });
    })
    .finally(() => {
        stopLoader(button, "Get repos");
    });
});