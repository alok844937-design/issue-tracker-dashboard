const form = document.getElementById("repoForm");
const repoInput = document.getElementById("repoInput");
const labelSelect = documnent.getElementByID("labelSelect");
const issuesDiv = document.getElementById("issuesDiv");

let currentPage = 1;
const PER_PAGE = 10;

<!-- Quick Repo buttons --> 
  document.querySelectorAll("#quickRepos button").forEach(btn => {
  btn.addEventListener("click", () => {
    repoInput.value = btn.dataset.repo;
    form.dispatchEvent(new Event("submit"));
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const repo = repoInput.value.trim();
    const labels = Array.from(labelSelect.selectedOptions).map(opt => opt.value).join(",");
  issuesDiv.innerHTML = "Loading issues...";

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues?state=open&labels=${encodeURLComponent(labels)}&per_page=${PER_PAGE}&page=${currentPage}`
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

    if (data.length === 0) {
      issuesDiv.innerHTML = "No beginner-friendly issues found.";
      return;
    }

    issuesDiv.innerHTML = "";

    const scaryKeywords = [
      "compiler",
      "performance",
      "reconciler",
      "scheduler",
      "internals",
    ];
    
    data.forEach(issue => {
      if (issue.pull_request) return;
      const titleLower = issue.title.toLowerCase();
      if (scaryKeywords.some(word => titleLower.includes(word))) return;

      let level ="Beginner";
      if (issue.labels.some(l => l.name.includes("bug"))) {
        level="Intermediate";
      }
      
      const div = document.createElement("div");
      div.className = "issue";
      div.innerHTML =`
      <a href="${issue.html_url}"
      target="_blank">${issue.title}</a>
      <p>By: ${issue.user.login}</p>
      <p>Level: ${level}</p>
      `;

    issuesDiv.appendChild(div);
    });
  } catch (err) {
    issuesDiv.innerHTML = `Error: ${err.message}`;
  }
});

// Pagination 
document.getElementById("next").onclick = () => {
  currentPage++;
  form.dispatchEvent(new Event("submit"));
};

document.getElementById("prev").onclick = () => {
  if(currentPage > 1) {
    currentPage--; 
  form.dispatchEvent(new Event("submit"));
  }
};
