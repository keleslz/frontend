import { describe, expect, it } from "vitest";
import type { ListUserClientOutputData } from "../../../service/api/github/profile/list/github.list.profile.output";
import { profileResponseToModelMapper } from "./profile.response.to.model.mapper";
import type { Profile } from "../../../model/profile";

describe('Profile response to model mapper', () => {
    it("should convert github list user item to model", () => {
        const mockData: ListUserClientOutputData['items'][number] = {
            login: "dummy-login",
            id: 1,
            avatar_url: "dummy-avatar-url",
            html_url: "dummy-html-url",
        }

        const model = profileResponseToModelMapper(mockData)

        expect(model).toStrictEqual({
            avatar: {
                src: mockData.avatar_url,
            },
            id: mockData.id,
            login: mockData.login,
            link: mockData.html_url,
            selected: false
        } as Profile)
    })

})