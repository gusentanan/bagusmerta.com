---
id: 5
title: "A better way to write commit messages"
description: "Writing commit messages with Conventional Commits."
date: 2024-05-30
slug: "better-way-to-write-git-commit-messages"
banner: "./images/blog-5/better-way-to-write-commit-messages.jpg"
readCount: "3 min read"
tags: [ "tech" ]
---

Imagine you're hunting for the commit that introduced a bug, and the log looks like this.

```text
fix
update
wip
fix again
```

None of these messages help. You have to open each commit and read the diff to find out what changed. A clear message tells you right away. That matters when you come back to your own code months later, and even more when other people read your history.

Everyone writes commit messages in their own style, and there's no single right one. But a shared format makes history easier to read for the whole team. The one I use is Conventional Commits.

### Conventional Commits
Conventional Commits is a short set of rules for structuring commit messages. A message looks like this.

```text
<type>[optional scope]: <description>
```

- `type` is the kind of change, like a new feature or a bug fix.
- `scope` is the part of the code the change affects.
- `description` is a short summary of what changed.

If you have more to say, add a body and a footer. Separate each part with a blank line.

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

For example:

```text
feat(shop): add product card
```

A longer example:

```text
feat(payment): notify user after a successful purchase

Send a push notification to the user when a product purchase succeeds.

Refs: #123
```

### Types
The spec itself only defines `feat` and `fix`. The other types below are common conventions that many teams use.

- `feat` adds a new feature.
- `fix` fixes a bug. Say which bug in the description.
- `docs` changes documentation only, like the README.
- `style` changes formatting without changing logic, like whitespace or import order.
- `refactor` changes the structure of the code without changing its behavior.
- `test` adds or updates tests.
- `chore` covers maintenance, like installing or updating dependencies.
- `ci` changes CI configuration or scripts.
- `revert` reverts an earlier commit.

You can add your own types too. For example, a `codemagic` type for an empty commit that triggers a deployment, like `codemagic: trigger deployment`. Swap in whatever CI tool you use, and make sure the whole team agrees on the custom types.

### Writing the description
The description matters most. Say what the commit does, in the imperative mood and present tense. Write "add product card", not "added product card". I also start the description with a lowercase letter and leave off the final period. The spec doesn't require either, but most teams follow both.

References.
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
