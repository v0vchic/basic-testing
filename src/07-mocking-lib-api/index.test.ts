import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockClient = { get: jest.fn().mockResolvedValue({ data: {} }) };
    (axios.create as jest.Mock).mockReturnValue(mockClient);

    await throttledGetDataFromApi('/test');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const mockClient = { get: jest.fn().mockResolvedValue({ data: {} }) };
    (axios.create as jest.Mock).mockReturnValue(mockClient);

    await throttledGetDataFromApi(relativePath);

    expect(mockClient.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const expectedData = { id: 1, title: 'test' };
    const mockClient = { get: jest.fn().mockResolvedValue({ data: expectedData }) };
    (axios.create as jest.Mock).mockReturnValue(mockClient);

    const result = await throttledGetDataFromApi('/test');

    expect(result).toEqual(expectedData);
  });
});