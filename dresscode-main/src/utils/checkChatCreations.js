export default function checkChatCreation(chats, sender, receiver) {
  for (let chat of chats) {
    if (
      chat.chatId === sender + " " + receiver ||
      chat.chatId === receiver + " " + sender
    ) {
      return chat;
    }
  }
  return false;
}
