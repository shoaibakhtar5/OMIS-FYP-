import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'omis-theme'

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked (private mode). The theme still applies for this visit.
  }
}

/**
 * Current color theme and a toggle.
 * Until the user toggles, the operating system setting is used. After a toggle
 * the choice is saved in localStorage. The theme is applied as
 * <html data-theme="...">, which switches the CSS variables in tokens.css.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readSavedTheme() ?? systemTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      saveTheme(next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
