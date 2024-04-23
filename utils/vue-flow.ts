import type { NodeType } from 'jsonc-parser'
import type { LiteralUnion } from 'type-fest'
import { VUE_FLOW_THEME } from '~/constants/graph'

interface TextColor {
  type?: NodeType
  value?: LiteralUnion<'true' | 'false' | 'null', string>
  parent?: boolean
}

export function getTextColor({ value, type, parent }: TextColor) {
  // per type
  if (parent && type === 'array')
    return VUE_FLOW_THEME.light.NODE_COLORS.PARENT_ARR
  if (parent && type === 'object')
    return VUE_FLOW_THEME.light.NODE_COLORS.PARENT_OBJ
  if (type === 'object')
    return VUE_FLOW_THEME.light.NODE_COLORS.NODE_KEY
  if (type === 'array')
    return VUE_FLOW_THEME.light.NODE_COLORS.NODE_VALUE

  // per value
  if (value && !Number.isNaN(+value))
    return VUE_FLOW_THEME.light.NODE_COLORS.INTEGER
  if (value === 'true')
    return VUE_FLOW_THEME.light.NODE_COLORS.BOOL.TRUE
  if (value === 'false')
    return VUE_FLOW_THEME.light.NODE_COLORS.BOOL.FALSE
  if (value === 'null')
    return VUE_FLOW_THEME.light.NODE_COLORS.NULL

  // fallback
  return VUE_FLOW_THEME.light.NODE_COLORS.NODE_VALUE
}
