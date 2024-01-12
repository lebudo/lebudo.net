build:
  pnpm run build

dev:
  pnpm run dev

update-content:
  # You can supply the API token as an environment variable:
  # export DATO_API_TOKEN=abc123
  # or by creating a .env file containing 'DATO_API_TOKEN=abc123'.
  pnpm run dump

alias b := build
alias s := dev
alias serve := dev
alias dump := update-content
