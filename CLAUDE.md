# Portfolio Redesign

## Repositories

- `vlgolo-v2` is my NEW portfolio redesign and the primary working repository.
- All code edits, commits, and pushes must happen only in `vlgolo-v2`.

- `vlad-holoborodko-portfolio` is my OLD portfolio and current live production website — a reference source only.
- Use it when I explicitly ask to reference the current/old/live site, or when the task specifically requires existing content, copy, assets, structure, behavior, or implementation from the current site.
- Do not inspect or search it for normal redesign tasks that can be completed entirely within `vlgolo-v2`.
- When using it, inspect only the files relevant to the requested information — do not scan the entire old repository.
- It must always remain read-only: never modify, commit, push, change branches, install dependencies, or perform destructive operations in it.

## Git Workflow

- For normal UI/UX implementation tasks, after completing the requested change, create a concise git commit and push it to main so Vercel can deploy it for visual review.
- Do not ask for separate confirmation before commit/push when I have explicitly asked you to implement a change.
- If I explicitly say "don't push", "no push", "local only", or similar, do not commit or push.
- Never commit or push changes to `vlad-holoborodko-portfolio`; it remains reference-only.
- After pushing to main, switch back to the current Claude session branch and fast-forward it to origin/main using `--ff-only`. If the fast-forward isn't possible, stop and report the divergence — never reset, force, discard, or overwrite.

## Working Style

- I am a Product Designer, not a developer.
- I work with Claude Code from both iPad and Mac.
- I review deployed website changes through Vercel.
- Explain technical terms in simple language when I ask about them.

## Context Efficiency

- Optimize Claude usage and context aggressively.
- Focus only on the current requested task.
- Inspect only files directly relevant to the current task first.
- Do not scan the entire repository unless it is actually necessary.
- Do not read the old portfolio unless the current task requires information from it.
- Do not repeatedly reread unchanged files without a reason.
- Make the smallest correct change needed for the task.
- Do not refactor unrelated code.
- Do not install dependencies unless they are necessary.
- Keep responses concise unless I ask for an explanation.
