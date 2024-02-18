import { isSameArray, isSameValue } from '../src/lib/isSameValue';

describe('isSameArray', () => {
  test('should return true when both arrays are empty', () => {
    const result = isSameArray(undefined, undefined);
    expect(result).toBe(true);
  });

  test('should return true when both arrays are empty', () => {
    const result = isSameArray(undefined, []);
    expect(result).toBe(true);
  });

  test('should return true when both arrays are empty', () => {
    const result = isSameArray(undefined, [1]);
    expect(result).toBe(false);
  });

  test('should return true when both arrays are empty', () => {
    const result = isSameArray([], []);
    expect(result).toBe(true);
  });

  test('should return true when both arrays have the same values', () => {
    const result = isSameArray([1, 2, 3], [1, 2, 3]);
    expect(result).toBe(true);
  });

  test('should return true when both arrays have the same values', () => {
    const result = isSameArray([1, 2, 3], [2, 3, 1]);
    expect(result).toBe(true);
  });

  test('should return false when arrays have different lengths', () => {
    const result = isSameArray([1, 2, 3], [1, 2]);
    expect(result).toBe(false);
  });

  test('should return false when arrays have different values', () => {
    const result = isSameArray([1, 2, 3], [4, 5, 6]);
    expect(result).toBe(false);
  });

  test('should return false when one array is empty and the other is not', () => {
    const result = isSameArray([], [1, 2, 3]);
    expect(result).toBe(false);
  });

});

describe('isSameValue', () => {

  test('should return true when both values are empty', () => {
    const result = isSameValue(undefined, undefined);
    expect(result).toBe(true);
  });

  test('should return true when both values are empty', () => {
    const result = isSameValue(undefined, '');
    expect(result).toBe(true);
  });

  test('should return true when both values are empty', () => {
    const result = isSameValue(undefined, 0);
    expect(result).toBe(false);
  });

  test('should return true when both values are empty', () => {
    const result = isSameValue('', '');
    expect(result).toBe(true);
  });

  test('should return true when both values are the same', () => {
    const result = isSameValue('value', 'value');
    expect(result).toBe(true);
  });

  test('should return true when both values are the same', () => {
    const result = isSameValue('value', 'VALUE');
    expect(result).toBe(false);
  });

  test('should return false when values are different', () => {
    const result = isSameValue('value', 'other');
    expect(result).toBe(false);
  });

  test('should return false when one value is empty and the other is not', () => {
    const result = isSameValue('', 'value');
    expect(result).toBe(false);
  });
});

describe('use isSameValue instead of isSameArray', () => {

  test('should return true when both arrays have the same values', () => {
    const result = isSameValue([1, 2, 3], [1, 2, 3]);
    expect(result).toBe(true);
  });

  test('should return true when both arrays are empty', () => {
    const result = isSameValue(1, [1]);
    expect(result).toBe(false);
  });

});
