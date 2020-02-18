export { Bot, BotOptions } from "./Bot"

// Matchers
export { Condition as Matcher } from "./Condition"

export { matchAll } from "./builtins/conditions/matchAll"
export { everyMessage } from "./builtins/conditions/everyMessage"
export { matchStatus } from "./builtins/conditions/matchStatus"
export { commandName } from "./builtins/conditions/commandName"
export { matchOrError } from "./builtins/conditions/matchOrError"
export { skipErrors } from "./builtins/conditions/skipErrors"
export { skip } from "./builtins/conditions/skip"
export { requireArgs } from "./builtins/conditions/requireArgs"
export { fromAuthorId } from "./builtins/conditions/fromAuthorId"

// Commands
export { Command, CommandGroup } from "./Command"

export { quickCommand } from "./builtins/commands/quickCommand"
export { replyCommand } from "./builtins/commands/replyCommand"
export { processCommand } from "./builtins/commands/processCommand"
export { echoCommand } from "./builtins/commands/echoCommand"
