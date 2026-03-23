'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cypentra_cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cypentra_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (packageItem) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const exists = prev.find(item => item.id === packageItem.id)
      if (exists) {
        return prev // Don't add duplicates
      }
      return [...prev, packageItem]
    })
  }

  const removeFromCart = (packageId) => {
    setCartItems(prev => prev.filter(item => item.id !== packageId))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cypentra_cart')
  }

  const getCartCount = () => {
    return cartItems.length
  }

  const isInCart = (packageId) => {
    return cartItems.some(item => item.id === packageId)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    isInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

