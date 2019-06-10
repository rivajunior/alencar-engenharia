module.exports = {
  content: ['src/**/*.html'],
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
