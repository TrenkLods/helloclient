

export type MenuItemData = {
    id: string
    label: string
    url?: string
    icon?: React.ReactNode
    children?: MenuItemData[]
}


export type MenuState = {
    expandedIds: Set<string>
    activeId: string | null
}


export type MenuAction =
    | { type: 'TOGGLE_EXPAND'; id: string }
    | { type: 'EXPAND'; id: string }
    | { type: 'COLLAPSE'; id: string }
    | { type: 'SET_ACTIVE'; id: string }
    | { type: 'COLLAPSE_ALL' }

