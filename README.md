# Anthropic Docs — Failure-Mode Map

Companion demo for the article *"Everyone Has the Anthropic Docs Bookmarked — Few Know Which Mistake Each One Prevents."*

## What the lab proves

The article's core claim: the 17 Anthropic documents are not a reading list, they are a **map of the mistakes you are going to make**, roughly in the order you'll make them. This demo makes that claim operational and testable.

The shared logic in `app/docs.mjs` encodes four failure clusters and the symptom each one answers:

| Symptom the reader is living | Highlighted cluster | Wrong path vs. the doc's actual advice |
|---|---|---|
| "My prompt broke after a model upgrade" | Prompts you keep rewriting blindly | add "please" and more capitals → Prompting best practices |
| "I'm about to build a second agent" | Agent you will over-build | add another agent box → Building Effective Agents |
| "Outputs get vaguer as sessions get longer" | Context window you blame | enlarge the context window → Context engineering |
| "I was about to buy a course" | Course you will buy instead | buy the paid course → Interactive Prompt Engineering Tutorial |

`test/map.test.mjs` asserts every one of these mappings — the same module the browser UI imports — so the demo fails if a symptom stops pointing at the doc that actually prevents that mistake.

Note: the widely-circulated list is billed as 17 documents; the article names 13 of them explicitly (3 + 4 + 3 + 3) and this demo does not fabricate the remaining four.

## Run it

```bash
npm test     # node --test "test/*.test.mjs"
npm start    # serves the lab at http://localhost:3000
```

Zero dependencies. Node 20+ only, ES modules, inline CSS, no external requests.