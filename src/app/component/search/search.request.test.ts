import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ListUserClientOutputData } from "../../../service/api/github/profile/list/github.list.profile.output";
import type { ProfileLoadingErrorState, ProfilesLoadedState } from "./profile.state";

const mocks = vi.hoisted(() => {
    return {
        GithubListUserClient: vi.fn(),
    }
})

vi.mock('../../../service/api/github/profile/list/github.list.profile.client', () => {
    return {
        GithubListUserClient: mocks.GithubListUserClient,
    }
})

describe("search request", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.resetAllMocks()
        vi.resetModules()
    })

    it("should handle empty query", async () => {
        const mockCallback = vi.fn()

        const { searchRequest } = await import('./search.request')
        await searchRequest({
            q: "",
            callback: mockCallback,
        })

        expect(mockCallback).toHaveBeenCalledOnce();
        expect(mockCallback).toHaveBeenCalledWith({ status: "idle" });
    })

    it("should call callback with loading then loaded states", async () => {
        const mockCallback = vi.fn()

        const mockResponse = {
            total_count: 1,
            incomplete_results: false,
            items: [
                {
                    login: "dummy-login",
                    id: 1,
                    avatar_url: "dummy-avatar-url",
                    html_url: "dummy-html-url",
                }
            ],
        } as ListUserClientOutputData

        const { GithubListUserClient } = await import("../../../service/api/github/profile/list/github.list.profile.client");
        GithubListUserClient.prototype.request = () => Promise.resolve(mockResponse)

        const { searchRequest } = await import('./search.request')

        await searchRequest({
            q: "test",
            callback: mockCallback,
        })

        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(1, {
            status: "loading",
        });

        expect(mockCallback).toHaveBeenNthCalledWith(2, {
            status: "loaded",
            values: [{
                avatar: {
                    src: mockResponse.items[0].avatar_url,
                },
                id: mockResponse.items[0].id,
                link: mockResponse.items[0].html_url,
                login: mockResponse.items[0].login,
                selected: false

            }]
        } as ProfilesLoadedState)
    })

    it('should call callback with loading then error state', async () => {
        const mockCallback = vi.fn()

        const { GithubListUserClient } = await import("../../../service/api/github/profile/list/github.list.profile.client");
        GithubListUserClient.prototype.request = () => {
            throw new Error("A dummy error")
        }

        const { searchRequest } = await import('./search.request')

        await searchRequest({
            q: "test",
            callback: mockCallback,
        })

        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(1, {
            status: "loading",
        });

        expect(mockCallback).toHaveBeenNthCalledWith(2, {
            status: "error",
            message: "A dummy error"
        } as ProfileLoadingErrorState)
    })
})