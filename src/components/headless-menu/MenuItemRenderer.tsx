import React, { useState, useRef, useEffect } from 'react'
import { MenuItem, type MenuItemData } from '../headless-menu'
import { useMenu } from '../../hooks/useMenu'

interface MenuItemRendererProps {
    item: MenuItemData
    level: number
    collapsed?: boolean
    onShowPopup?: (item: MenuItemData, rect: DOMRect) => void
    onHidePopup?: () => void
    onItemClick?: (item: MenuItemData) => void


    className?: string
    activeClassName?: string
    inactiveClassName?: string
    iconClassName?: string
    labelClassName?: string
    tooltipClassName?: string
    childrenContainerClassName?: string
}

export const MenuItemRenderer: React.FC<MenuItemRendererProps> = ({
    item,
    level,
    collapsed = false,
    onShowPopup,
    onHidePopup,
    onItemClick,
    className = '',
    activeClassName = '',
    inactiveClassName = '',
    iconClassName = '',
    labelClassName = '',
    tooltipClassName = '',
    childrenContainerClassName = '',
}) => {
    const { state, toggleExpand, setActive } = useMenu()
    const activeId = state.activeId
    const [showTooltip, setShowTooltip] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)
    const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current)
        }
    }, [])

    const hasChildren = item.children && item.children.length > 0

    const isActiveOrChild = (id: string, activeId: string | null): boolean => {
        if (!activeId) return false
        if (id === activeId) return true
        const findChild = (children?: MenuItemData[]): boolean => {
            if (!children) return false
            for (const child of children) {
                if (child.id === activeId) return true
                if (child.children && findChild(child.children)) return true
            }
            return false
        }
        return findChild(item.children)
    }

    const activeOrChild = isActiveOrChild(item.id, activeId)

    const handleClick = () => {
        if (collapsed) {
            if (!hasChildren) {
                setActive(item.id)
                onItemClick?.(item)
            }
        } else {
            if (hasChildren) {
                toggleExpand(item.id)
            } else {
                setActive(item.id)
                onItemClick?.(item)
            }
        }
    }

    const handleMouseEnter = () => {
        if (collapsed) {
            if (hasChildren) {
                const rect = elementRef.current?.getBoundingClientRect()
                if (rect && onShowPopup) {
                    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current)
                    onShowPopup(item, rect)
                }
                setShowTooltip(false)
            } else {
                if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current)
                tooltipTimerRef.current = setTimeout(() => setShowTooltip(true), 100)
            }
        }
    }

    const handleMouseLeave = () => {
        if (collapsed) {
            if (hasChildren) {
                onHidePopup?.()
            } else {
                if (tooltipTimerRef.current) {
                    clearTimeout(tooltipTimerRef.current)
                    tooltipTimerRef.current = null
                }
                setShowTooltip(false)
            }
        }
    }

    const combinedClassName = [
        className,
        activeOrChild ? activeClassName : inactiveClassName,
    ].filter(Boolean).join(' ')

    if (collapsed && level === 0) {
        return (
            <div
                ref={elementRef}
                className={combinedClassName}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.icon ? (
                    <span className={iconClassName}>{item.icon}</span>
                ) : (
                    <span className={iconClassName}>{item.label.charAt(0)}</span>
                )}

                {!hasChildren && showTooltip && (
                    <div
                        className={tooltipClassName}
                        style={{
                            position: 'fixed',
                            left: (elementRef.current?.getBoundingClientRect().right || 0) + 8,
                            top: (elementRef.current?.getBoundingClientRect().top || 0) +
                                (elementRef.current?.getBoundingClientRect().height || 0) / 2,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {item.label}
                    </div>
                )}
            </div>
        )
    }

    return (
        <MenuItem item={item} level={level} renderItem={(child, lvl) => (
            <MenuItemRenderer
                key={child.id}
                item={child}
                level={lvl}
                collapsed={collapsed}
                onShowPopup={onShowPopup}
                onHidePopup={onHidePopup}
                onItemClick={onItemClick}
                className={className}
                activeClassName={activeClassName}
                inactiveClassName={inactiveClassName}
                iconClassName={iconClassName}
                labelClassName={labelClassName}
                tooltipClassName={tooltipClassName}
                childrenContainerClassName={childrenContainerClassName}
            />
        )}>
            {({ expanded, hasChildren: hc }) => (
                <div className={childrenContainerClassName}>
                    <div
                        ref={elementRef}
                        className={combinedClassName}
                        onClick={handleClick}
                        role="button"
                        aria-expanded={hc ? expanded : undefined}
                    >
                        {item.icon && <span className={iconClassName}>{item.icon}</span>}
                        <span className={labelClassName}>{item.label}</span>
                    </div>
                </div>
            )}
        </MenuItem>
    )
}