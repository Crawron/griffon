import { MatcherStatus } from "../Matcher"
import { matchAll } from "../matchAll"
import { matchTest, getMockContext, matchStatus } from "./helpers"

it.each<MatcherStatus>(["match", "skip", "error"])(
  "outputs the right states",
  a => {
    const matcher = matchAll(matchTest)
    const result = matcher(getMockContext(a))
    expect(result.status).toBe(a)
  }
)

it.each<MatcherStatus>(["match", "skip", "error"])(
  "outputs the right states (multiple identical matchers)",
  a => {
    const matcher = matchAll(matchTest, matchTest, matchTest, matchTest)
    const result = matcher(getMockContext(a))
    expect(result.status).toBe(a)
  }
)

it("skips on at least one skip", () => {
  const matcher = matchAll(
    matchStatus("match"),
    matchStatus("match"),
    matchStatus("skip")
  )

  const result = matcher(getMockContext())

  expect(result.status).toBe("skip")
})

it("errors take priority over matches", () => {
  const matcher = matchAll(matchStatus("match"), matchStatus("error"))
  const result = matcher(getMockContext())

  expect(result.status).toBe("error")
})
