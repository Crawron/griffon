import { Command } from "./Command"
import { hasArgs } from "../Matchers/hasArgs"
import { matchAll } from "../Matchers/matchAll"
import { commandName } from "../Matchers/commandName"

export const echoCommand: (name?: string) => Command = (name = "echo") => ({
  condition: matchAll(commandName(name), hasArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(ctx.args)
  },
})
