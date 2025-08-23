/* eslint-disable @typescript-eslint/no-array-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */
import { isEmpty } from '@/isEmpty';
import { describe, expect, it } from '@jest/globals';

describe('isEmpty', () => {
  describe('boolean values', () => {
    it('should return false for boolean values', () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(new Boolean(true))).toBe(false);
      expect(isEmpty(new Boolean(false))).toBe(false);
    });
  });

  describe('null and undefined', () => {
    it('should return true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('strings', () => {
    it('should return true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\n\t')).toBe(true);
      expect(isEmpty('\u00A0\u2007\u202F\u3000')).toBe(true); // Unicode spaces
      expect(isEmpty(new String(''))).toBe(true);
    });

    it('should return false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty('  hello  ')).toBe(false);
      expect(isEmpty('0')).toBe(false);
      expect(isEmpty(new String('Hi'))).toBe(false);
    });
  });

  describe('numeric values', () => {
    it('should return true for NaN', () => {
      expect(isEmpty(NaN)).toBe(true);
      expect(isEmpty(Number.NaN)).toBe(true);
      expect(isEmpty(new Number(NaN))).toBe(true);
    });

    it('should return false for valid numbers including zero', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(-0)).toBe(false);
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(3.14)).toBe(false);
      expect(isEmpty(new Number(42))).toBe(false);
    });

    it('should return false for BigInt values', () => {
      expect(isEmpty(BigInt(0))).toBe(false);
      expect(isEmpty(BigInt(42))).toBe(false);
      // BigInt literals are not available when targeting lower than ES2020.
      // expect(isEmpty(Object(0n))).toBe(false);
    });

    it('should return false for Infinity values', () => {
      expect(isEmpty(Infinity)).toBe(false);
      expect(isEmpty(-Infinity)).toBe(false);
      expect(isEmpty(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isEmpty(Number.NEGATIVE_INFINITY)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('should return true for regular empty arrays', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty(new Array())).toBe(true);
    });

    it('should return false for regular non-empty arrays', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty([''])).toBe(false);
      expect(isEmpty([null])).toBe(false);
    });

    it.each([
      ['Uint8Array', Uint8Array],
      ['Uint8Array', Uint8Array],
      ['Int8Array', Int8Array],
      ['Int8Array', Int8Array],
      ['Uint16Array', Uint16Array],
      ['Uint16Array', Uint16Array],
      ['Int16Array', Int16Array],
      ['Int16Array', Int16Array],
      ['Uint32Array', Uint32Array],
      ['Uint32Array', Uint32Array],
      ['Int32Array', Int32Array],
      ['Int32Array', Int32Array],
      ['Float32Array', Float32Array],
      ['Float32Array', Float32Array],
      ['Float64Array', Float64Array],
      ['Float64Array', Float64Array],
      ['BigInt64Array', BigInt64Array],
      ['BigInt64Array', BigInt64Array],
      ['BigUint64Array', BigUint64Array],
      ['BigUint64Array', BigUint64Array],
    ])('should check typed array: %s', (_, TypedObject) => {
      expect(isEmpty(new TypedObject())).toBe(true);
      expect(isEmpty(new TypedObject(2))).toBe(false);
    });
  });

  describe('Map and Set', () => {
    it('should return true for empty Map and Set', () => {
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Set())).toBe(true);
    });

    it('should return false for non-empty Map and Set', () => {
      expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
      expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
    });
  });

  describe('objects', () => {
    it('should return true for empty objects', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return true for objects with null prototype', () => {
      expect(isEmpty(Object.create(null))).toBe(true);
    });

    it('should return false for non-empty objects', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty({ empty: '' })).toBe(false);
    });

    it('should return true for objects with only non-enumerable properties', () => {
      const o = {};

      Object.defineProperty(o, 'hidden', { value: 1, enumerable: false });
      expect(isEmpty(o)).toBe(true);
    });

    it('should return true for objects with only symbol keys', () => {
      const s = Symbol('k');
      const o = { [s]: 1 };

      expect(isEmpty(o)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return false for function values', () => {
      expect(isEmpty(() => {})).toBe(false);
    });

    // You cannot directly check if a WeakMap or WeakSet is empty! This
    // is a fundamental limitation of WeakMaps and WeakSets due to their design.
    it('should throw error for WeakMap/WeakSet', () => {
      expect(() => isEmpty(new WeakMap())).toThrow(TypeError);
      expect(() => isEmpty(new WeakSet())).toThrow(TypeError);
    });

    it('should return false for Symbol values', () => {
      expect(isEmpty(Symbol())).toBe(false);
      expect(isEmpty(Object(Symbol()))).toBe(false);
      expect(isEmpty(Symbol('test'))).toBe(false);
      expect(isEmpty(Symbol.for('global'))).toBe(false);
      expect(isEmpty(Symbol.iterator)).toBe(false);
      expect(isEmpty(Symbol.toStringTag)).toBe(false);
    });

    it.todo(
      'Decide: if non-primitive built-ins should be included: Date, Error, RegExp, Promise...',
    );
  });
});
