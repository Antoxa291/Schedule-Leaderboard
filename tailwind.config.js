/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

export const content = [
  "./public/index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
]
export const theme = {
  extend: {
    fontFamily: {
      'sans': ['"Open Sans"', ..._fontFamily.sans],
    },
  },
}
export const plugins = []