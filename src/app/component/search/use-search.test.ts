import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSearch } from "./use-search";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { searchRequest } from "./search.request";
import type { ProfileState } from "./profile.state";

vi.mock("./search.request", () => ({
    searchRequest: vi.fn(),
}))


describe('Use Search', () => {
    beforeEach(() => {
        vi.useFakeTimers(); 
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should update query value on change and make request on change', async () => {
        const { result } = renderHook(() => useSearch());

        act(() => {
            result.current.onChange({
                target: { value: 'test' }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.query).toBe('test');

        vi.advanceTimersByTime(500);

        expect(searchRequest).toHaveBeenCalledWith({
            q: "test",
            callback: result.current.state.setProfiles,
            signal: expect.any(AbortSignal),
        });
    })

    it('should have initials value on idle state', () => {
        const { result } = renderHook(() => useSearch());
        const mockState: ProfileState = { status: 'idle' };
        
        act(() => {
            result.current.state.setProfiles(mockState);
        });

        expect(result.current.query).toBe('');
        expect(result.current.profiles).toEqual([]);
        expect(result.current.error).toBeNull();
        expect(result.current.noResults).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.status).toBe(mockState.status);
        expect(result.current.state.profiles).toEqual(mockState);
    })

    it('should have values on loading state', () => {
        const { result } = renderHook(() => useSearch());
        const mockState: ProfileState = { status: 'loading' };
        act(() => {
            result.current.state.setProfiles(mockState);
        });

        expect(result.current.profiles).toEqual([]);
        expect(result.current.error).toBeNull();
        expect(result.current.noResults).toBe(false);
        expect(result.current.loading).toBe(true);
        expect(result.current.status).toBe(mockState.status);
        expect(result.current.state.profiles).toEqual(mockState);
    });

    it('should have values on loaded state', () => {
        const { result } = renderHook(() => useSearch());

        const mockState: ProfileState = {
            status: 'loaded',
            values: [
                {
                    avatar: {
                        src: 'https://example.com/avatar1.png',
                        alt: 'Avatar 1'
                    },
                    id: 1,
                    link: 'https://dummy.com/profile/1',
                    login: 'user1',
                    selected: false,
                }
            ]
        };
        act(() => {
            result.current.state.setProfiles(mockState);
        });

        expect(result.current.profiles).toEqual(mockState.values);
        expect(result.current.error).toBeNull();
        expect(result.current.noResults).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.status).toBe('loaded');
        expect(result.current.state.profiles).toEqual(mockState);
    });

    it('should have values on loaded state with no data', () => {
        const { result } = renderHook(() => useSearch());

        const mockState: ProfileState = {
            status: 'loaded',
            values: []
        };
        act(() => {
            result.current.state.setProfiles(mockState);
        });

        expect(result.current.profiles).toEqual(mockState.values);
        expect(result.current.error).toBeNull();
        expect(result.current.noResults).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.status).toBe('loaded');
        expect(result.current.state.profiles).toEqual(mockState);
    });

    it('should have values on error state', () => {
        const { result } = renderHook(() => useSearch());

        const mockState: ProfileState = {
            status: 'error',
            message: 'An error occurred',
        };

        act(() => {
            result.current.state.setProfiles(mockState);
        });

        expect(result.current.profiles).toEqual([]);
        expect(result.current.error).toBe(mockState.message);
        expect(result.current.noResults).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.status).toBe(mockState.status);
        expect(result.current.state.profiles).toBe(mockState);
    });
});