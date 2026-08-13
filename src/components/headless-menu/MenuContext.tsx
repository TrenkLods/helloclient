import React, { createContext, useReducer, type ReactNode } from 'react'
import type { MenuAction, MenuItemData, MenuState } from './types'




function menuReducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case 'TOGGLE_EXPAND': {
      const newExpanded = new Set(state.expandedIds)
      if (newExpanded.has(action.id)) newExpanded.delete(action.id)
      else newExpanded.add(action.id)
      return { ...state, expandedIds: newExpanded }
    }
    case 'EXPAND': {
      const newExpanded = new Set(state.expandedIds)
      newExpanded.add(action.id)
      return { ...state, expandedIds: newExpanded }
    }
    case 'COLLAPSE': {
      const newExpanded = new Set(state.expandedIds)
      newExpanded.delete(action.id)
      return { ...state, expandedIds: newExpanded }
    }
    case 'SET_ACTIVE':
      return { ...state, activeId: action.id }
    case 'COLLAPSE_ALL':
      return { ...state, expandedIds: new Set() }
    default:
      return state
  }
}

interface MenuContextValue {
  state: MenuState
  dispatch: React.Dispatch<MenuAction>
  items: MenuItemData[]
  toggleExpand: (id: string) => void
  setActive: (id: string) => void
  isExpanded: (id: string) => boolean
  isActive: (id: string) => boolean
  isMobile: boolean
}

export const MenuContext = createContext<MenuContextValue | null>(null)



interface MenuProviderProps {
  items: MenuItemData[]
  isMobile?: boolean
  children: ReactNode
  expandedIds?: Set<string>
  activeId?: string | null
  onStateChange?: (state: MenuState) => void
}

export const MenuProvider: React.FC<MenuProviderProps> = ({
  items,
  isMobile = false,
  children,
  expandedIds,
  activeId,
  onStateChange,
}) => {
  const [internalState, internalDispatch] = useReducer(menuReducer, {
    expandedIds: expandedIds || new Set(),
    activeId: activeId || null,
  })

  const state =
    expandedIds !== undefined && activeId !== undefined
      ? { expandedIds, activeId }
      : internalState

  const dispatch = (action: MenuAction) => {
    if (onStateChange) {
      let newState: MenuState
      switch (action.type) {
        case 'TOGGLE_EXPAND': {
          const newExpanded = new Set(state.expandedIds)
          if (newExpanded.has(action.id)) newExpanded.delete(action.id)
          else newExpanded.add(action.id)
          newState = { ...state, expandedIds: newExpanded }
          break
        }
        case 'EXPAND': {
          const newExpanded = new Set(state.expandedIds)
          newExpanded.add(action.id)
          newState = { ...state, expandedIds: newExpanded }
          break
        }
        case 'COLLAPSE': {
          const newExpanded = new Set(state.expandedIds)
          newExpanded.delete(action.id)
          newState = { ...state, expandedIds: newExpanded }
          break
        }
        case 'SET_ACTIVE':
          newState = { ...state, activeId: action.id }
          break
        case 'COLLAPSE_ALL':
          newState = { ...state, expandedIds: new Set() }
          break
        default:
          newState = state
      }
      onStateChange(newState)
    } else {
      internalDispatch(action)
    }
  }

  const toggleExpand = (id: string) => dispatch({ type: 'TOGGLE_EXPAND', id })
  const setActive = (id: string) => dispatch({ type: 'SET_ACTIVE', id })
  const isExpanded = (id: string) => state.expandedIds.has(id)
  const isActive = (id: string) => state.activeId === id

  const value: MenuContextValue = {
    state,
    dispatch,
    items,
    toggleExpand,
    setActive,
    isExpanded,
    isActive,
    isMobile,
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}