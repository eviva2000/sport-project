import { defineConfig } from '@pandacss/dev'
 
export default defineConfig({
  // Whether to use css reset
  preflight: true,
 
  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
 
  // Files to exclude
  exclude: [],
 
  // Generates JSX utilities with options of React, Preact, Qwik, Solid, Vue
  jsxFramework: 'react',
 
  // The output directory for your css system
  outdir: 'styled-system'
})