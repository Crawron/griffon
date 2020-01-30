import {
  Matcher,
  matcherHelpers,
  MatcherContext,
  MatcherStatus,
} from "../Matcher"

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

export const matchStatus: (
  status: MatcherStatus
) => Matcher = status => ctx => {
  switch (status) {
    case "match":
      return ctx.match()
    case "skip":
      return ctx.skip()
    case "error":
      return ctx.error("test")
  }
}

const bot: any = "the"

export const getMockContext: (msg?: string) => MatcherContext = (
  message: string = ""
) => ({
  bot,
  message: { content: message, author: { id: "111" } },
  args: "",
  ...matcherHelpers,
})
