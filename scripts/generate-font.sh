#!/usr/bin/env bash
pushd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")"

python3 -m venv .venv
source .venv/bin/activate

version="17.0.0"
build_dir="$PWD/build/font"
data_dir="$PWD/data"
out_dir="$PWD/font"
mkdir -p "$build_dir"/{openmoji,svg}
mkdir -p "$out_dir"

pip install nanoemoji

curl -L https://github.com/hfg-gmuend/openmoji/releases/download/$version/openmoji-svg-color.zip -o "$build_dir/openmoji-svg-color.zip"
curl -L https://cdn.jsdelivr.net/npm/openmoji@$version/data/openmoji.json -o "$build_dir/openmoji.json"
unzip -qn "$build_dir/openmoji-svg-color.zip" -d "$build_dir/openmoji"
find "$data_dir/svg" -type f -name '*.svg' -exec cp {} "$build_dir/svg" \;
jq -r '.[] | [.hexcode, .group] | @tsv' "$build_dir/openmoji.json" | while IFS=$'\t' read -r hexcode group; do
  if [[ "$group" != "extras-openmoji" && "$group" != "extras-unicode" ]]; then
    cp "$build_dir/openmoji/${hexcode}.svg" "$build_dir/svg/${hexcode}.svg"
  fi
done

cat >"$build_dir/BulletMoji.toml" <<-EOF
output_file = "$build_dir/BulletMoji.ttf"
color_format = "glyf_colr_1"
ascender = 1045
descender = -275

[axis.wght]
name = "Weight"
default = 400

[master.regular]
style_name = "Regular"

srcs = ["$build_dir/svg/*.svg"]

[master.regular.position]
wght = 400
EOF

nanoemoji --build_dir="$build_dir" "$build_dir/"*.toml
xmlstarlet edit --update '/ttFont/name/namerecord[@nameID="5"][@platformID="3"]' --value "$version" "$data_dir/BulletMoji.ttx" > "$build_dir/BulletMoji.ttx"
ttx -m "$build_dir/BulletMoji.ttf" -o "$out_dir/BulletMoji_400Regular.ttf" "$build_dir/BulletMoji.ttx"
maximum_color "$out_dir/BulletMoji_400Regular.ttf" --output_file "$out_dir/BulletMoji_400Regular_svg.ttf"
woff2_compress "$out_dir/BulletMoji_400Regular_svg.ttf"
rm "$out_dir/BulletMoji_400Regular_svg.ttf"
mv "$out_dir/BulletMoji_400Regular_svg.woff2" "$out_dir/BulletMoji_400Regular.woff2"

deactivate
popd
