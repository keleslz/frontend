import { memo } from "react"
import { LoaderCircle } from "../../../component/icon/loader-circle/LoaderCircle"
import type { Profile } from "../../../model/profile"
import { ProfileListItem } from "./profile-list-item/ProfileListItem"
import styles from "./ProfileList.module.css"

type ProfileListProps = {
    items: Profile[]
    isLoading: boolean
    noResults: boolean;
    onSelect: (id: number) => void,
    isEditableMode: boolean
}

export const ProfileList = memo(({ isEditableMode, onSelect, items, isLoading, noResults }: ProfileListProps) => {

    return <ul className={styles.container}>
        {!isLoading && items.map((profile) => <li key={profile.id}>
            <ProfileListItem
                profile={profile}
                onSelect={onSelect}
                isEditableMode={isEditableMode}
            />
        </li>)}
        <LoaderCircle className={styles.loader} active={isLoading} />
        {noResults && <div className="no-result-message">No results</div>}
    </ul>
})