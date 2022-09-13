/**
 * Returns floored numeric number with 2 decimal place.
 *
 * @param {number} num any numeric input
 * @return {number} floored number with 2 decimal place
 */
function floor(num) {
  return Math.floor(num * 100) / 100;
}

module.exports = floor;
