import { GithubListUserClient } from "../../../service/api/github/profile/list/github.list.profile.client";
import { isApiErrorGuardResponse } from "../../../service/api/guard/is-api-error-guard";
import { profileResponseToModelMapper } from "./profile.response.to.model.mapper";
import type { ProfileState } from "./profile.state";

type SearchRequestParams = {
    q: string;
    callback: (state: ProfileState) => void;
    signal?: AbortSignal;
}

export async function searchRequest({ q, callback, signal }: SearchRequestParams) {

    if (!q) {
        callback({
            status: "idle",
        })
        return;
    }
    
    callback({
        status: "loading",
    })
    
    const client = new GithubListUserClient()
    const res = await client.request({ q, signal })

    if (isApiErrorGuardResponse(res)) {
        callback({
            status: "error",
            message: res.message
        })
        return;
    }

    callback({ status: "loaded", values: res.items.map(item => profileResponseToModelMapper(item)) })
}   