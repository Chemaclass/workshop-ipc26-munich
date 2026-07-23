# Pre-Workshop Setup — TypeScript

Do before workshop day. Three things must work:

1. You have a GitHub account.
2. You can commit and push to your own fork.
3. Rock Paper Scissors **TypeScript** tests run green on your machine.

Time: ~10 minutes.

> Working in PHP? Follow [SETUP-PHP.md](SETUP-PHP.md) instead.

---

## 1. GitHub account

Sign up at [github.com](https://github.com) if you don't have one.

Set up auth so `git push` works. Either:

- **HTTPS** with a [Personal Access Token](https://github.com/settings/tokens), or
- **SSH** with an [SSH key added to your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

---

## 2. Fork, clone, push

Fork [Chemaclass/workshop-ipc26-munich](https://github.com/Chemaclass/workshop-ipc26-munich) (top-right **Fork** button), then:

```bash
git clone https://github.com/<your-username>/workshop-ipc26-munich.git
cd workshop-ipc26-munich

# verify push works
echo "ready" > .ready
git add .ready
git commit -m "chore: verify push works"
git push
```

Push must succeed. If not, fix auth before workshop day.

---

## 3. Run Rock Paper Scissors TypeScript tests green

Pick **one** path.

### Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) running.

```bash
cd tdd/rock-paper-scissors/ts
make up
make test
make down
```

### Local Node

Requires Node **22+** and npm.

```bash
cd tdd/rock-paper-scissors/ts
npm install
npm test
```

Both paths: all tests **PASS**, exit code `0`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `git push` rejected | Auth not set up. Configure PAT or SSH key (step 1). |
| `docker: command not found` | Install Docker Desktop, start it. |
| `make: command not found` (Windows) | Use WSL2, or run `docker-compose` commands from the kata README directly. |
| `node: command not found` | Install Node 22 (`brew install node@22`, or [nodejs.org](https://nodejs.org)) or switch to the Docker path. |
| `npm install` fails | Delete `node_modules` and retry, or switch to the Docker path. |
| Tests red on fresh clone | Open an issue on the repo. Do **not** debug on workshop day. |
