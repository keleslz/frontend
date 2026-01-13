import { memo } from "react";
import { SearchInput } from "../../../component/search-input/SearchInput";
import styles from "./Search.module.css"

type SearchProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string;
    error: string | null
}

export const Search = memo(({ onChange, error, value }: SearchProps) => {
    return <div
        className={styles.container}
    >
        <form
            className={styles.inputContainer}
        >
            <SearchInput
                name="search-input"
                placeholder="my-username"
                value={value}
                onChange={onChange}
                className={styles.input}
            />
            {error && <small className={styles.error}>{error}</small>}
        </form>
    </div>
})