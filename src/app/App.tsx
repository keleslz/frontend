import { ActionBar } from './component/action-bar/ActionBar'
import { Header } from './component/header/Header'
import { Search } from './component/search/Search'
import { ProfileList } from './component/profile-list/ProfileList'
import { useSearch } from './component/search/use-search'
import { useActions } from './component/action-bar/use-actions'

function App() {
  const {
    onChange,
    query,
    error,
    profiles,
    noResults,
    loading,
    state
  } = useSearch()

  const {
    onDelete,
    onDuplicate,
    onSelect,
    onSelectAll,
    toggleEditMode,
    isEditableMode,
    selectedCount
  } = useActions(state)

  return <>
    <Header />

    <Search
      onChange={onChange}
      value={query}
      error={error}
    />

    <ActionBar
      isEditableMode={isEditableMode}
      profiles={profiles}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      onSelectAll={onSelectAll}
      toggleEditMode={toggleEditMode}
      selectedCount={selectedCount}
    />

    <ProfileList
      isLoading={loading}
      items={profiles}
      noResults={noResults}
      onSelect={onSelect}
      isEditableMode={isEditableMode}
    />
  </>
}

export default App
