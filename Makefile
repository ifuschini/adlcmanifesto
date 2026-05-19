.PHONY: check publish

check:
	zsh -n scripts/publish.sh
	node --check site/email.js
	node --check site/practice-flow.js

publish:
	./scripts/publish.sh
