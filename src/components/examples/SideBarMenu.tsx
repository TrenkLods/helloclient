import React, { useCallback, useRef, useState } from 'react'
import { MenuList, type MenuItemData } from '../headless-menu'
import { MenuItemRenderer } from '../headless-menu/MenuItemRenderer'
import { PopupContent } from './PopupContent'
import { BiArea } from 'react-icons/bi'

interface SideBarMenuProps {
  items: MenuItemData[]
  onItemClick?: (item: MenuItemData) => void
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ items, onItemClick }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [popupData, setPopupData] = useState<{ item: MenuItemData; rect: DOMRect } | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPopupHovered = useRef(false)

  const handleShowPopup = useCallback((item: MenuItemData, rect: DOMRect) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setPopupData({ item, rect })
  }, [])

  const handleHidePopup = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      if (!isPopupHovered.current) setPopupData(null)
    }, 200)
  }, [])

  const handlePopupMouseEnter = useCallback(() => {
    isPopupHovered.current = true
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }, [])

  const handlePopupMouseLeave = useCallback(() => {
    isPopupHovered.current = false
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => setPopupData(null), 150)
  }, [])

  const handleItemClick = (item: MenuItemData) => {
    onItemClick?.(item)
    setPopupData(null)
  }

  return (
    <div className="absolute top-0 flex h-screen">
      <nav
        className={`
          h-screen bg-gray-100 border-r border-gray-200 transition-all duration-300 relative
          ${collapsed ? 'w-16' : 'w-64'}
        `}
        style={{ padding: '16px' }}
      >
        <div className="mt-10">
          <MenuList
            items={items}
            renderItem={(item, level) => (
              <MenuItemRenderer
                key={item.id}
                item={item}
                level={level}
                collapsed={collapsed}
                onShowPopup={handleShowPopup}
                onHidePopup={handleHidePopup}
                onItemClick={handleItemClick}
                className="flex items-center px-3 py-2 rounded cursor-pointer transition-colors duration-200"
                activeClassName="bg-slate-300 text-blue-600"
                inactiveClassName="hover:bg-slate-200"
                iconClassName="mr-2"
                labelClassName="flex-1"
                tooltipClassName="fixed z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded pointer-events-none whitespace-nowrap"
                childrenContainerClassName="mb-1"
              />
            )}
          />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute flex items-center justify-center text-2xl bg-transparent border-none cursor-pointer bottom-3"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          >
            <BiArea />
          </button>
        </div>

        {popupData && (
          <div
            className="fixed z-50"
            style={{
              top: popupData.rect.top,
              left: popupData.rect.right + 8,
            }}
          >
            <PopupContent
              group={popupData.item}
              onClose={() => setPopupData(null)}
              onItemClick={handleItemClick}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
            />
          </div>
        )}
      </nav>
    </div>
  )
}

export default SideBarMenu