"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CommandItem {
  id: string
  icon: ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
}

export interface CircularCommandMenuProps {
  items?: CommandItem[]
  trigger?: ReactNode
  className?: string
  radius?: number
  onSelect?: (item: CommandItem) => void
  defaultOpen?: boolean
}

function Component({
  items = [],
  trigger,
  className,
  radius = 120,
  onSelect,
  defaultOpen = false,
}: CircularCommandMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState(0)

  const safeItems = items || []
  const itemCount = safeItems.length

  const angleStep = itemCount > 0 ? 360 / itemCount : 0
  const startAngle = -90

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || itemCount === 0) return

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) => (prev + 1) % itemCount)
          break
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
          break
        case "Enter":
          e.preventDefault()
          const selectedItem = safeItems[activeIndex]
          if (selectedItem) {
            selectedItem.onClick?.()
            onSelect?.(selectedItem)
          }
          setIsOpen(false)
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [isOpen, activeIndex, safeItems, itemCount, onSelect],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const getItemPosition = (index: number) => {
    const angle = ((startAngle + index * angleStep) * Math.PI) / 180
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <div className={cn("relative inline-flex", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative z-20 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-black text-white shadow-lg",
          "hover:bg-gray-800 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
        )}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {trigger || (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && itemCount > 0 && (
          <div className="absolute left-1/2 top-1/2 z-20" role="menu">
            {safeItems.map((item, index) => {
              const position = getItemPosition(index)
              const isActive = activeIndex === index

              return (
                <motion.button
                  key={item.id}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    x: position.x - 24,
                    y: position.y - 24,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  onClick={() => {
                    item.onClick?.()
                    onSelect?.(item)
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "absolute flex h-12 w-12 items-center justify-center rounded-full",
                    "border-2 border-black bg-white shadow-lg",
                    "transition-colors hover:bg-gray-100",
                    isActive && "ring-2 ring-black bg-gray-100",
                  )}
                  role="menuitem"
                  aria-label={item.label}
                >
                  <div className="text-black">{item.icon}</div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.9,
                    }}
                    className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-sm text-white shadow-md border border-black"
                  >
                    <span>{item.label}</span>
                  </motion.div>
                </motion.button>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Component }
