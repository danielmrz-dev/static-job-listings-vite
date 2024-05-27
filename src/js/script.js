import axios from "axios";

const filter = document.querySelector(".header__filter");
const filterContainer = document.querySelector(".header__filter-items-container");
const jobListContainer = document.querySelector(".job-list");
const clearFilterBtn = document.querySelector("[data-clear]");

const API = "data.json";

console.log(API);

let jobs = [];

async function getAndShowJobs() {
    try {
        const res = await axios.get(API);
        jobs = await res.data;
        showJobs(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
}

getAndShowJobs();

async function showJobs(listOfJobs) {
    listOfJobs.forEach((job) => {
        jobListContainer.innerHTML += `
        <li class="job-list__item ${job.featured ? "border-left" : ""}">        
            <img src="${job.logo}" alt="" class="job-list__item-logo">

            <div class="job-list__infos">

            <div class="job-list__item-company-container">
            <strong class="job-list__item-company">${job.company}</strong>
            ${job.new ? "<span class='job-list__item-new'>New!</span>" : ""}
                    ${job.featured ? "<span class='job-list__item-featured'>Featured</span>" : ""}          
                </div>

                <h2 class="job-list__item-position">${job.position}</h2>

                <div class="job-list__item-info-container">
                    <span class="job-list__item-info">${job.postedAt}</span>
                    <span class="job-list__item-info">${job.contract}</span>
                    <span class="job-list__item-info">${job.location}</span>
                </div>
            </div>
            <hr>

            <div class="job-list__tags">                
                <button class="job-list__tag">${job.role}</button>            
                <button class="job-list__tag">${job.level}</button>            
                ${job.languages.map((language) =>`<button class="job-list__tag">${language}</button>`).join("")}            
                ${job.tools.map((tool) => `<button class="job-list__tag">${tool}</button>`).join("")}
            </div>

            </li>
            `;
        });
}

let tagList = [];
let filteredJobs = [];
    
function showFilteredJobs() {
    jobListContainer.innerHTML = "";
    filteredJobs = jobs.filter(job => {
        const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
        return tagList.every(tag => jobTags.includes(tag));
    });
    showJobs(filteredJobs);
}


document.addEventListener("click", (e) => {
    if (e.target.matches(".job-list__tag")) {
        filter.style.display = "grid";
        const tagName = e.target.innerText;
        if (!tagList.includes(tagName)) {
            tagList.push(tagName);
            addTagFilter();
            showFilteredJobs();
        }
    }

    if (e.target.matches(".header__filter-item-X")) {
        const btnTagText = e.target.closest(".header__filter-items").querySelector(".header__filter-item").innerText;
        const index = tagList.indexOf(btnTagText);
        if (index !== -1) {
            tagList.splice(index, 1)
            addTagFilter();
            showFilteredJobs();
        }
    }
});

function addTagFilter() {
    filterContainer.innerHTML = "";
    tagList.forEach((tag) => {
        filterContainer.innerHTML += `
        <li class="header__filter-items">
            <span class="header__filter-item">${tag}</span>
            <button class="">
                <img src="images/icon-remove.svg" alt="" class="header__filter-item-X">
            </button>
        </li>
        `;
    });
}

function clearFilter() {
    tagList = [];
    filterContainer.innerHTML = '';
    filter.style.display = "none";
    jobListContainer.innerHTML = '';
    showJobs(jobs);
}

clearFilterBtn.addEventListener("click", clearFilter);