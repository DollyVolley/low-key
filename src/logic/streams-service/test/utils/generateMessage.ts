import { ChatMessage } from "@/types/chat"

let x = 0

export function getMsg(): ChatMessage {
  return  {content: `Wigga, the number you search is ${x++}`, isOwn: true, timestamp: Date.now()}
}
