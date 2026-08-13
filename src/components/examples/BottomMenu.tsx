import React, { useState } from 'react'
import { type MenuItemData } from '../headless-menu'
import { PopupContent } from './PopupContent'
import { BiWindowClose } from 'react-icons/bi'
import { useMenu } from '../../hooks/useMenu'

const MobileNavItem: React.FC<{
  item: MenuItemData
  onGroupClick: (item: MenuItemData) => void
  onItemClick: (item: MenuItemData) => void
}> = ({ item, onGroupClick, onItemClick }) => {
  const { isActive, setActive } = useMenu()
  const active = isActive(item.id)
  const hasChildren = item.children && item.children.length > 0

  const handleClick = () => {
    if (hasChildren) {
      onGroupClick(item)
    } else {
      setActive(item.id)
      onItemClick(item)
    }
  }

  return (
    <div
      className={`
        flex flex-col items-center justify-center px-2 py-1 rounded-lg cursor-pointer
        min-w-[56px] transition-colors duration-200 select-none
        ${active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}
      `}
      onClick={handleClick}
    >
      <div className="text-2xl leading-none">
        {item.icon || <span className="font-medium">{item.label.charAt(0)}</span>}
      </div>
      <span className="text-[11px] mt-0.5 text-center whitespace-nowrap">
        {item.label}
      </span>
    </div>
  )
}

interface BottomMenuProps {
  items: MenuItemData[]
  onItemClick?: (item: MenuItemData) => void
}

const BottomMenu: React.FC<BottomMenuProps> = ({ items, onItemClick }) => {
  const [selectedGroup, setSelectedGroup] = useState<MenuItemData | null>(null)

  const handleItemClick = (item: MenuItemData) => {
    onItemClick?.(item)
  }

  return (
    <>
      <nav
        className="
          fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
          px-1 py-1.5 z-50 overflow-x-auto flex justify-around items-center
          min-h-[64px] gap-0.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]
          scrollbar-thin scrollbar-thumb-gray-300
        "
      >
        {items.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            onGroupClick={(group) => setSelectedGroup(group)}
            onItemClick={handleItemClick}
          />
        ))}
      </nav>

      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedGroup(null)
          }}
        >
          <div
            className="
              w-full max-h-[70vh] overflow-y-auto bg-white
              rounded-t-2xl px-4 pt-4 pb-6
              shadow-[0_-4px_20px_rgba(0,0,0,0.15)]
              animate-slideUp relative
            "
          >
            <button
              onClick={() => setSelectedGroup(null)}
              className="absolute text-2xl text-gray-500 transition-colors top-3 right-4 hover:text-gray-700"
              aria-label="Закрыть"
            >
              <BiWindowClose />
            </button>
            <PopupContent
              group={selectedGroup}
              onClose={() => setSelectedGroup(null)}
              onItemClick={(item) => {
                handleItemClick(item)
                setSelectedGroup(null)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default BottomMenu