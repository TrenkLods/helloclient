import React, { type ReactNode } from 'react'
import { MenuProvider } from './MenuContext'
import type { MenuItemData, MenuState } from './types'

interface MenuProps {
    items: MenuItemData[]
    isMobile?: boolean
    children: ReactNode
    expandedIds?: Set<string>
    activeId?: string | null
    onStateChange?: (state: MenuState) => void
}

export const Menu: React.FC<MenuProps> = ({
    items,
    isMobile = false,
    children,
    expandedIds,
    activeId,
    onStateChange,
}) => {
    return (
        <MenuProvider
            items={items}
            isMobile={isMobile}
            expandedIds={expandedIds}
            activeId={activeId}
            onStateChange={onStateChange}
        >

            {children}
        </MenuProvider>
    )
}