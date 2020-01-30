import { Command } from "./Command"

export const processCommand: (
  process: (str: string) => string,
  name: string
) => Command = (process, name) => ({
  names: [name],
  action: ctx => {
    console.log(process(ctx.message.content))
  },
})
