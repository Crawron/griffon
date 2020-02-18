import { MessageEventContext } from "./MessageEventContext"

export type ConditionMatchResult = { status: "match"; args: string }
export type ConditionSkipResult = { status: "skip" }
export type ConditionErrorResult = { status: "error"; error: string }

export type ConditionResult =
  | ConditionMatchResult
  | ConditionSkipResult
  | ConditionErrorResult

export type ConditionStatus = ConditionResult["status"]

const getMatcherHelpers = (ctx: MessageEventContext) => ({
  error: (er: string): ConditionErrorResult => ({
    status: "error",
    error: er,
  }),
  match: (resultingArgs?: string): ConditionMatchResult => ({
    status: "match",
    args: resultingArgs ?? ctx.args,
  }),
  skip: (): ConditionSkipResult => ({ status: "skip" }),
})

export type ConditionContext = MessageEventContext &
  ReturnType<typeof getMatcherHelpers>

export const getConditionContext: (
  ctx: MessageEventContext
) => ConditionContext = ctx => ({
  ...ctx,
  ...getMatcherHelpers(ctx),
})

export type Condition = (context: ConditionContext) => ConditionResult
