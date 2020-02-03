import { Command } from "./Command"
import { commandName } from "../Matchers/commandName"
import { matchAll } from "../Matchers/matchAll"
import { hasArgs } from "../Matchers/hasArgs"

export const processCommand: (
  process: (args: string) => string,
  name: string
) => Command = (process, name) => ({
  condition: matchAll(commandName(name), hasArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(process(ctx.message.content))
  },
})
