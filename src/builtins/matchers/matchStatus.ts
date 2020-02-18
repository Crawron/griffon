import { MatcherStatus, Matcher } from "../../Matcher"

export const matchStatus: (
  status: MatcherStatus
) => Matcher = status => ctx => {
  switch (status) {
    case "match":
      return ctx.match()
    case "skip":
      return ctx.skip()
    case "error":
      return ctx.error("error")
  }
}
