import { Bot } from "./Bot"
import Eris from "eris"

export type MessageEventContext = {
  message: Eris.Message // placeholder type
  bot: Bot
  args: string
}
