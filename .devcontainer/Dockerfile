FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install textlive
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends texlive-full \
    && apt-get clean && rm -rf /var/lib/apt/lists/*