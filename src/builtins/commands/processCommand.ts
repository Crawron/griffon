import { Command } from "../../Command"
import { commandName } from "../conditions/commandName"
import { matchAll } from "../conditions/matchAll"
import { requireArgs } from "../conditions/requireArgs"

export const processCommand: (
  process: (args: string) => string,
  name: string
) => Command = (process, name) => ({
  condition: matchAll(commandName(name), requireArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(process(ctx.message.content))
  },
})
