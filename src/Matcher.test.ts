import { Matcher, matcherHelpers } from "./Matcher"
import { Bot } from "./Bot"

const matchTest: Matcher = ctx => {
  switch (ctx.message) {
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

const getMockContext = (message: string) => ({
  message,
  bot,
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
