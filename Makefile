#!/usr/bin/make -f

.PHONY: help up up-php up-ts down test test-php test-ts

KATAS_PHP = tdd/rock-paper-scissors/php tdd/guess-random-number/php refactoring/parrot/php refactoring/tennis/php
KATAS_TS  = tdd/rock-paper-scissors/ts tdd/guess-random-number/ts refactoring/parrot/ts refactoring/tennis/ts

help: ## Show this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | column -t -s ':' | sed 's/^  //'

up: up-php up-ts ## Start every kata container (PHP + TS).

up-php: ## Start all PHP kata containers.
	@for d in $(KATAS_PHP); do (cd $$d && docker-compose up -d); done

up-ts: ## Start all TS kata containers.
	@for d in $(KATAS_TS); do (cd $$d && docker-compose up -d); done

down: ## Stop and remove all kata containers (PHP + TS).
	docker rm -f \
		ipc26-rps-php ipc26-guess-number-php ipc26-parrot-php ipc26-tennis-php \
		ipc26-rps-ts ipc26-guess-number-ts ipc26-parrot-ts ipc26-tennis-ts 2>/dev/null || true

test: test-php test-ts ## Run all tests (PHP + TS).

test-php: ## Run all PHP tests (requires 'make up-php' first).
	docker exec ipc26-rps-php composer test
	docker exec ipc26-guess-number-php composer test
	docker exec ipc26-parrot-php composer test
	docker exec ipc26-tennis-php composer test

test-ts: ## Run all TS tests (requires 'make up-ts' first).
	docker exec ipc26-rps-ts npm test
	docker exec ipc26-guess-number-ts npm test
	docker exec ipc26-parrot-ts npm test
	docker exec ipc26-tennis-ts npm test
