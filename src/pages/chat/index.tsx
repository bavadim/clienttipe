import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatMessage } from "../api/psychometry";
import styles from './index.module.scss'

const ChatWindow = ({messages, onSend, onStatisticsDownloadClick, onChatHistoryUploadClick}: { 
  messages: MessageModel[], 
  onSend: (message: string) => void 
  onStatisticsDownloadClick: () => void
  onChatHistoryUploadClick: () => void
}) => {

	return (
    <div className={styles.container}>
      <div className={styles.chatwindow}>

        <MainContainer>
          <ChatContainer>
            <MessageList>
              { messages.map((m, i) => (
              <Message key={i} model={m} >
                <Message.Footer>
                {m.sender}
                </Message.Footer>  
              </Message>
              )) }
            </MessageList>
            <MessageInput autoFocus onSend={onSend} placeholder="Введите ваше сообщение" />
          </ChatContainer>
        </MainContainer>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onStatisticsDownloadClick}>Скачать JSON с оценками</button>
          <button className={styles.button} onClick={onChatHistoryUploadClick}>Звгрузить текст для оценки</button>
        </div>
        </div>
    </div>

	)
}

export default ChatWindow