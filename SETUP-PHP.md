# Pre-Workshop Setup — PHP

Do before workshop day. By the end, three things are guaranteed — so on the day
we start coding immediately, not configuring:

1. A GitHub account with working auth.
2. You can **pull** workshop updates (`upstream`) and **push** your work (your fork).
3. Rock Paper Scissors **PHP** tests run green on your machine.

Time: ~10 minutes.

> Working in TypeScript? Follow [SETUP-TS.md](SETUP-TS.md) instead.

---

## 1. GitHub account

Sign up at [github.com](https://github.com) if you don't have one.

Set up auth so `git push` works. Either:

- **HTTPS** with a [Personal Access Token](https://github.com/settings/tokens), or
- **SSH** with an [SSH key added to your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

---

## 2. Fork, clone, connect upstream

Fork [Chemaclass/workshop-ipc26-munich](https://github.com/Chemaclass/workshop-ipc26-munich) (top-right **Fork** button), then:

```bash
git clone https://github.com/<your-username>/workshop-ipc26-munich.git
cd workshop-ipc26-munich

# connect the workshop repo as 'upstream' to pull day-of updates
git remote add upstream https://github.com/Chemaclass/workshop-ipc26-munich.git

# verify pull from upstream works
git pull upstream main

# verify push to your fork works
echo "ready" > .ready
git add .ready
git commit -m "chore: verify push works"
git push
```

Both must succeed — **pull** from `upstream`, **push** to your fork (`origin`). If either fails, fix auth before workshop day.

---

## 3. Run Rock Paper Scissors PHP tests green

Pick **one** path.

### Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) running.

```bash
cd tdd/rock-paper-scissors/php
make up
make test
make down
```

### Local PHP

Requires PHP **8.4+** and Composer.

```bash
cd tdd/rock-paper-scissors/php
composer install
composer test
```

Both paths: all tests **PASS**, exit code `0`.

---

## You're ready when

- [ ] `git pull upstream main` succeeds — you can pull day-of updates
- [ ] `git push` to your fork succeeds — you can save your work
- [ ] Rock Paper Scissors tests pass with exit code `0`

Three green checks and we start coding on the day, not configuring.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `git push` rejected | Auth not set up. Configure PAT or SSH key (step 1). |
| `git pull upstream` fails | Check `git remote -v` lists `upstream`; re-add it with the command in step 2. |
| `docker: command not found` | Install Docker Desktop, start it. |
| `make: command not found` (Windows) | Use WSL2, or run `docker-compose` commands from the kata README directly. |
| `php: command not found` | Install PHP 8.4 (`brew install php@8.4`) or switch to the Docker path. |
| `composer: command not found` | Install [Composer](https://getcomposer.org/download/) or switch to the Docker path. |
| Tests red on fresh clone | Open an issue on the repo. Do **not** debug on workshop day. |
