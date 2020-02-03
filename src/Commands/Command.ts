import { MessageEventContext } from "../MessageEventContext"
import { Matcher } from "../Matchers/Matcher"

// super placeholder
export type CommandMetadata = Partial<{
  label: string
  names: string[]
  examples: string[]
}>

export type CommandLike = {
  condition: Matcher
  metadata?: CommandMetadata
}

export type CommandContext = MessageEventContext

export type Command = CommandLike & {
  action: (context: CommandContext) => void
}

export type CommandGroup = CommandLike & {
  childCommands: (Command | CommandGroup)[]
}
