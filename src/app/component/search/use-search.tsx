import { useEffect, useRef, useState } from "react";
import { searchRequest } from "./search.request";
import type { ProfileState } from "./profile.state";
import { useDebounce } from "../../../lib/hook/use-debounce";

export const useSearch = () => {
    const [query, setQuery] = useState('')
    const [profiles, setProfiles] = useState<ProfileState>({ status: "idle" })
    const { debounce } = useDebounce()
    const controllerRef = useRef<AbortController | null>(null)

    useEffect(() => {
        controllerRef.current = new AbortController()
        return () => controllerRef.current?.abort()
    }, [])

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setQuery(value)

        if (controllerRef.current) {
            controllerRef.current.abort()
            controllerRef.current = new AbortController
        }

        debounce(async () => await searchRequest({
            q: value,
            callback: setProfiles,
            signal: controllerRef.current?.signal,
        }))
    }

    return {
        onChange,
        query,
        profiles: profiles.status === "loaded" ? profiles.values : [],
        error: profiles.status === "error" ? profiles.message : null,
        noResults: query.trim().length > 0 && profiles.status === "loaded" && profiles.values.length === 0,
        loading: profiles.status === "loading",
        status: profiles.status,
        state: {
            profiles,
            setProfiles,
        }
    }
};

