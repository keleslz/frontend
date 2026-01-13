import type { Profile } from "../../../model/profile";
import type { ProfilesLoadedState, ProfileState } from "../search/profile.state";

type UseActionsProps = {
    profiles: ProfileState,
    setProfiles: (state: ProfileState) => void
};

export const useActions = ({ profiles, setProfiles }: UseActionsProps) => {
    function onSelect(id: number) {
        if (profiles.status !== "loaded") {
            return;
        }
        setProfiles({
            ...profiles,
            values: profiles.values.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
        })
    }

    function onSelectAll() {
        if (profiles.status !== "loaded") {
            return;
        }

        setProfiles({
            ...profiles,
            values: profiles.values.map(p => ({ ...p, selected: true }))
        })
    }

    function onDuplicate() {
        applyOnSelecteds((profileState, selecteds) => {
            const now = Date.now()
            setProfiles({
                ...profileState,
                values: [
                    ...profileState.values.map(p => ({ ...p, selected: false })),
                    ...selecteds.map((profile, i) => ({ ...profile, id: now + i, selected: false })),
                ]
            })
        })
    }

    function onDelete() {
        applyOnSelecteds((profileState) => {
            setProfiles({
                ...profileState,
                values: profileState.values.filter(p => !p.selected)
            })
        })
    }

    function applyOnSelecteds(
        callback: (
            profilesState: ProfilesLoadedState,
            selecteds: Profile[]
        ) => void) {
        if (profiles.status !== "loaded") {
            return;
        }

        const selecteds = profiles.values.filter(p => p.selected)
        if (selecteds.length === 0) {
            return;
        }
        callback(profiles, selecteds)
    }

    return {
        onSelect,
        onDuplicate,
        onDelete,
        onSelectAll,
        isEditableMode: profiles.status === "loaded" && profiles.values.length > 0,
        selectedCount: profiles.status === "loaded" ? profiles.values.filter(p => p.selected).length : 0,
    }
};

