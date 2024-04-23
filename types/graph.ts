import type { Edge, Node } from '@vue-flow/core'
import type { NodeType } from 'jsonc-parser'
import type { JsonPrimitive } from 'type-fest'

export interface NodeElementData {
  path?: string
  text: StringOrPrimitiveArray
  type: NodeType
  isParent: boolean
  isEmpty: boolean
  childrenCount: number
}

export type CustomEdgeType = Edge<any, any, 'custom'>

export interface CustomNodeType extends Node<NodeElementData, any, 'custom'> {}

export type ArrayLikeJson = [string, JsonPrimitive][]

export type StringOrPrimitiveArray = JsonPrimitive | ArrayLikeJson

export type StringOrPrimitiveTuple = JsonPrimitive | ArrayLikeJson[number]
