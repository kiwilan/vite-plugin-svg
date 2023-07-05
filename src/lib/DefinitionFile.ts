import { dirname } from 'node:path'
import { Utils } from './Utils'

export class DefinitionFile {
  protected constructor(
    protected componentType: string,
    protected definition?: string,
  ) {}

  public static async make(types: string): Promise<DefinitionFile> {
    const self = new DefinitionFile(types)

    const contents = [
      '/* eslint-disable */',
      '/* prettier-ignore */',
      '// @ts-nocheck',
      '// Generated by unplugin-svg-transformer',
      'export {}',
      '',
      'declare module \'vue\' {',
      '  export interface GlobalComponents {',
      '    SvgIcon: typeof import(\'unplugin-svg-transformer/components\')[\'SvgIcon\']',
      '  }',
      '}',
      '',
      'declare global {',
      '  interface Window {',
      '    iconList: Record<IconType | string, Promise<{ default: string }>>',
      '  }',
      '}',
      '',
      'window.iconList = window.iconList || {}',
    ]

    self.definition = contents.join('\n')
    self.componentType = await self.setComponentType()

    return self
  }

  public getComponentType(): string {
    return this.componentType
  }

  public getDefinition(): string {
    return this.definition!
  }

  private async setComponentType(): Promise<string> {
    const path = Utils.componentsPath()

    if (!await Utils.fileExists(path)) {
      const dir = dirname(path)
      await Utils.directoryExists(dir)
      await Utils.write(path, '')
    }
    let content = await Utils.read(path)
    if (!content) {
      content = `import * as vue from 'vue';
import { PropType } from 'vue';

declare const _default: vue.DefineComponent<{
    name: {
        type: PropType<string>;
        required: true;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    name: {
        type: PropType<string>;
        required: true;
    };
}>>, {}, {}>;

export { _default as SvgIcon };`
    }

    content = content.replace(/^declare type IconType = .+$/m, '')
    content = content.replace(/type: PropType<string>;/g, 'type: PropType<IconType>;')
    content = content.replace(/\n\n/g, '\n')
    const types = this.componentType
    content = content.replace('import { PropType } from \'vue\';', `import { PropType } from 'vue';\n${types}`)

    return content
  }
}
