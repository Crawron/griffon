import { matchTest, getMockContext } from "../../tests/helpers"

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
