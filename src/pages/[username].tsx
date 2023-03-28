import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "./index.module.css"
import ChatWindow from './chat'
import StatisticsWindow from './statistics'
import { MessageModel } from '@chatscope/chat-ui-kit-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Audio } from 'react-loader-spinner'
import { ChatMessage, Measures } from './api/psychometry'


const fakeMessages: MessageModel[] = [
  {
    message: "Hello my friend",
    sentTime: "just now",
    sender: "Димон",
    position: "normal",
    direction: "incoming",
  }
]


async function request<TResponse>(
  url: string, 
  config: RequestInit
): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}

export default function WorkingArea() {
  const router = useRouter()
  const currentUserName = router.query?.username?.toString() || 'Васян'

  //todo
  const opponentName = 'Димон'
  
  const [hist, setHist] = useState<MessageModel[]>(fakeMessages)

  const { isLoading, error, data } = useQuery(['statistics', hist], async () => {
    const res = await request<Measures>('/api/psychometry', { method: 'POST', body: JSON.stringify(hist) })
    return res
  })

  return (
      <main className={styles.main}>
        <h1>Clienttype</h1>
        <strong>Демонстрация алгоритма психометрии на основе текста</strong>
        <div className={styles.workingarea}>
            <ChatWindow 
              onSend={ (message) => {
                setHist([...hist, { message: message, sentTime: (new Date()).getTime().toString(), sender: currentUserName?.toString(), position: 'normal', direction: 'outgoing'  } ])
              } } 
              messages={hist} 
              onChatHistoryUploadClick={() => {
                // todo: read from file
                const messages: ChatMessage[] = []
                setHist(messages.map(mes => {
                  return {...mes, position: 'normal', direction: mes.sender == currentUserName ? 'outgoing' : 'incoming'}
                }))
              }}
              onStatisticsDownloadClick={ () => {
                // TODO: download file with 'data' variable
              } }
            />
            <div className={styles.measures}>
              {
                (isLoading == true || data == undefined) ? <Audio height="80" width="80" color="green" ariaLabel="loading" /> : Object.keys(data).map((userName, i) => {
                  return <StatisticsWindow key={i} userStats={data[userName]} />
                })
              }
            </div>
            
        </div>
      </main>
  )
}
