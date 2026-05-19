PORT ?= 8000

.PHONY: check link-check publish release-check serve

check:
	zsh -n scripts/publish.sh
	zsh -n scripts/release-check.sh
	node --check site/email.js
	node --check site/practice-flow.js
	node --check scripts/check-links.js
	node scripts/check-links.js

link-check:
	node scripts/check-links.js

release-check:
	zsh scripts/release-check.sh

serve:
	cd site && python3 -m http.server $(PORT)

publish:
	./scripts/publish.sh
