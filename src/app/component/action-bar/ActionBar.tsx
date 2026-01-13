import styles from "./ActionBar.module.css"
import { DuplicateIcon } from "../../../component/icon/DuplicateIcon";
import { TrashIcon } from "../../../component/icon/TrashIcon";
import { CheckedIcon } from "../../../component/icon/CheckedIcon";
import { memo } from "react";
import { NotCheckedIcon } from "../../../component/icon/NotCheckedIcon";
import type { Profile } from "../../../model/profile";

type ActionBarProps = {
  onDelete: () => void
  onDuplicate: () => void
  onSelectAll: () => void
  profiles: Profile[]
  selectedCount: number
  isEditableMode: boolean;
}

export const ActionBar = memo(({ isEditableMode, selectedCount, onSelectAll, profiles, onDelete, onDuplicate }: ActionBarProps) => {
  return <div className={styles.container}>

    <div className={styles.leftSection}>
      {isEditableMode && <>
        <button
          role="button"
          aria-pressed={selectedCount === profiles.length}
          aria-label="Select all profiles"
          onClick={onSelectAll}
          className={styles.selectedContainer}
        >{selectedCount === profiles.length ? <CheckedIcon /> : <NotCheckedIcon />}</button>
        {selectedCount > 0 && <div><span className={styles.selectedCount}>{selectedCount}</span> <span className={styles.countMesage}>selected items</span></div>}
      </>}
    </div>

    <div className={styles.rightSection}>
      {isEditableMode && <>
        <button
          role="button"
          aria-label="Delete selected profiles"
          onClick={onDelete}
          disabled={selectedCount === 0}
        ><TrashIcon /></button>

        <button
          role="button"
          aria-label="Duplicate selected profiles"
          onClick={onDuplicate}
          disabled={selectedCount === 0}
        ><DuplicateIcon /></button>
      </>}
    </div>
  </div>
});