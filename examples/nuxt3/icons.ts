/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-svg-transformer
export const svgList: Record<SvgType, () => Promise<{ default: string }>> = {
  'download': () => import('./.nuxt/icons/download'),
  'social/twitter': () => import('./.nuxt/icons/social/twitter'),
  'vite-2': () => import('./.nuxt/icons/vite-2'),
  'vite': () => import('./.nuxt/icons/vite'),
  'default': () => import('./.nuxt/icons/default'),
}

export async function importSvg(name: SvgType): Promise<string> {
  if (!svgList[name])
    console.warn(`Icon ${name} not found`)
  name = svgList[name] || svgList["default"]
  return await name()
}