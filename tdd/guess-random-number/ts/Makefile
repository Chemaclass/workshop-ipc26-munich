#!/usr/bin/make -f

SERVICE = guess-number-tdd-ts
CONTAINER = ipc26-guess-number-ts

help: ## Show this help message.
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | column -t -s ':' | sed 's/^  //'

build: ## Build the Node container.
	docker-compose build

up: ## Start container in background.
	docker-compose up -d

down: ## Stop container.
	docker-compose down

test: ## Run the tests.
	docker-compose run --rm guess-number-tdd-ts npm test

stan: ## Run type checking.
	docker-compose run --rm $(SERVICE) npm run stan

cs: ## Check coding standards.
	docker-compose run --rm $(SERVICE) npm run check-cs

fix-cs: ## Fix coding standards.
	docker-compose run --rm $(SERVICE) npm run fix-cs

watch: ## Run tests in watch mode (requires 'make up' first).
	docker exec $(CONTAINER) npm run test:watch

web: ## Play the web version at http://localhost:4173.
	docker-compose run --rm --service-ports -e HOST=0.0.0.0 $(SERVICE) npm run web
