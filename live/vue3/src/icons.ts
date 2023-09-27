/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-svg-transformer
export const svgList: Record<SvgType, () => Promise<{ default: string }>> = {
  'download': () => import('../node_modules/unplugin-svg-transformer/cache/download'),
  'social/twitter': () => import('../node_modules/unplugin-svg-transformer/cache/social/twitter'),
  'vite': () => import('../node_modules/unplugin-svg-transformer/cache/vite'),
  'vue-2': () => import('../node_modules/unplugin-svg-transformer/cache/vue-2'),
  'vue': () => import('../node_modules/unplugin-svg-transformer/cache/vue'),
  'default': () => import('../node_modules/unplugin-svg-transformer/cache/default'),
}

export async function importSvg(name: SvgType): Promise<string> {
  if (!svgList[name])
    console.warn(`Icon ${name} not found`)
  name = svgList[name] || svgList["default"]
  const svg = await name()
  if (svg.default)
    return svg.default
  return svg
}

if (typeof window !== 'undefined') {
  window.svgList = svgList
  window.importSvg = importSvg
}