module.exports = {
  content: ['src/**/*.html', 'src/js/**/*.js'],
  whitelistPatterns: [
    /^arrow$/,
    /^modal-backdrop$/,
    /^modal-open$/,
    /^show$/,
    /^collapsing$/,
    /spinner-border/,
    /float-right/
  ],
  whitelistPatternsChildren: [/tooltip/, /was-validated/]
}
