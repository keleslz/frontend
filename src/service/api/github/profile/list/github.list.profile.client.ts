import { ApiClient } from "../../../../api.client";
import type { ListUserClientInputData } from "./github.list.profile.input";
import type { ListUserClientOutputData } from "./github.list.profile.output";

export class GithubListUserClient extends ApiClient<ListUserClientInputData, ListUserClientOutputData> {
    async request(input: ListUserClientInputData): Promise<ListUserClientOutputData | Error> {
        try {
            const data = await fetch(`https://api.github.com/search/users?q=${input.q}`, {
                method: 'GET',
                signal: input.signal,
            })

            const rateLimitRemaining = data.headers.get('x-ratelimit-remaining');
            if (
                [403, 429].includes(data.status) &&
                rateLimitRemaining && Number(rateLimitRemaining) === 0
            ) {
                throw new Error("Max request reached")
            }

            if (data.status !== 200) {
                throw new Error(data.statusText)
            }

            return await data.json()
        } catch (error) {
            if (error instanceof Error) {
                return error;
            }

            return new Error(JSON.stringify(error))
        }
    }

}