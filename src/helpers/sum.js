/**
 * Returns sum of all number within a given array.
 *
 * @param {number[]} array The array consists of list of number.
 * @return {number} sum of the number in the array.
 */
function sum(array) {
  return array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}

module.exports = sum;
