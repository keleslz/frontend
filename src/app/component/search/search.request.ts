import { GithubListUserClient } from "../../../service/api/github/profile/list/github.list.profile.client";
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

    try {
        const client = new GithubListUserClient()
        const res = await client.request({ q, signal })
        callback({
            status: "loaded",
            values: res.items.map(item => profileResponseToModelMapper(item)),
        })
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            callback({
                status: "idle",
            })
            return;
        }
        callback({
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error"
        })
    }

}   