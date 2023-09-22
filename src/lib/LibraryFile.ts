import type { SvgItem } from './Svg/SvgItem'
import { Utils } from './Utils'

export class LibraryFile {
  protected constructor(
    protected items: SvgItem[] = [],
    protected list?: string,
    protected types?: string,
    protected isNuxt = false,
  ) { }

  public static async make(items: SvgItem[], isNuxt: boolean): Promise<LibraryFile> {
    const self = new LibraryFile(items)

    self.isNuxt = isNuxt
    self.list = await self.setList()
    self.types = await self.setTypes()

    return self
  }

  public getItems(): SvgItem[] {
    return this.items
  }

  public getList(): string {
    return this.list!
  }

  public getTypes(): string {
    return this.types!
  }

  public content(): string {
    const content = [
      '/* eslint-disable eslint-comments/no-unlimited-disable */',
      '/* eslint-disable */',
      '/* prettier-ignore */',
      '// @ts-nocheck',
      '// Generated by unplugin-svg-transformer',
      this.list!,
    ]

    return content.join('\n')
  }

  public async update(path: string, window = true, typescript = true): Promise<string> {
    this.list = await this.setList(path, window, typescript)
    if (!typescript)
      this.types = ''

    return this.list
  }

  private async setTypes(): Promise<string> {
    let content = ''
    content += 'type IconType = '
    this.items.forEach((item, key) => {
      if (key > 0)
        content += ' | '

      content += `'${item.getName()}'`
    })

    if (this.items.length > 0)
      content += ' | \'default\''
    else
      content += '\'default\''

    content = content.replace('\'default\' | \'default\'', '\'default\'')

    return content
  }

  private async setList(basePath = '', window = true, typescript = true): Promise<string> {
    const content = []

    if (typescript)
      content.push('export const iconList: Record<IconType, Promise<{ default: string }>> = {')
    else
      content.push('export const iconList = {')

    this.items.forEach((item) => {
      const localPath = item.getPath()
      let path = Utils.normalizePaths([basePath, localPath])
      if (this.isNuxt)
        path = `./icons${localPath}`

      path = path.replace('.svg', '')

      content.push(`  '${item.getName()}': () => import('${path}'),`)
    })

    content.push('}')

    content.push('')
    content.push('export async function importIcon(name: IconType): Promise<{ default: string }> {')
    content.push('  name = iconList[name] || iconList["default"]')
    content.push('  return await name()')
    content.push('}')

    if (window && !this.isNuxt) {
      content.push('')
      content.push('if (typeof window !== \'undefined\') {')
      // content.push('  // @ts-expect-error type is global')
      content.push('  window.iconList = iconList')
      content.push('  window.importIcon = importIcon')
      content.push('}')
    }

    return content.join('\n')
  }
}
