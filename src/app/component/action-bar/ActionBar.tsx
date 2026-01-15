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
  toggleEditMode: () => void
  profiles: Profile[]
  selectedCount: number
  isEditableMode: boolean;
}

export const ActionBar = memo(({ toggleEditMode, isEditableMode, selectedCount, onSelectAll, profiles, onDelete, onDuplicate }: ActionBarProps) => {
  return <div className={styles.actionbarContainer}>

    <div className={styles.leftSection}>
      {(isEditableMode && profiles.length > 0) && <>
        <button
          role="button"
          aria-pressed={selectedCount === profiles.length}
          aria-label="Select all profiles"
          onClick={onSelectAll}
          disabled={!isEditableMode}
          className={styles.selectedContainer}
        >{isEditableMode && selectedCount === profiles.length ? <CheckedIcon /> : <NotCheckedIcon />}</button>
        {selectedCount > 0 && <div><span className={styles.selectedCount}>{selectedCount}</span> <span className={styles.countMesage}>elements selected</span></div>}
      </>}
    </div>

    <div className={styles.rightSection}>

      {isEditableMode && profiles.length > 0 && <>
        <button
          role="button"
          aria-label="Delete selected profiles"
          onClick={onDelete}
          disabled={selectedCount === 0 || !isEditableMode}
        ><TrashIcon /></button>

        <button
          role="button"
          aria-label="Duplicate selected profiles"
          onClick={onDuplicate}
          disabled={selectedCount === 0 || !isEditableMode}
        ><DuplicateIcon /></button>
      </>}

      <button
        role="button"
        aria-label="Toggle edit mode"
        onClick={toggleEditMode}
        disabled={profiles.length === 0}
        className="edit-mode"
      >{isEditableMode && profiles.length > 0 ? "Cancel" : "Edit"}</button>
    </div>
  </div >
});