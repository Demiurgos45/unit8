import eventBus from '@/eventBus'

export default function selectPage(pageName, pageParams) {
  eventBus.$emit('selectPage', pageName, pageParams)
}
