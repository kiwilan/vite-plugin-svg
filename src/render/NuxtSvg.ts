/* eslint-disable ts/ban-ts-comment */
import type { PropType } from 'vue'
import { defineComponent, h, onMounted, ref, watch } from 'vue'
import type { Display } from './shared'
import { defaultSvg, ssr } from './shared'

// @ts-nocheck
// @ts-expect-error - ignore
import { importSvg } from '#icons'

const NuxtSvg = defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String as PropType<SvgName>,
      required: true,
    },
    display: {
      type: String as PropType<Display>,
      required: false,
      default: 'inline-block',
    },
  },
  setup(props, { attrs }) {
    const defaultSSR = defaultSvg(props.name, true)
    const current = ref<string>(defaultSSR)
    const html = ref(ssr(props.name))

    const attributes = ref({
      ...(attrs as Record<string, any>),
      style: {
        ...(attrs as Record<string, any>).style,
      },
    })

    if (props.display !== false)
      attributes.value.style.display = props.display

    async function getSvg() {
      html.value = ''
      current.value = ''
      current.value = await importSvg(props.name)
    }

    watch(() => props.name, async () => {
      await getSvg()
    })

    onMounted(async () => {
      await getSvg()
      html.value = current.value
    })

    return () => h('span', { ...attributes, innerHTML: html.value })
  },
})

export default NuxtSvg
