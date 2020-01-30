import { Matcher, matcherHelpers, MatcherContext } from "../Matcher"

export const matchTest: Matcher = ctx => {
  switch (ctx.message.content) {
    case "match":
      return ctx.match()
    case "error":
      return ctx.error("error message")
    case "skip":
      return ctx.skip()
  }
  throw "fuck"
}

const bot: any = "the"

export const getMockContext: (msg: string) => MatcherContext = (
  message: string
) => ({
  bot,
  message: { content: message, author: { id: "111" } },
  args: "",
  ...matcherHelpers,
})