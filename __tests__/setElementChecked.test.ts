/**
 * @jest-environment jsdom
**/
import { setElementChecked } from '../src/lib/setElementChecked';

describe('setElementChecked', () => {
  test('checkbox - unchecked', () => {
    const target = document.createElement('input');
    target.type = 'checkbox';
    target.value = 'value1';
    const value = null;
    setElementChecked(target, value);
    expect(target.checked).toBe(false);
  });

  test('checkbox - checked', () => {
    const target = document.createElement('input');
    target.type = 'checkbox';
    target.value = 'value1';
    const value = ['value1', 'value2'];
    setElementChecked(target, value);
    expect(target.checked).toBe(true);
  });

  test('checkbox - invalid type', () => {
    const target = document.createElement('input');
    target.type = 'checkbox';
    target.value = 'value1';
    const value = 'value1'; // invalid type
    const result = setElementChecked(target, value);
    expect(target.checked).toBe(false);
    expect(result).toBe(false);
  });

  test('radio - checked', () => {
    const target = document.createElement('input');
    target.type = 'radio';
    target.value = 'value1';
    const value = 'value1';
    setElementChecked(target, value);
    expect(target.checked).toBe(true);
  });

  test('radio - unchecked', () => {
    const target = document.createElement('input');
    target.type = 'radio';
    target.value = 'value1';
    const value = 'value2';
    setElementChecked(target, value);
    expect(target.checked).toBe(false);
  });

});