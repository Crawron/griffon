import { Matcher } from "./Matcher"

export const matchAlways: Matcher = ctx => ctx.match()
export const skip: (...matchers: Matcher[]) => Matcher = () => ctx => ctx.skip()
