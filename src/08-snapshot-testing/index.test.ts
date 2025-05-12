import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };
    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const elements = [3, 4, 5];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});