---
title: "Edit Git History"
date: "2023-12-30"
tags: ["Git", "Blog"]
toc: false
categories: ["Blog"]
description: "Edit Git History"
---

# Edit Git History

This is a guide to editing git history including change the `commit message`, `author`, `date` and `email`.

## Create a new branch to work on

```bash
git branch new-branch
git switch new-branch
```

Create a new branch to work on, so that you can easily switch back to the original branch if something goes wrong.

## Select the commits you want to modify

```bash
git rebase -i --root
```

vim (or the editor you set to edit commit message) will open.
It will show all the commits in the repo. Like this:

```
pick 1d7a1c3 Initial commit
pick 2e7d2a3 Add README
pick 3e8b9c3 Add file1
pick 4e9b8c3 Add file2
...
pick [hash] [commit message]
```

Select the commits you want to modify by changing `pick` to `edit`.
If you would like to change all the commits,
enable line numbers with `set nu` and perform the following replace:
`:1,Ns/pick/edit/g` (where N is the line number of the last line)

The result will be like this:

```
edit 1d7a1c3 Initial commit
edit 2e7d2a3 Add README
pick 3e8b9c3 Add file1
pick 4e9b8c3 Add file2
...
edit [hash] [commit message]
pick [hash] [commit message]
```

## Modify the commits

You will now be shown all the selected commits one by one.

- Use `git commit --amend` to modify the commit message.
- Use `git commit --amend --author="John Doe <email@example.com>"` to modify the author.
- Use `git commit --amend --date "2 days ago"` to modify the date.
- Or add `Co-authored-by: John Doe <email@example.com>` to the commit message to add a co-author.

After you are satisfied with the changes, do a `git rebase --continue` to continue the rebase.

Repeat the process until you have done with all the commits that you set to `edit`.

If you are experiencing conflicts, you can use `git checkout --theirs .` to
accept the incoming changes or `git checkout --ours .` to accept the local changes.
After that, you can use `git rebase --continue` to continue the rebase.

## Edit the GIT_COMMITTER

Now the commit history would say
"X authored, Y commited" for all the commits you modify the author.
You can fix this by running the following git-filter command:

```bash
git filter-branch --env-filter '
export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
' -f
```

## Update the Commit Date

Now the "X authored, Y commited" problem will be fixed.
However, this previous process (`REBASE`) will also update the commit date.
So, on `GITHUB`, you will see the commit date is the date you do the `REBASE`.

To fix that, run the following:

```bash
git filter-branch --env-filter 'export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"' -f
```

## Force Push

Finally, rename the working branch to `master` and force-push to update the remote branch:

```bash
git switch master
git branch -m master_old
git switch new-branch
git branch -m master
git push -f origin master
```
