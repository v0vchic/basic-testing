import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  describe('valid operations', () => {
    const testCases = [
      { a: 1, b: 2, action: Action.Add, expected: 3 },
      { a: 2, b: 2, action: Action.Add, expected: 4 },
      { a: 5, b: 3, action: Action.Subtract, expected: 2 },
      { a: 10, b: 4, action: Action.Subtract, expected: 6 },
      { a: 5, b: 3, action: Action.Multiply, expected: 15 },
      { a: 2, b: 4, action: Action.Multiply, expected: 8 },
      { a: 6, b: 3, action: Action.Divide, expected: 2 },
      { a: 8, b: 2, action: Action.Divide, expected: 4 },
      { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
      { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    ];

    test.each(testCases)(
      'given $a and $b with $action, returns $expected',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });

  describe('invalid action', () => {
    const testCases = [
      { a: 5, b: 3, action: '%', expected: null },
      { a: 2, b: 3, action: 'invalid', expected: null },
      { a: 4, b: 2, action: 123, expected: null },
    ];

    test.each(testCases)(
      'given action $action, returns $expected',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });

  describe('invalid arguments', () => {
    const testCases = [
      { a: '5', b: 3, action: Action.Add, expected: null },
      { a: 5, b: '3', action: Action.Subtract, expected: null },
      { a: true, b: 3, action: Action.Multiply, expected: null },
      { a: null, b: 5, action: Action.Divide, expected: null },
    ];

    test.each(testCases)(
      'given a: $a (type: ${typeof a}) and b: $b (type: ${typeof b}), returns $expected',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });
});