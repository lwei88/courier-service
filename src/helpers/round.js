/**
 * Returns round numeric number with defined decimal place.
 *
 * @param {number} num any numeric input
 * @param {number} decimal any numeric input
 * @return {number} rounded number with defined decimal place
 */
function round(num, decimal = 0) {
  return parseFloat(num.toFixed(decimal));
}

module.exports = round;
