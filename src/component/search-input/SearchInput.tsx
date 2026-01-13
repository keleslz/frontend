import type { ComponentProps } from "react";
import styles from "./SearchInput.module.css"

type SearchInputProps = ComponentProps<"input">;

export const SearchInput = (props: SearchInputProps) => {
  const className = [styles.searchInput]
  if (props.className) {
    className.push(props.className)
  }

  return <input {...props}
    type="search"
    role="searchbox"
    aria-label="Search GitHub users"
    className={className.join(' ')} />
};