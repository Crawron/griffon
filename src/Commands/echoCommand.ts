import { Command } from "./Command"

export const echoCommand: (name?: string) => Command = (name = "echo") => ({
  names: [name],
  action: ctx => {
    console.log(ctx.args)
  },
})
