import type { Profile } from "../../../model/profile";
import type { ListUserClientOutputData } from "../../../service/api/github/profile/list/github.list.profile.output";

export function profileResponseToModelMapper(response: ListUserClientOutputData['items'][number]): Profile {
    return {
        avatar: {
            src: response.avatar_url,
        },
        id: response.id,
        login: response.login,
        link: response.html_url,
        selected: false,
    }
}