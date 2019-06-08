module.exports = {
  content: ['src/**/*.html'],
  whitelistPatterns: [
    /^arrow$/,
    /^modal-backdrop$/,
    /^modal-open$/,
    /^show$/,
    /^collapsing$/
  ],
  whitelistPatternsChildren: [/tooltip/, /was-validated/]
}
