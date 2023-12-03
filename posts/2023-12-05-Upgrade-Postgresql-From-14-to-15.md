---
title: "Upgrade Postgresql From 14 to 15"
date: "2023-12-03"
tags: ["Postgresql", "Database"]
toc: false
categories: ["Postgresql", "Database"]
description: "Upgrade Postgresql From 14 to 15"
---

Recently, I have upgraded my Postgresql database for my freshrss instance from 14 to 15. Here are the steps I followed to do it.

First, we need to local the binary of the old version of Postgresql.
In most of the cases, it can be found by

```bash
which psql
```

In my case, it is `/usr/local/bin/psql`.

Then, we need to find the data directory of the old version of Postgresql.
In my case, it is at `/var/lib/postgres/14`.
And the `postgresql.conf` file is at `/var/lib/postgres/14/data/postgresql.conf`.

Then, we need to install the new version of Postgresql.
I use `nix` to manage my packages,
so I just change the version of Postgresql in my `configuration.nix` file and run `nixos-rebuild switch`.

After that, we need to find the binary of the new version of Postgresql.
Which can be found by

```bash
which psql
```

Then, we need to find the data directory of the new version of Postgresql.
In my case, it is at `/var/lib/postgres/15`.
And the `postgresql.conf` file is which you should copy and modify from the old version of Postgresql.

We need to first stop the old version of Postgresql.

```bash
systemctl stop postgresql
```

And `su` to the `postgres` user.

```bash
sudo su - postgres
```

Then, we need to run the following command to first initialize the new version of Postgresql.

```bash
initdb -D /var/lib/postgres/15/
```

Then, we need 


Then, we need to run the following command to migrate the data from the old version of Postgresql to the new version of Postgresql.
With `--check` option, it will check if the migration is possible.

```bash
/usr/lib/postgresql/15/bin/pg_upgrade \
  --old-datadir=$OLD_DATADIR \
  --new-datadir=$NEW_DATADIR \
  --old-bindir=$OLD_BINDOR \
  --new-bindir=$NEW_BINDIR \
  --old-options '-c config_file=$OLD_CONFIG_FILE' \
  --new-options '-c config_file=$NEW_CONFIG_FILE' \
  --check
```

If the check is successful, we can run the following command to do the migration.

```bash
/usr/lib/postgresql/15/bin/pg_upgrade \
  --old-datadir=$OLD_DATADIR \
  --new-datadir=$NEW_DATADIR \
  --old-bindir=$OLD_BINDOR \
  --new-bindir=$NEW_BINDIR \
  --old-options '-c config_file=$OLD_CONFIG_FILE' \
  --new-options '-c config_file=$NEW_CONFIG_FILE'
```

After that, we need to check if the migration is successful.
If it is successful, we can then remove the old version of Postgresql.
