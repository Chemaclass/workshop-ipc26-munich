#!/usr/bin/make -f

.PHONY: help up up-php up-ts down test test-php test-ts

KATAS_PHP = tdd/rock-paper-scissors/php tdd/guess-random-number/php tdd/spinner-wheel/php refactoring/parrot/php refactoring/tennis/php refactoring/gilded-rose/php
KATAS_TS  = tdd/rock-paper-scissors/ts tdd/guess-random-number/ts tdd/spinner-wheel/ts refactoring/parrot/ts refactoring/tennis/ts refactoring/gilded-rose/ts

help: ## Show this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | column -t -s ':' | sed 's/^  //'

up: up-php up-ts ## Start every kata container (PHP + TS).

up-php: ## Start all PHP kata containers.
	@for d in $(KATAS_PHP); do (cd $$d && docker-compose up -d); done

up-ts: ## Start all TS kata containers.
	@for d in $(KATAS_TS); do (cd $$d && docker-compose up -d); done

down: ## Stop and remove all kata containers (PHP + TS).
	docker rm -f \
		ipc26-rps-php ipc26-guess-number-php ipc26-spinner-wheel-php ipc26-parrot-php ipc26-tennis-php ipc26-gilded-rose-php \
		ipc26-rps-ts ipc26-guess-number-ts ipc26-spinner-wheel-ts ipc26-parrot-ts ipc26-tennis-ts ipc26-gilded-rose-ts 2>/dev/null || true

test: test-php test-ts ## Run all tests (PHP + TS).

test-php: ## Run all PHP tests (requires 'make up-php' first).
	docker exec ipc26-rps-php composer test
	docker exec ipc26-guess-number-php composer test
	docker exec ipc26-spinner-wheel-php composer test
	docker exec ipc26-parrot-php composer test
	docker exec ipc26-tennis-php composer test
	docker exec ipc26-gilded-rose-php composer test

test-ts: ## Run all TS tests (requires 'make up-ts' first).
	docker exec ipc26-rps-ts npm test
	docker exec ipc26-guess-number-ts npm test
	docker exec ipc26-spinner-wheel-ts npm test
	docker exec ipc26-parrot-ts npm test
	docker exec ipc26-tennis-ts npm test
	docker exec ipc26-gilded-rose-ts npm test
