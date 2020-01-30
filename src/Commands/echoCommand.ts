import { Command } from "./Command"

const echoCommand: (name?: string) => Command = (name = "echo") => ({
  names: [name],
  action: ctx => {
    console.log(ctx.args)
  },
})
