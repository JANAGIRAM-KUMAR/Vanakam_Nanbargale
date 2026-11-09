export const THEMES = ['forest', 'vintage'] as const

export type ThemeName = (typeof THEMES)[number]

export const ACTIVE_THEME: ThemeName = 'vintage'
