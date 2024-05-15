all: build run

build:
	docker compose build

run:
	docker compose up -d
	docker exec -it back npx prisma migrate dev --name init
	# docker exec -it db psql -U postgres

stop:
	docker stop $(docker ps -a -q)

.PHONY: all build run stop
