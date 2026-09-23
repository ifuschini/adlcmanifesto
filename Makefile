PORT ?= 8000

.PHONY: check link-check publish release-check serve guide guide-check

guide:
	docker build -t adlc-docs:1 -f scripts/Dockerfile.docs scripts
	docker run --rm -v "$(CURDIR):/workspace" adlc-docs:1

guide-check:
	docker build -t adlc-docs:1 -f scripts/Dockerfile.docs scripts
	docker run --rm -v "$(CURDIR):/workspace:ro" adlc-docs:1 --check

check:
	zsh -n scripts/publish.sh
	zsh -n scripts/release-check.sh
	zsh -n scripts/check-footer-release-date.sh
	node --check site/email.js
	node --check site/practice-flow.js
	node --check site/navigation.js
	node --check site/theme.js
	node --check scripts/check-links.js
	node scripts/check-links.js
	node scripts/check-navigation.js
	node scripts/check-language-navigation.js
	python3 scripts/check-seo.py
	zsh scripts/check-footer-release-date.sh

link-check:
	node scripts/check-links.js

release-check:
	zsh scripts/release-check.sh

serve:
	@port="$(PORT)"; \
	while lsof -nP -iTCP:$$port -sTCP:LISTEN >/dev/null 2>&1; do \
		next_port=$$((port + 1)); \
		echo "Port $$port is busy; trying $$next_port"; \
		port="$$next_port"; \
	done; \
	echo "Serving site at http://localhost:$$port/"; \
	cd site && python3 -m http.server $$port

publish:
	./scripts/publish.sh
