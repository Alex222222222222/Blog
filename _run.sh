docker run --rm -d \
  --volume="$PWD:/srv/jekyll" \
  --publish [::1]:4000:4000 \
  --name jekyll \
  jekyll/jekyll \
  jekyll serve --livereload
