import { Matcher, matcherHelpers, MatcherContext } from "./Matcher"
import { Bot } from "../Bot"

const matchTest: Matcher = ctx => {
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

const getMockContext: (msg: string) => MatcherContext = (message: string) => ({
  bot,
  message: { content: message, author: { id: "111" } },
  args: "",
  ...matcherHelpers,
})

it("matches", () => {
  const result = matchTest(getMockContext("match"))
  expect(result.status).toBe("match")
})

it("skips", () => {
  const result = matchTest(getMockContext("skip"))
  expect(result.status).toBe("skip")
})

it("errors", () => {
  const result = matchTest(getMockContext("error"))
  expect(result.status).toBe("error")
  expect(result.status === "error" && result.error).toBe("error message")
})
