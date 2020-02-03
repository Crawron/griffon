import {
  Matcher,
  getMatcherHelpers,
  MatcherContext,
} from "../src/Matchers/Matcher"

export const matchTest: Matcher = ctx => {
  switch (ctx.message.content) {
    case "match":
      return ctx.match()
    case "error":
      return ctx.error("error message")
    case "skip":
      return ctx.skip()
  }
  throw "unexpected message"
}

const bot: any = "the"
const mockMessage: (message: string) => any = message => ({
  content: message,
  author: { id: "111" },
})

export const getMockContext: (msg?: string, args?: string) => MatcherContext = (
  message = "",
  args = ""
) => ({
  bot,
  args,
  message: mockMessage(message),
  ...getMatcherHelpers(),
})
