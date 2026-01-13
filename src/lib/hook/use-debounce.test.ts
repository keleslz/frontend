import { test, vi } from "vitest";
import { render, screen } from '@testing-library/react'
import { useDebounce } from "./use-debounce";

test("placeholder test", () => {
    const { debounce } = useDebounce()

    const callback = vi.fn(() => { })
    debounce(callback)
})