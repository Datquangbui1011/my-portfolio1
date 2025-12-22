Deployment guide

This file contains quick instructions to deploy the Next.js portfolio.

1) Vercel (recommended)

- Push your repo to GitHub.
- Sign in to https://vercel.com using GitHub.
- Import the repository and Vercel will detect Next.js automatically.
- Default build settings are:
  - Build command: npm run build
  - Output directory: .next (handled automatically)
- Deploy. Vercel will give you a URL and automatic previews on pull requests.

CLI alternative:

```bash
npm i -g vercel
cd /path/to/my-portfolio
vercel
# follow prompts to link and deploy
```

2) Docker (self-host)

- Build locally:

```bash
cd /path/to/my-portfolio
docker build -t my-portfolio .
```

- Run locally:

```bash
docker run -p 3000:3000 my-portfolio
# open http://localhost:3000
```

3) GitHub Actions (optional template)

If you prefer CI to build and deploy, you can use Vercel's GitHub integration or add a custom workflow that builds on push. Vercel recommends using their native integration for automatic deployments.

---

If you want, I can also add a GitHub Actions workflow that builds the project and pushes a Docker image to Docker Hub or another container registry. Let me know which provider you prefer and I will scaffold it.