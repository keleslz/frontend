import styles from "./ProfileListItem.module.css"
import type { Profile } from "../../../../model/profile";

type ProfileListItemProps = {
    profile: Profile
    onSelect: (id: number) => void
    isEditableMode: boolean
}

export function ProfileListItem({ isEditableMode, profile, onSelect }: ProfileListItemProps) {
    const { id, link, login, avatar, selected } = profile
    return <div className={styles.profileListItemContainer} >
        {isEditableMode && <input
            checked={selected}
            onChange={() => onSelect(id)}
            className={styles.checkbox}
            type="checkbox"
        />}
        <img
            className={styles.avatar}
            src={avatar.src}
            width={40}
            height={40}
            alt={avatar.alt}
        />
        <div className={styles.id}>{id}</div>
        <div className={styles.login}>{login}</div>
        <a
            role="link"
            onClick={(e) => e.stopPropagation()}
            href={link}
            target="_blank"
            className={styles.button}
            aria-label="View GitHub profile (opens in a new tab)"
        >View profile</a>
    </div>
}