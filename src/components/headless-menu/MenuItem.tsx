import React from 'react'


import { MenuList } from './MenuList'
import type { MenuItemData } from './types'
import { useMenu } from '../../hooks/useMenu'

interface MenuItemProps {
    item: MenuItemData
    level?: number
    renderItem: (item: MenuItemData, level: number) => React.ReactNode
    children: (props: {
        item: MenuItemData
        level: number
        expanded: boolean
        active: boolean
        hasChildren: boolean | undefined
        toggle: () => void
        setActive: () => void
    }) => React.ReactNode
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, level = 0, renderItem, children }) => {
    const { isExpanded, toggleExpand, setActive, isActive } = useMenu()
    const expanded = isExpanded(item.id)
    const active = isActive(item.id)
    const hasChildren = item.children && item.children.length > 0

    const handleToggle = () => toggleExpand(item.id)
    const handleSetActive = () => setActive(item.id)

    return (
        <>
            {children({
                item,
                level,
                expanded,
                active,
                hasChildren,
                toggle: handleToggle,
                setActive: handleSetActive,
            })}
            {hasChildren && expanded && (
                <MenuList items={item.children} level={level + 1} renderItem={renderItem} />
            )}
        </>
    )
}