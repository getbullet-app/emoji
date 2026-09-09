#!/usr/bin/env bash
pushd "$(dirname "$(dirname "${BASH_SOURCE[0]}")")"

python3 -m venv .venv
source .venv/bin/activate

build_dir="$PWD/build/font"
out_dir="$PWD/font"
mkdir -p "$build_dir/svg"

pip install nanoemoji

curl -L https://github.com/hfg-gmuend/openmoji/releases/download/17.0.0/openmoji-svg-color.zip -o "$build_dir/openmoji-svg-color.zip"
unzip -qn "$build_dir/openmoji-svg-color.zip" -d "$build_dir/svg"
find "$PWD/src/glyphs" -type f -name '*.svg' -exec cp {} "$build_dir/svg" \;

cat >"$build_dir/bullet.moji.toml" <<-EOF
family = "bullet.moji"
output_file = "$out_dir/bullet.moji.ttf"
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
maximum_color "$out_dir/bullet.moji.ttf" --output_file "$out_dir/bullet.moji.svg.ttf"
woff2_compress "$out_dir/bullet.moji.svg.ttf"
rm "$out_dir/bullet.moji.svg.ttf"
mv "$out_dir/bullet.moji.svg.woff2" "$out_dir/bullet.moji.woff2"

deactivate
popd
