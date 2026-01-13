export function isApiErrorGuardResponse(e: unknown): e is Error {
    return e instanceof Error
}