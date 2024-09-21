module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
