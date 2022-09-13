/**
 * Returns non-repeated combinations (inversed order) of all element within a given array.
 * Array.reverse() is recommended to make the array sort in according to the input array.
 *
 * @param {string[]} arr The array consists of list of unique string.
 * @return {Array} 2-D array, where each element is non-repeated combination of the element within arr.
 *
 */
function getCombinations(arr) {
  if (arr.length === 1) return [arr];
  else {
    const com = getCombinations(arr.slice(1));
    return com.concat(
      com.map((e) => e.concat(arr[0])),
      [[arr[0]]]
    );
  }
}

module.exports = getCombinations;
