import type { Profile } from "../../../model/profile"

export type ProfilesIdleState = {
    status: 'idle'
}

export type ProfilesLoadingState = {
    status: 'loading',
}

export type ProfileLoadingErrorState = {
    status: "error",
    message: string
}

export type ProfilesLoadedState = {
    status: 'loaded',
    values: Profile[]
}

export type ProfileState =
    (ProfilesIdleState |
        ProfilesLoadingState |
        ProfileLoadingErrorState |
        ProfilesLoadedState)