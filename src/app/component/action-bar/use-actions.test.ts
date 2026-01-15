import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useActions } from "./use-actions";
import type { ProfilesLoadedState, ProfileState } from "../search/profile.state";
import { act } from "react";

describe('Use actions', () => {
    it('should select unselected profile', () => {
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: [{
                avatar: {
                    src: "dummy-avatar-url",
                },
                id: 1,
                login: "dummy-login",
                link: "dummy-html-url",
                selected: false
            }]
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn(),
        }

        const { result } = renderHook(() => useActions(params));
        act(() => {
            result.current.onSelect(1)
        })

        expect(params.setProfiles).toHaveBeenCalledWith({
            status: "loaded",
            values: [{
                avatar: {
                    src: "dummy-avatar-url",
                },
                id: 1,
                login: "dummy-login",
                link: "dummy-html-url",
                selected: true,
            }]
        } as ProfileState)

    })

    it('should unselect selected profile', () => {
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: [
                {
                    avatar: {
                        src: "dummy-avatar-url",
                    },
                    id: 1,
                    login: "dummy-login",
                    link: "dummy-html-url",
                    selected: true
                }
            ]
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn(),
        }

        const { result } = renderHook(() => useActions(params));
        act(() => {
            result.current.onSelect(1)
        })

        expect(params.setProfiles).toHaveBeenCalledWith({
            status: "loaded",
            values: [{
                avatar: {
                    src: "dummy-avatar-url",
                },
                id: 1,
                login: "dummy-login",
                link: "dummy-html-url",
                selected: false,
            }]
        } as ProfileState)

    })

    it('should select all profiles', () => {
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: [
                {
                    avatar: {
                        src: "dummy-avatar-url",
                    },
                    id: 1,
                    login: "dummy-login",
                    link: "dummy-html-url",
                    selected: false
                }, {
                    avatar: {
                        src: "dummy-avatar-url",
                    },
                    id: 12,
                    login: "dummy-login",
                    link: "dummy-html-url",
                    selected: false
                },
            ]
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result } = renderHook(() => useActions(params));
        act(() => {
            result.current.onSelectAll()
        })

        expect(params.setProfiles).toHaveBeenCalledWith({
            status: "loaded",
            values: profileStateMock.values.map(p => ({ ...p, selected: true }))
        } as ProfileState)

    })

    it('should only duplicate selected profiles', () => {
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: [
                {
                    avatar: {
                        src: "dummy-avatar-url-1",
                    },
                    id: 1,
                    login: "dummy-login-1",
                    link: "dummy-html-url-1",
                    selected: false
                },
                {
                    avatar: {
                        src: "dummy-avatar-url-2",
                    },
                    id: 2,
                    login: "dummy-login-2",
                    link: "dummy-html-url-2",
                    selected: true
                },
            ]
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result } = renderHook(() => useActions(params));

        vi.useFakeTimers()
        const now = Date.now()
        vi.setSystemTime(now)

        act(() => {
            result.current.onDuplicate()
        })

        expect(params.setProfiles).toHaveBeenCalledExactlyOnceWith({
            status: "loaded",
            values: [
                ...profileStateMock.values.map(p => ({ ...p, selected: false })),
                {
                    ...profileStateMock.values[1],
                    id: now,
                    selected: false
                },
            ]
        } as ProfileState)
        vi.useRealTimers()
    })

    it('should only delete selected profiles', () => {
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: [
                {
                    avatar: {
                        src: "dummy-avatar-url-1",
                    },
                    id: 1,
                    login: "dummy-login-1",
                    link: "dummy-html-url-1",
                    selected: true
                },
                {
                    avatar: {
                        src: "dummy-avatar-url-2",
                    },
                    id: 2,
                    login: "dummy-login-2",
                    link: "dummy-html-url-2",
                    selected: false
                },
            ]
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result } = renderHook(() => useActions(params));

        act(() => {
            result.current.onDelete()
        })

        expect(params.setProfiles).toHaveBeenCalledExactlyOnceWith({
            status: "loaded",
            values: profileStateMock.values.filter(p => !p.selected),
        } as ProfileState)
    })

    it('should count selected profiles', () => {
        const profiles = [{
            avatar: {
                src: "dummy-avatar-url-1",
            },
            id: 1,
            login: "dummy-login-1",
            link: "dummy-html-url-1",
            selected: true
        },
        {
            avatar: {
                src: "dummy-avatar-url-2",
            },
            id: 2,
            login: "dummy-login-2",
            link: "dummy-html-url-2",
            selected: false
        }]
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: []
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result, rerender } = renderHook(() => useActions(params));

        expect(result.current.selectedCount).equal(0);

        (params.profiles as unknown as ProfilesLoadedState).values = profiles
        rerender(params)
        expect(result.current.selectedCount).toBe(1);
    })

    it('should have count equals 0 while not in loaded state', () => {
        const profileStateMock: ProfileState = {
            status: "idle",
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result, rerender } = renderHook(() => useActions(params));

        expect(result.current.selectedCount).toBe(0)


        params.profiles.status = "loading";
        rerender(params)
        expect(result.current.selectedCount).toBe(0)


        params.profiles.status = "error";
        rerender(params)
        expect(result.current.selectedCount).toBe(0)
    })

    it('should have editable mode at false while not in loaded state', () => {
        const profileStateMock: ProfileState = {
            status: "idle",
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result, rerender } = renderHook(() => useActions(params));

        expect(result.current.isEditableMode).toBe(false)

        params.profiles.status = "loading"
        rerender(params)
        expect(result.current.isEditableMode).toBe(false)


        params.profiles.status = "error"
        rerender(params)
        expect(result.current.isEditableMode).toBe(false)
    })

    it('should have editable mode at false when no search results', () => {
        const profileStateMock: ProfileState = {
            status: "loaded",
            values: []
        }

        const params: Parameters<typeof useActions>[number] = {
            profiles: profileStateMock,
            setProfiles: vi.fn()
        }

        const { result } = renderHook(() => useActions(params));
        expect(result.current.isEditableMode).toBe(false)
    })
})