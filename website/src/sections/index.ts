import { default as About } from './About'
import { default as CustomBalanceRatio } from './CustomBalanceRatio'
import { default as CustomMaxScale } from './CustomMaxScale'
import { default as GettingStarted } from './GettingStarted'
import { default as Header } from './Header'
import { default as Footer } from './Footer'
import { default as Hero } from './Hero'
import { default as HowItWorks } from './HowItWorks'
import { default as Performance } from './Performance'
import { default as UseCases } from './UseCases'
export {
  About,
  CustomBalanceRatio,
  CustomMaxScale,
  GettingStarted,
  Header,
  Footer,
  Hero,
  HowItWorks,
  Performance,
  UseCases,
}
const Sections = {
  About,
  CustomBalanceRatio,
  CustomMaxScale,
  GettingStarted,
  Header,
  Footer,
  Hero,
  HowItWorks,
  Performance,
  UseCases,
} as const

export default Sections
