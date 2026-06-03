PORT ?= 8000

.PHONY: check link-check publish release-check serve

check:
	zsh -n scripts/publish.sh
	zsh -n scripts/release-check.sh
	zsh -n scripts/check-footer-release-date.sh
	node --check site/email.js
	node --check site/practice-flow.js
	node --check scripts/check-links.js
	node scripts/check-links.js
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
