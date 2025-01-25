'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './desktop.module.css';

// Type definitions
interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface TypingIndicatorProps {
  className?: string;
}

// Prompt suggestions array
const PROMPT_SUGGESTIONS = [
  { id: 'advice', text: 'Give Advice', prompt: 'I need some general life advice.' },
  { id: 'gratitude', text: 'Express Gratitude', prompt: 'I would like to express my gratitude for the blessings in my life.' },
  { id: 'forgiveness', text: 'Seeking Forgiveness', prompt: 'I would like to ask for forgiveness and guidance.' },
  { id: 'prayers', text: 'Prayers / Spirutal Requests', prompt: 'I would like to offer a prayer for guidance and support.' }
];

// Components
const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className = '' }) => (
  <div className={`flex gap-4 p-4 ${className}`}>
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-[#28283B] text-xs">
      [BOT]
    </div>
    <div className="flex-1">
      <div className="flex space-x-2 mt-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

const PageLayout: React.FC = () => {
  // State management
  const [chats, setChats] = useState<Chat[]>([]);  // Initialize empty to avoid duplicate initialization
  
  // Initialize chat with URL parameter if present
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const textParam = searchParams.get('text');
    
    if (textParam) {
      // Create a new chat with the URL parameter as the first user message
      const newChat: Chat = {
        id: Date.now().toString(),
        title: textParam.substring(0, 30) + (textParam.length > 30 ? '...' : ''),
        messages: [
          { role: 'user', content: textParam }
        ]
      };
      
      setChats([newChat]);
      setActiveChat(newChat.id);
      
      // Simulate response to the initial message
      setIsTyping(true);
      setTimeout(() => {
        const response: Message = { 
          role: 'assistant', 
          content: 'This is a simulated response to your initial message.' 
        };
        
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === newChat.id 
              ? { ...chat, messages: [...chat.messages, response] }
              : chat
          )
        );
        setIsTyping(false);
      }, 1500);
    } else {
      // If no URL parameter, initialize with default chat
      setChats([{
        id: '1',
        title: 'New Chat',
        messages: []
      }]);
    }
  }, []); // Empty dependency array means this runs once on mount

  const [activeChat, setActiveChat] = useState<string>('1');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to check if chat is new (only has initial greeting)
  const isNewChat = (chat: Chat): boolean => {
    return chat.messages.length === 0;
  };

  // Handle prompt suggestion click
  const handlePromptClick = async (prompt: string): Promise<void> => {
    if (isTyping) return;
    
    setInputValue('');

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, { role: 'user' as const, content: prompt }]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const response: Message = { 
        role: 'assistant', 
        content: 'This is a simulated response to your prompt.' 
      };
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat 
            ? { ...chat, messages: [...chat.messages, response] }
            : chat
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, isTyping]);

  // useEffect(() => {
  //   if (!isTyping) {
  //     console.log('Active chat or model typing changed, attempting to focus input');
  //     inputRef.current?.focus();
  //   }
  // }, [activeChat, isTyping]);

  useEffect(() => {
    console.log('Active chat or model typing changed, attempting to focus input');
    inputRef.current?.focus();
  }, [activeChat, isTyping]);

  const handleNewChat = (): void => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: []
    };
    setChats(prevChats => [...prevChats, newChat]);
    setActiveChat(newChat.id);
    setInputValue('');
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, { role: 'user' as const, content: inputValue }]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response: Message = { 
        role: 'assistant', 
        content: 'This is a simulated response.' 
      };
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat 
            ? { ...chat, messages: [...chat.messages, response] }
            : chat
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const deleteChat = (chatId: string): void => {
    if (chats.length === 1) return;

    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    const nextChat = chats[chatIndex + 1] || chats[chatIndex - 1];
    
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    setActiveChat(nextChat.id);
  };

  const handleClearConversations = (): void => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: []
    };
    setChats([newChat]);
    setActiveChat(newChat.id);
    setIsTyping(false);
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col bg-gradient-to-b from-[#B4E8FE] via-[#FFFFFF] to-[#FCE6AA]">
      {/* Ellipses */}
      <div className="fixed z-[0] w-[400px] h-[400px] top-[701px] left-[230px] rounded-full bg-gradient-to-br from-[#FED85C4D] to-[#FE875C4D]"></div>
      <div className="fixed z-[0] w-[605px] h-[605px] top-[-131px] left-[-67px] rounded-full bg-gradient-to-br from-[#1FA1FF4D] to-[#BADFCE4D]"></div>
      <div className="fixed z-[0] w-[1076px] h-[1076px] top-[118px] left-[800px] rounded-full bg-gradient-to-br from-[#EE5C204D] via-[#F29A164D] to-[#3C2FD24D]"></div>

      <nav className="z-[1] flex w-full h-[70px] justify-between items-center p-4">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-md"
          >
            {sidebarOpen ? <Image
            src="/panelClose.png"
            alt="Panel Close Button"
            width={24}
            height={24}/> : <MenuIcon />}
          </button>
          <Link href="/" className="text-[#6B7280] text-md font-bold flex items-center gap-4 ml-16">
            <Image 
              src="/logo.png"
              alt="Querido Dios Logo"
              width={43}
              height={40}
              className="object-contain"
            />
            Querido Dios
          </Link>
        </div>
        <div className="flex gap-4 bg-black">
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden z-[1] relative">
        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? 'w-[60vw] md:w-[24vw] mr-[0rem] bg-[#FFFFFFDE]' : 'w-0 mr-0'
          } fixed md:static z-[50] md:bg-transparent top-[70px] left-0 h-[calc(100vh-70px)] pb-16 md:pb-0
            transition-all duration-300 overflow-hidden md:h-[80vh] flex flex-col self-center pl-6`}
        >

          {/* Chat Area with overlay */}
          {sidebarOpen && (
            <div 
              className="fixed md:hidden top-[70px] left-[60vw] right-0 bottom-0 z-40 bg-gradient-to-r from-[#FFFFFFDE] to-black/40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Chat List */}
          <div className={`w-full h-full overflow-y-auto p-2 ${styles['custom-scrollbar']}`}>
            <div className="space-y-2 border border-transparent">
              {chats.map(chat => (
                <div
                  key={chat.id} 
                  // className={`flex items-center gap-2 border border-transparent hover:border-[#28283B] ${
                  className={`${styles['sidebar-buttons']} group ${
                    activeChat === chat.id ? 'shadow-[0_5px_15px_-5px_rgba(0,0,0,0.3)]' : ''
                  } rounded-md`}
                >
                  <button
                    onClick={() => {
                      setActiveChat(chat.id);
                    }}
                    className="flex-1 text-left text-[#28283B] flex items-center gap-2 text-nowrap"
                  >
                    <Image
                      src="/chat.png"
                      alt="Chat Image"
                      width={18}
                      height={18}
                    />
                    {chat.title}
                  </button>
                  <button 
                    onClick={() => deleteChat(chat.id)}
                    className="md:group-hover:opacity-100 md:opacity-0 opacity-100 text-[#28283B] hover:text-gray-200"
                    // className="group opacity-0 group-hover:opacity-100 text-[#28283B] hover:text-gray-200"
                  >
                    <Image
                      src="/trashcan.png"
                      alt="Delete Button"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom Buttons */}
          <div className="flex flex-col p-2 space-y-2">
            {/* New Chat */}
            <button
              onClick={() => {
                handleNewChat();
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className={`${styles['sidebar-buttons']}`}
            >
              <Image
                src="/plus.png"
                alt="New Chat Icon"
                width={16}
                height={16}
              />
              New chat
            </button>
            {/* Clear Conversations */}
            <button
              onClick={handleClearConversations}
              className={`${styles['sidebar-buttons']}`}
            >
              <Image
                src="/trashcan.png"
                alt="Clear Conversation Icon"
                width={16}
                height={16}
              />
              Clear Conversations
            </button>
            {/* Light Mode */}
            <button
              className={`${styles['sidebar-buttons']}`}
            >
              <Image
                src="/light.png"
                alt="Light Mode Icon"
                width={18}
                height={18}
              />
              Light Mode
            </button>
            {/* My Account */}
            <button
              className={`${styles['sidebar-buttons']}`}
            >
              <Image
                src="/account.png"
                alt="Account Icon"
                width={18}
                height={18}
              />
              My Account
            </button>
            {/* Updates & FAQ */}
            <button
              className={`${styles['sidebar-buttons']}`}
            >
              <Image
                src="/updates.png"
                alt="Updates and FAQ Icon"
                width={18}
                height={18}
              />
              Updates & FAQ
            </button>
            {/* Log Out */}
            <button
              className={`${styles['sidebar-buttons']}`}
            >
              <Image
                src="/logout.png"
                alt="Log Out Icon"
                width={18}
                height={18}
              />
              Log Out
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="relative flex-1 flex flex-col overflow-hidden shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] mt-74 mb-8 mx-8 rounded-3xl bg-white bg-opacity-20 backdrop-blur-2xl">
          { currentChat && currentChat.messages.length === 0 && (
            <div className="absolute w-full h-full flex justify-center pointer-events-none">
              <Image
                src="/biggerLogo.png"
                alt="Logo Icon"
                width={59}
                height={55}
                className="fixed mt-[15vh]"
              />
            </div>
          )}
          <div className="z-[1] flex-1 flex flex-col h-[55%]">
            <div className={`flex-1 overflow-y-auto ${styles['custom-scrollbar']} justify-center`}>
              <div className="max-w-3xl py-6 px-4 space-y-6 mx-auto">
                {currentChat?.messages.map((message, index) => (
                  <div key={index} className={`flex flex-row gap-4 p-4 ${message.role === 'assistant' ? '' : 'justify-end'}`}>
                    <div className={`flex flex-row gap-2 ${message.role === 'assistant' ? '' : 'border border-[#28283B] rounded-xl pl-[9px] pr-4 py-1'}`}>
                      {/* Profile Pic + Name */}
                      <div className={`${
                        message.role === 'assistant' ? 'w-8 h-8 rounded-full flex items-center justify-center bg-green-500' : 'w-0 h-0'
                      } text-[#28283B] text-xs`}>
                        {message.role === 'assistant' ? '[BOT]' : ''}
                      </div>
                      {/* Message Content */}
                      <div className="">
                        <p className="text-sm font-semibold mb-1 text-[#28283B]">
                          {/* {message.role === 'assistant' ? 'Model' : 'You'} */}
                        </p>
                        <p className="text-[#28283B]">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 mb-10">
            <div className="max-w-3xl mx-auto">
              {/* Prompt Suggestions */}
              {currentChat && isNewChat(currentChat) && (
                <div className="mb-4 flex flex-wrap justify-center gap-3 z-[2]">
                  {PROMPT_SUGGESTIONS.map(suggestion => (
                    <button
                      key={suggestion.id}
                      onClick={() => handlePromptClick(suggestion.prompt)}
                      className={`${styles['prompt-buttons']}`}
                      disabled={isTyping}
                      type="button"
                    >
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative">
                <button 
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full"
                >
                  <Image
                    src="/microphone.png"
                    alt="Microphone Icon"
                    width={12.5}
                    height={17.5}
                  />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  placeholder="What's on your mind?"
                  className={`w-full p-4 pl-12 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 text-[#28283B]
                    ${ isTyping ? 'bg-gray-100' : ''
                    }`}
                  disabled={isTyping}
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${
                    isTyping || !inputValue.trim()
                      ? 'text-gray-300' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Image
                    src="/send.png"
                    alt="Send Icon"
                    width={18}
                    height={18}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
