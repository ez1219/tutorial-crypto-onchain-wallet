const path = require('node:path')

const buildEslintCommand = (filenames) =>
  `eslint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '**/*.{js,jsx,ts,tsx,json,css,md}': [buildPrettierCommand],
}
