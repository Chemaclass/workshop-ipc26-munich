#!/usr/bin/make -f

SERVICE = spinner-wheel-tdd
CONTAINER = ipc26-spinner-wheel-php

help: ## Show this help message.
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | column -t -s ':' | sed 's/^  //'

build: ## Build the PHP container.
	docker compose build

up: ## Start container in background.
	docker compose up -d

down: ## Stop container.
	docker compose down

test: ## Run the tests.
	docker compose run --rm $(SERVICE) composer test

stan: ## Run static analysis.
	docker compose run --rm $(SERVICE) composer phpstan

cs: ## Check coding standards.
	docker compose run --rm $(SERVICE) composer check-cs

fix-cs: ## Fix coding standards.
	docker compose run --rm $(SERVICE) composer fix-cs

watch: ## Run tests in watch mode (requires 'make up' first).
	docker exec $(CONTAINER) composer test:watch

serve: ## Serve public/ at http://localhost:8000 (requires 'make up' first).
	docker exec -it $(CONTAINER) php -S 0.0.0.0:8000 -t public
