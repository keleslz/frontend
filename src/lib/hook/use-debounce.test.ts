import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from '@testing-library/react'
import { useDebounce } from "./use-debounce";

describe("use debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();
  })

  it("should call the callback after 500ms", async () => {

    const { result, unmount } = renderHook(() => useDebounce());
    const callbackMock = vi.fn();

    result.current.debounce(callbackMock);

    expect(callbackMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(callbackMock).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("should reset the timer if debounce is called again before the delay", () => {
    const { result } = renderHook(() => useDebounce());
    const callbackMock = vi.fn();

    result.current.debounce(callbackMock);
    vi.advanceTimersByTime(300);

    result.current.debounce(callbackMock);
    vi.advanceTimersByTime(499);

    expect(callbackMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  it("should clear timeout on unmount", () => {
    const { result, unmount } = renderHook(() => useDebounce());
    const callbackMock = vi.fn();

    result.current.debounce(callbackMock);
    unmount();

    vi.runAllTimers();

    expect(callbackMock).not.toHaveBeenCalled();
  });
})