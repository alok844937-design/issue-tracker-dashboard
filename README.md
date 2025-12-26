# GitHub Good First Issues Tracker 🚀
A simple web-based tool to help beginners find `good first issues` and other begineer-friendly issues from any GitHub repository.
This project is built to support **Open Source newcomers**, especially those preparing for **GSOC(Google Summer of Code)** and first OSS contributions.

## ✨Features 
- Fetch open GitHub issues from any public repository
- Filter issues by labels(e.g. `good first issue`, `bug`, `documentation`)
- Automatically skips pull requests
- Handles API errors and GitHub rate-limit gracefully
- Works fully on the client-side (no backend required)
- Deployable via GitHub Pages

## 🛠️Tech Stack 
- **HTML5** - Structure
- **CSS3** - Basic styling
- **Vanilla JavaScript(ES6)** - Logic & GitHub API integration
- **GitHub REST API**

## 📂Project Structure 
issue-tracker-dashboard/ | |-index.html  # UI and form |-script.js   # GitHub API logic |- style.css # styling(optional) |-README.md # Project documentation 

## 🚀How to Use 
1. Enter a repository name in the format:
   Example: facebook/react
2. Select one or more labels from the dropdown:
  - `good first issue`
  - `bug`
  - `enhancement`
  - `documentation`
3. Click **Fetch Issues**
4. Matching issues will be displayed with:
  - Issue title
  - Author
  - Direct Link to GitHub

## GitHub API Rate Limit 
- Unnauthenticated requests are limited to **60 requests/hour**
- If the limit is reached, a user-friendly message is shown
- (Future enhancement: GitHub token support)
 
## Live Demo (GitHub Pages)
> Enable GitHub Pages from:
> **Settings → Pages → Source → main branch /root**
> Your live site will be available at:
https://alok844937-design.github.io/issue-tracker-dashboard/

## 🎯Motivation 
Finding a begineer-friendly issue is often the **hardest part of starting open source**.
This project aims to: 
- Reduce friction for first-time contributions
- Help students prepare for **GSOC & OSS programs**
- Provide a clean, minimal, begineer-friendly interface

## 🧩Future Improvements 
- Pagination Support
- Default GSOC organization suggestions
- GitHub authenticatiion (higher rate limit)
- Better UI / dark mode
- Save favorite repositories

## Contributing 
Contributions, ideas, and suggestions are welcome!
If you're a beginner: 
 - Look for issues labeled `good first issue`
 - Feel free to open discussions or issues

## License
This project is licensed under the **MIT License**

## Author 
Built a ❤️ by a student preparing for **Open Source & GSOC 2026**.
