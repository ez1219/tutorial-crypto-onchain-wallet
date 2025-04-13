import { defineConfig, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind4({
      reset: true,
    }),
    presetIcons({
      /* options */
    }),
    // ...other presets
  ],
})
