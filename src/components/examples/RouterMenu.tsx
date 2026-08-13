import React, { useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, type MenuItemData } from '../headless-menu'
import { useIsMobile } from '../../hooks/useIsMobile'
import SideBarMenu from './SideBarMenu'
import BottomMenu from './BottomMenu'

interface RouterMenuItemProps {
  label: string
  to: string
  icon?: ReactNode
}

interface RouterMenuGroupProps {
  label: string
  icon?: ReactNode
  children: ReactNode
}

interface RouterMenuComponent extends React.FC<RouterMenuProps> {
  Item: React.FC<RouterMenuItemProps>
  Group: React.FC<RouterMenuGroupProps>
}

interface RouterMenuProps {
  children: ReactNode
  className?: string
  expandedIds?: Set<string>
  onStateChange?: (state: { expandedIds: Set<string>; activeId: string | null }) => void
}

function findActiveId(items: MenuItemData[], pathname: string): string | null {
  for (const item of items) {
    if (item.url && pathname.startsWith(item.url)) return item.id
    if (item.children) {
      const found = findActiveId(item.children, pathname)
      if (found) return found
    }
  }
  return null
}

function buildItems(children: ReactNode): MenuItemData[] {
  const items: MenuItemData[] = []
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return

    if (child.type === RouterMenuItem) {
      const { label, to, icon } = child.props as RouterMenuItemProps
      items.push({ id: to, label, url: to, icon })
    } else if (child.type === RouterMenuGroup) {
      const { label, icon, children: groupChildren } = child.props as RouterMenuGroupProps
      const groupItems = buildItems(groupChildren)
      items.push({ id: label, label, icon, children: groupItems })
    }
  })
  return items
}

const RouterMenuItem: React.FC<RouterMenuItemProps> = () => null
const RouterMenuGroup: React.FC<RouterMenuGroupProps> = () => null

const RouterMenu: RouterMenuComponent = ({
  children,
  className = '',
  expandedIds,
  onStateChange,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useIsMobile(760)

  const items = useMemo(() => buildItems(children), [children])
  const activeId = useMemo(() => findActiveId(items, location.pathname), [items, location.pathname])

  const handleItemClick = (item: MenuItemData) => {
    if (item.url) navigate(item.url)
  }

  return (
    <Menu
      items={items}
      activeId={activeId}
      expandedIds={expandedIds}
      onStateChange={onStateChange}
    >
      <div className={className}> {/* Используем className */}
        {isMobile ? (
          <BottomMenu items={items} onItemClick={handleItemClick} />
        ) : (
          <SideBarMenu items={items} onItemClick={handleItemClick} />
        )}
      </div>
    </Menu>
  )
}

RouterMenu.Item = RouterMenuItem
RouterMenu.Group = RouterMenuGroup

export default RouterMenu