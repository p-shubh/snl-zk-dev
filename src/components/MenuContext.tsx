'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface MenuState {
  isMenuVisible: boolean;
}

type MenuAction = { type: 'SHOW_MENU' } | { type: 'HIDE_MENU' };

interface MenuContextType {
  state: MenuState;
  dispatch: React.Dispatch<MenuAction>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const menuReducer = (state: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case 'SHOW_MENU':
      return { ...state, isMenuVisible: true };
    case 'HIDE_MENU':
      return { ...state, isMenuVisible: false };
    default:
      return state;
  }
};

const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, { isMenuVisible: false });

  return (
    <MenuContext.Provider value={{ state, dispatch }}>{children}</MenuContext.Provider>
  );
};

const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export { MenuProvider, useMenu };
