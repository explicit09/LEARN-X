# LEARN‑X • AGENTS.md

*The single source of truth for Codex tasks and human contributors.*

---

## 0  Mission‑Critical Rules (read first!)

1. **Fail fast** – Any target (tests, lint, type‑check, run) that exits ≠ 0 must abort the task with the same exit code.
2. **Five‑minute ceiling** – Setup + targets must complete in ≤ 300 s unless a longer `timeout:` is declared in task YAML.
3. **No secrets in git** – If `OPENAI_API_KEY` or `DATABASE_URL` are missing, the setup script exits 1 with a one‑line error.

---

## 1  Required Environment Variables

| Var              | Purpose                           | Example                            |
| ---------------- | --------------------------------- | ---------------------------------- |
| `OPENAI_API_KEY` | Calls OpenAI for embeddings & RAG | `sk‑prod_***`                      |
| `DATABASE_URL`   | Postgres connection               | `postgresql://user:pass@db/learnx` |
| `LEARNX_ENV`     | Runtime mode                      | `dev` / `prod`                     |
| `PORT`           | HTTP port for the web server      | `8000` (default)                  |


These must be set in Codex **Environment variables / Secrets** *before* the task runs.

---

## 2  Repository Contract

```
/
├── AGENTS.md              # ← you are here (keep ≤150 lines)
├── requirements.txt       # Runtime deps only
├── requirements-dev.txt   # Tests / lint / type deps
├── backend/
│   ├── app/               # FastAPI code
│   └── tests/
└── frontend/
```

*Adding new top‑level dirs?* Update this map or the lint target will fail.

---

## 3  Build & Run Targets

| Target    | Command                                                                             | Success Criteria          |
| --------- | ----------------------------------------------------------------------------------- | ------------------------- |
| **Tests** | `pytest -q`                                                                         | All tests pass (exit 0)   |
| **Lint**  | `black --check backend && isort --check-only backend && flake8 backend` | No diffs / warnings       |
| **Type**  | `mypy backend`                                                                  | Zero type errors          |
| **Run**   | `bash start.sh & sleep 5 && curl -s http://localhost:${PORT:-8000}/health`                   | Returns `{"status":"ok"}` |

Codex must run these in the listed order and fail on the first non‑zero status.

---


---

## 5  Long Tasks

Need >5 min (e.g., data migration)? Add in task YAML:
`timeout: 900`  # 15 minutes.

---

## 6  Dependency Policy

* **Runtime** deps pinned in `requirements.txt` (no dev tools).
* **Dev/Test** deps in `requirements-dev.txt`.
* Run `pip install -r requirements-dev.txt` *only* inside test, lint, and type targets.

---

## 7  Commit Message Convention (conventional‑commits)

`<type>(<scope>): <subject>` – e.g. `feat(api): add course‑upload endpoint`.

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

PRs missing a valid prefix will fail the lint target.

---

### End of file – keep it brutal, short, and current.
