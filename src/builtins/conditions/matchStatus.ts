import { ConditionStatus, Condition } from "../../Condition"

export const matchStatus: (
  status: ConditionStatus
) => Condition = status => ctx => {
  switch (status) {
    case "match":
      return ctx.match()
    case "skip":
      return ctx.skip()
    case "error":
      return ctx.error("error")
  }
}
