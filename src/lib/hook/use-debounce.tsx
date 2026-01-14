import { useEffect, useRef } from "react";

export const useDebounce = () => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = null;
        }
    }, [])

    function debounce(callback: () => void) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(callback, 500)
    }

    return { debounce }
};

