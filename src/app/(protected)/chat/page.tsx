import { getChatHistory } from "@/actions/chat";
import Chat from "@/components/chat/Chat";

export default async function ChatPage() {
  const initialMessages = await getChatHistory();

  return (
    <div className="p-6">
      <Chat initialMessages={initialMessages} />
    </div>
  );
}
