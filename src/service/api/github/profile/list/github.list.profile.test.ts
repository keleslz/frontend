import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GithubListUserClient } from './github.list.profile.client';

describe('GithubListUserClient', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should call fetch with correct URL and abort signal', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        status: 200,
        headers: { get: () => '1' },
        json: () =>
          Promise.resolve({
            total_count: 0,
            incomplete_results: false,
            items: [],
          }),
      })
    );

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const signalMock = {} as AbortSignal;

    const client = new GithubListUserClient();
    const query = 'test-user';
    await client.request({ q: query, signal: signalMock });

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=${query}`,
      {
        method: 'GET',
        signal: signalMock,
      }
    );
  });

  it('should throw a rate limit error on 429 response', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        status: 429,
        headers: { get: () => '1' },
      })
    )

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new GithubListUserClient();

    await expect(client.request({ q: 'user' })).rejects.toThrowError("Max request reached");
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should throw a rate limit error on 403 response', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        status: 403,
        headers: { get: () => '1' },
      })
    )

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new GithubListUserClient();

    await expect(client.request({ q: 'user' })).rejects.toThrowError("Max request reached");
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should throw a rate limit error when x-ratelimit-remaining header equal to 0', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        status: 200,
        headers: { get: () => '0' },
      })
    )

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new GithubListUserClient();

    await expect(client.request({ q: 'user' })).rejects.toThrowError("Max request reached");
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should throw an error on a non-200 response', async () => {
    const statusTextMessage = "Internal Server Error"
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        status: 500,
        statusText: statusTextMessage,
        headers: { get: () => '1' },
      })
    )
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new GithubListUserClient();

    await expect(client.request({ q: 'user' })).rejects.toThrowError(statusTextMessage);
    expect(fetchMock).toHaveBeenCalled();
  });

  it('should parse successful response', async () => {
    const successMockResponse = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          login: 'user',
          id: 1,
          avatar_url: 'http://dummy-avatar.com',
          html_url: 'http://dummy-url.com',
        },
      ],
    };

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        status: 200,
        headers: { get: () => '1' },
        json: () => Promise.resolve(successMockResponse),
      })
    )

    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new GithubListUserClient();
    const res = await client.request({ q: 'user' });

    expect(fetchMock).toHaveBeenCalled();
    expect(res).toEqual(successMockResponse);
  });
})