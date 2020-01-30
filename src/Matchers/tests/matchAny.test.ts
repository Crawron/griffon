import { MatcherStatus } from "../Matcher"
import { matchAny } from "../matchAny"
import { matchTest, getMockContext } from "../../tests/helpers"
import { matchStatus } from "../matchStatus"

it.each<MatcherStatus>(["match", "skip", "error"])(
  "outputs the right states",
  a => {
    const matcher = matchAny(matchTest)
    const result = matcher(getMockContext(a))
    expect(result.status).toBe(a)
  }
)

it.each<MatcherStatus>(["match", "skip", "error"])(
  "outputs the right states (multiple identical matchers)",
  a => {
    const matcher = matchAny(matchTest, matchTest, matchTest, matchTest)
    const result = matcher(getMockContext(a))
    expect(result.status).toBe(a)
  }
)

it("only one match required", () => {
  const matcher = matchAny(
    matchStatus("match"),
    matchStatus("skip"),
    matchStatus("skip")
  )

  const result = matcher(getMockContext())

  expect(result.status).toBe("match")
})

it("errors take priority over matches", () => {
  const matcher = matchAny(matchStatus("match"), matchStatus("error"))
  const result = matcher(getMockContext())

  expect(result.status).toBe("error")
})
