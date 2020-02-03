import { Matcher } from "./Matcher"

export const skipErrors: (matcher: Matcher) => Matcher = matcher => ctx => {
  const { skip } = ctx

  const result = matcher(ctx)
  if (result.status === "error") return skip()

  return result
}
