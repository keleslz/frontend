import { memo } from "react"
import styles from "./Header.module.css"

export const  Header = memo(() => {
    return <header className={styles.container}>
        <h1>Github Search</h1>
    </header>
})