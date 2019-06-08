/**
 * Removes extra spaces (more than one)
 * Such as remove any space before and after the text.
 *
 * @param {String} value
 * @returns {String} the value without extra spaces
 */
const removeExtraSpaces = value => value.replace(/\s+/g, ' ').trim()

export { removeExtraSpaces }
