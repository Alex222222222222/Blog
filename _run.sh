docker run --rm -d \
  --volume="$PWD:/srv/jekyll" \
  --publish 4000:4000 \
  --name jekyll \
  jekyll/jekyll \
  /bin/bash -c "bundle add webrick; jekyll serve --livereload"
