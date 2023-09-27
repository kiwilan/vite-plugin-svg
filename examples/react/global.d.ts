/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-svg-transformer
export {};

declare global {
  type SvgType = 'download' | 'social/twitter' | 'default'
  interface Window {
    svgList: Record<SvgType, () => Promise<{ default: string }>>
    importSvg: (name: SvgType) => Promise<string>
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('unplugin-svg-transformer/dist/components')['VueSvg']
    importSvg: (name: SvgType) => Promise<string>
  }
}

window.svgList = window.svgList || {}
window.importSvg = importSvg || function () {}
