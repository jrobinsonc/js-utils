import { describe, it, expect } from '@jest/globals';
import { isEmpty } from '@/isEmpty';

describe('isEmpty', () => {
  describe('boolean values', () => {
    it('should return false for boolean values', () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
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
    });

    it('should return false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty('  hello  ')).toBe(false);
      expect(isEmpty('0')).toBe(false);
    });
  });

  describe('numbers', () => {
    it('should return true for NaN', () => {
      expect(isEmpty(NaN)).toBe(true);
      expect(isEmpty(Number.NaN)).toBe(true);
    });

    it('should return false for valid numbers including zero', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(3.14)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('should return true for empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should return false for non-empty arrays', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty([''])).toBe(false);
      expect(isEmpty([null])).toBe(false);
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

    it('should return false for non-empty objects', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty({ empty: '' })).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should throw error for unsupported types', () => {
      expect(() =>
        isEmpty(() => {
          /* empty function */
        }),
      ).toThrow();
      expect(() => isEmpty(Symbol('test'))).toThrow();
    });
  });
});
