import { Matcher } from "./Matcher"

export const skip: (...matchers: Matcher[]) => Matcher = () => ctx => ctx.skip()
