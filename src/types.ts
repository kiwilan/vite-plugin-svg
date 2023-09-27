export interface NuxtOptions {
  /**
   * Directory where your SVG files are located.
   *
   * @default './assets/svg'
   */
  iconsDir?: string
}

export interface Options {
  /**
   * Directory where your SVG files are located.
   *
   * @default './src/svg'
   */
  iconsDir?: string
  /**
   * Directory where `icons.ts` will be created.
   *
   * @default './src'
   */
  libraryDir?: string
  /**
   * Use types, if you want to use JavaScript instead of TypeScript, set this option to false.
   * You can't have autocompletion with JavaScript.
   *
   * @default true
   */
  useTypes?: boolean
  /**
   * For Vite users, this option is already enabled by `vite-env.d.ts` file.
   *
   * Create `icons.d.ts` file at the root of your project. Make sure to add this file in your `tsconfig.json` file.
   *
   * ```json
   * {
   *  "include": [
   *    "icons.d.ts"
   *  ]
   * }
   * ```
   *
   * Inject `svgList` and `importSvg()` in the window object: `window.svgList` and `window.importSvg()`.
   * These methods are fully typed.
   *
   * @default false
   */
  global?: boolean
}

export interface OptionsExtended extends Options {
  isTesting?: boolean
  isNuxt?: boolean
  nuxtDir?: string
}
