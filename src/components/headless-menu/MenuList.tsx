import React from 'react'

import type { MenuItemData } from './types'
import { useMenu } from '../../hooks/useMenu'



interface MenuListProps {
    items?: MenuItemData[]
    level?: number
    renderItem: (item: MenuItemData, level: number) => React.ReactNode
}

export const MenuList: React.FC<MenuListProps> = ({ items, level = 0, renderItem }) => {
    const { items: contextItems } = useMenu()
    const listItems = items || contextItems

    if (!listItems || listItems.length === 0) return null

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {listItems.map((item) => (
                <li key={item.id} style={{ margin: 0, padding: 0 }}>
                    {renderItem(item, level)}
                </li>
            ))}
        </ul>
    )
}