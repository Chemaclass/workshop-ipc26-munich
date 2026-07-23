# Pre-Workshop Setup — PHP

Do before workshop day. Three things must work:

1. You have a GitHub account.
2. You can commit and push to your own fork.
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

## Troubleshooting

| Problem | Fix |
|---|---|
| `git push` rejected | Auth not set up. Configure PAT or SSH key (step 1). |
| `docker: command not found` | Install Docker Desktop, start it. |
| `make: command not found` (Windows) | Use WSL2, or run `docker-compose` commands from the kata README directly. |
| `php: command not found` | Install PHP 8.4 (`brew install php@8.4`) or switch to the Docker path. |
| `composer: command not found` | Install [Composer](https://getcomposer.org/download/) or switch to the Docker path. |
| Tests red on fresh clone | Open an issue on the repo. Do **not** debug on workshop day. |
