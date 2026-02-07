import { getChatHistory } from "@/actions/chat";
import Chat from "@/components/chat/Chat";
import Navbar from "@/components/ui/navbar";

export default async function ChatPage() {
  const initialMessages = await getChatHistory();

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Chat initialMessages={initialMessages} />
      </div>
    </div>
  );
}
