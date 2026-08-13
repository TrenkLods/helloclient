import React from 'react'
import type { MenuItemData } from '../headless-menu'
import { MenuItemRenderer } from '../headless-menu/MenuItemRenderer'

interface PopupContentProps {
  group: MenuItemData
  onClose: () => void
  onItemClick: (item: MenuItemData) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const PopupContent: React.FC<PopupContentProps> = ({
  group,
  onClose,
  onItemClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className="
        bg-white rounded-lg p-3 border border-gray-200
        shadow-md min-w-[180px] max-w-full pointer-events-auto
      "
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mb-2 text-sm font-bold">{group.label}</div>
      <ul className="p-0 m-0 list-none">
        {group.children?.map((child) => (
          <li key={child.id} className="py-1">
            <MenuItemRenderer
              item={child}
              level={1}
              onItemClick={(item) => {
                onItemClick(item)
                onClose()
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}