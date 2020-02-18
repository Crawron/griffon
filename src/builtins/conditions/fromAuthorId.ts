import { Condition } from "../../Condition"

export const fromAuthorId: (...ids: string[]) => Condition = (
  ...ids
) => ctx => {
  const { message, skip, match } = ctx

  if (ids.some(id => id === message.author.id)) return match()
  return skip()
}
