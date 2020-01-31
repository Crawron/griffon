import {
  CommandGroup,
  Command,
  CommandContext,
  CommandLike,
} from "./Commands/Command"
import { MessageEventContext } from "./Types/MessageEventContext"
import { MockMessage } from "./Types/MockMessage"

type BotOptions = {
  // token: string
  commands: (Command | CommandGroup)[]
}

export class Bot {
  commands: (Command | CommandGroup)[]

  constructor(options: BotOptions) {
    this.commands = options.commands
  }

  handleMessageEvent(message: MockMessage) {
    const eventCtx: MessageEventContext = {
      message,
      bot: this,
    }

    this.traverseCommandTree(this.commands.pop()!, eventCtx)
  }

  traverseCommandTree(
    root: Command | CommandGroup,
    ctx: MessageEventContext
  ): void {
    // ignoring conditions exist for now. wip
    let currentCommand = root
    let args = processCommandArgs(ctx.message.content, root)

    // currentCommand matched a name
    while (true) {
      if (!args) return
      if ("action" in currentCommand) {
        // currentCommand is Command
        const cmdCtx: CommandContext = { ...ctx, args }
        currentCommand.action(cmdCtx)
        return
      }

      // currentCommand is CommandGroup
      const matchingChildCommand = currentCommand.childCommands.find(
        command => processCommandArgs(args!, command) !== undefined
      )

      if (!matchingChildCommand) return

      // one of the command childs matched a name
      currentCommand = matchingChildCommand
      args = processCommandArgs(args, currentCommand)
    }
  }
}

const getPrefixRegex = (prefix: string) => new RegExp(`^ *${prefix}`)

/** Returns resulting arguments */
function processCommandArgs(
  args: string,
  command: CommandLike
): string | undefined {
  const matchedName = command.names.find(name =>
    getPrefixRegex(name).test(args)
  )

  if (!matchedName) return undefined

  const regex = getPrefixRegex(matchedName)
  return args.replace(regex, "")
}
