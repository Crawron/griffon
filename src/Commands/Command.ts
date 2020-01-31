import { MessageEventContext } from "../Types/MessageEventContext"
import { Matcher } from "../Matchers/Matcher"

// super placeholder
export type CommandMetadata = Partial<{
  label: string
  names: string[]
  examples: string[]
}>

export type CommandLike = {
  names: string[]
  condition?: Matcher
  metadata?: CommandMetadata
}

export type CommandContext = MessageEventContext & {
  args: string
}

export type Command = CommandLike & {
  action: (context: CommandContext) => void
}

export type CommandGroup = CommandLike & {
  childCommands: (Command | CommandGroup)[]
}
