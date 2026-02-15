const form = document.getElementById("repoForm");
const repoInput = document.getElementById("repoInput");
const issuesDiv = document.getElementById("issuesDiv");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("pageInfo");

let allIssues = [];
let currentPage = 1;
const issuesPerPage = 10;

//<!-- Quick repo buttons --> 
  document.querySelectorAll(".quick-repos button").forEach(btn => {
  btn.addEventListener("click", () => {
    repoInput.value = btn.dataset.repo;
    form.dispatchEvent(new Event("submit"));
  });
});

//<!-- Fetch issues -->
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const repo = repoInput.value.trim();
  if (!repo) return;
  issuesDiv.innerHTML = "Loading issues...";
  pageInfo.innerText = "";

  try { 
    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues?state=open&labels=${encodeURIComponent("good first issue")}`
    );

    if (!res.ok) {
      throw new Error("Repository not found or API error");
    }
    
    const remaining = res.headers.get("X-RateLimit-Remaining");
    if(remaining === "0") {
      issuesDiv.innerHTML = "GitHub API rate limit reached. Try again after some time.";
      return;
    }

    const data = await res.json();
    allIssues = data.filter(issue => !issue.pull_request);
    if (allIssues.length === 0) {
      issuesDiv.innerHTML = "No beginner-friendly issues found.";
      return;
    }
    
    currentPage = 1;
    renderIssues();
    renderPagination();
  } catch (err) {
    issueDiv.innerHTML = `Error: ${err.message}`;
  }
});

//<!-- Render issues (10 per page) -->
  function renderIssues() {
  issuesDiv.innerHTML = "";

const start = (currentPage - 1 ) * issuesPerPage;
const end = start + issuesPerPage;
const pagesIssues = allIssues.slice(start, end);

pageIssues.forEach(issue => {
  const div = document.createElement("div");
  div.className = "issue";
  div.innerHTML = `<a href="${issue.html_url}"
  target="_blank">${issue.title}</a>
  <p>Author: ${issue.user.login}</p>
  <span class="badge">good first issue</span>
  <p class="hint-text">Click to open on GitHub</p>
  `;
  issuesDiv.appendChild(div);
});
}

//<!-- Pagination logic --> 
function renderPagination() {
  const totalPages = Math.ceil(allIssues.length / issuesPerPage);
  pageInfo.innerText = `Page ${currentPage} of ${totalPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

//<!-- Button events --> 
prevBtn.addEventListener("click", () => {
  if (curremtPage > 1) {
    currentPage--;
    renderIssues();
    renderPagination();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(allIssues.length/issuesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderIssues(); 
    renderPagination();
  }
});

//const scaryKeywords = ["compiler","performance","reconciler","scheduler","internals",];
