import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = "light" | "dark"

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
    setLightTheme: () => void
    setDarkTheme: () => void
}

interface ThemeProviderProps {
    children: ReactNode
}
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const getInitialTheme = (): Theme => {
    try {
        const savedTheme = localStorage.getItem("theme")
        return savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "dark"
    } catch (error) {
        console.error("Failed to read theme from localStorage:", error)
        return "dark"
    }
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        try {
            const root = document.documentElement
            if (theme === "dark") {
                root.classList.add("dark")
            } else {
                root.classList.remove("dark")
            }
            localStorage.setItem("theme", theme)
        } catch (error) {
            console.error("Failed to apply theme:", error)
        }
    }, [theme])
    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"))
    }
    const setLightTheme = () => setTheme("light")
    const setDarkTheme = () => setTheme("dark")

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setLightTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

