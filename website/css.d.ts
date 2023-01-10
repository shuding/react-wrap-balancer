import * as CSS from 'csstype'

declare module 'csstype' {
  interface Properties<TLength = (string & {}) | 0> {
    '--w'?: CSS.Property.Width<TLength>
  }
}
