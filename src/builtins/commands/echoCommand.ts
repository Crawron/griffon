import { Command } from "../../Command"
import { requireArgs } from "../conditions/requireArgs"
import { matchAll } from "../conditions/matchAll"
import { commandName } from "../conditions/commandName"

export const echoCommand: (name?: string) => Command = (name = "echo") => ({
  condition: matchAll(commandName(name), requireArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(ctx.args)
  },
})
