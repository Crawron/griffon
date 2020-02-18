import { Command, CommandContext } from "../../Command"
import { matchAll } from "../matchers/matchAll"
import { commandName } from "../matchers/commandName"

export const quickCommand: (
  action: (ctx: CommandContext) => string,
  ...names: string[]
) => Command = (action, name) => ({
  condition: matchAll(commandName(name)),
  action: ctx => {
    ctx.message.channel.createMessage(action(ctx))
  },
})
