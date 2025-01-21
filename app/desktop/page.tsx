// 'use client'
// import React, { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// const MenuIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="black"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="3" y1="12" x2="21" y2="12" />
//     <line x1="3" y1="6" x2="21" y2="6" />
//     <line x1="3" y1="18" x2="21" y2="18" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="8" r="4" />
//     <path d="M20 21a8 8 0 1 0-16 0" />
//   </svg>
// );

// const PageLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-[#B4E8FE] via-[#FFFFFF] to-[#FCE6AA]">
//       {/* Navbar */}
//       <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-[5rem] py-4 border border-black">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             {isSidebarOpen ? <Image 
//             src="/panelClose.png"
//             alt="Panel Close Button"
//             width={24}
//             height={24}/> : <MenuIcon />}
//           </button>
          
//           <div className="flex items-center gap-2">
//             <Link href="/" className="text-[#6B7280] text-md font-bold flex items-center gap-4">
//               <Image
//               src="/logo.png"
//               alt="Querido Dios Logo"
//               width={43}
//               height={40}
//               className="object-contain"
//               />
//               Querido Dios
//             </Link>
//           </div>
//         </div>

//         <button className="p-1 rounded-full hover:bg-gray-100">
//           <UserIcon />
//         </button>
//       </nav>

//       {/* Main Content */}
//       <div className="flex h-full pt-[90px] mx-[4rem]">
//         {/* Sidebar */}
//         <div 
//           className={`${
//             isSidebarOpen ? 'w-[20vw] mr-[4rem]' : 'w-0 mr-0'
//           } flex-shrink-0 transition-all duration-300 overflow-hidden border border-red-500 h-[80vh] flex flex-col self-center`}
//         >
//           <div className="h-[50vh] overflow-y-auto p-4 border border-green-500">
//             {/* Sidebar content */}
//             <div className="space-y-4">
//               <div className="p-2 text-[#28283B] hover:bg-gray-100 rounded-lg cursor-pointer">
//                 <Image
//                   src="/chat.png"
//                   alt="Message Image"
//                   width={24}
//                   height={24}
//                 />
//                 Menu Item 1
//               </div>
//               <div className="p-2 text-[#28283B] hover:bg-gray-100 rounded-lg cursor-pointer">
//                 Menu Item 2
//               </div>
//               {/* Add more menu items as needed */}
//             </div>
//           </div>
//         </div>

//         {/* Right Column Area */}
//         <div className="flex-1 flex flex-col bg-transparent border border-[rgba(255, 255, 255, 0.8)] rounded-3xl h-[85vh] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.7)]">
//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
//             <div className="max-w-3xl text-center self-end">
//               {/* Content goes here */}
//               <div className="space-y-4">
//                 <div className="p-4 bg-white/80 rounded-lg shadow-sm">
//                   Sample content 1
//                 </div>
//                 <div className="p-4 bg-white/80 rounded-lg shadow-sm">
//                   Sample content 2
//                 </div>
//                 {/* Add more content as needed */}
//               </div>
//             </div>
//           </div>
          
//           {/* Input Area */}
//           <div className="p-4">
//             <div className="max-w-3xl mx-auto">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Type your message..."
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 />
//                 <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M22 2L11 13" />
//                     <path d="M22 2L15 22L11 13L2 9L22 2" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Close input area */}
//         </div>
//         {/* Close right column area */}
//       </div>
//       {/* Close everything besides nav */}
//     </div>
//   );
// };

// export default PageLayout;

// ---------------------------------------------------------------------------------

'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './desktop.module.css';
import { useSearchParams  } from 'next/navigation';

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

    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || '');
    }
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
      <div className="flex-1 flex overflow-hidden z-[1]">
        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? 'w-[24vw] mr-[0rem]' : 'w-0 mr-0'
          } flex-shrink-0 transition-all duration-300 overflow-hidden h-[80vh] flex flex-col self-center pl-6`}
        >
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
                    className="group opacity-0 group-hover:opacity-100 text-[#28283B] hover:text-gray-200"
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
              onClick={handleNewChat}
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

// ---------------------------------------------------------------------------------------------------------

// 'use client'
// import React, { useState, useRef, useEffect } from 'react';

// // Type definitions
// interface Message {
//   role: 'assistant' | 'user';
//   content: string;
// }

// interface Chat {
//   id: string;
//   title: string;
//   messages: Message[];
// }

// interface TypingIndicatorProps {
//   className?: string;
// }

// // Prompt suggestions array
// const PROMPT_SUGGESTIONS = [
//   { id: 'advice', text: 'Give advice', prompt: 'I need some general life advice.' },
//   { id: 'creativity', text: 'Creative ideas', prompt: 'Help me think creatively about a problem.' },
//   { id: 'productivity', text: 'Productivity tips', prompt: 'Share some productivity tips.' },
// ];

// // Components
// const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className = '' }) => (
//   <div className={`flex gap-4 p-4 bg-gray-50 ${className}`}>
//     <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white text-xs">
//       [BOT]
//     </div>
//     <div className="flex-1">
//       <p className="text-sm font-semibold mb-1">ChatGPT</p>
//       <div className="flex space-x-2">
//         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//       </div>
//     </div>
//   </div>
// );

// const ChatGPTInterface: React.FC = () => {
//   // State management
//   const [chats, setChats] = useState<Chat[]>([
//     {
//       id: '1',
//       title: 'Example Chat',
//       messages: [
//         { role: 'assistant', content: 'Hello! How can I help you today?' }
//       ]
//     }
//   ]);

//   const [activeChat, setActiveChat] = useState<string>('1');
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
//   const [inputValue, setInputValue] = useState<string>('');
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Helper to check if chat is new (only has initial greeting)
//   const isNewChat = (chat: Chat): boolean => {
//     return chat.messages.length === 1 && chat.messages[0].role === 'assistant';
//   };

//   // Handle prompt suggestion click
//   const handlePromptClick = async (prompt: string): Promise<void> => {
//     if (isTyping) return;
    
//     setInputValue(prompt);
//     const updatedChats = chats.map(chat => {
//       if (chat.id === activeChat) {
//         return {
//           ...chat,
//           messages: [...chat.messages, { role: 'user' as const, content: prompt }]
//         };
//       }
//       return chat;
//     });

//     setChats(updatedChats);
//     setIsTyping(true);

//     // Simulate response
//     setTimeout(() => {
//       const response: Message = { 
//         role: 'assistant', 
//         content: 'This is a simulated response to your prompt.' 
//       };
      
//       setChats(prevChats => 
//         prevChats.map(chat => 
//           chat.id === activeChat 
//             ? { ...chat, messages: [...chat.messages, response] }
//             : chat
//         )
//       );
//       setIsTyping(false);
//       setInputValue('');
//     }, 1500);
//   };

//   const scrollToBottom = (): void => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chats, isTyping]);

//   useEffect(() => {
//     console.log('Active chat changed, attempting to focus input');
//     inputRef.current?.focus();
//   }, [activeChat]);

//   const handleNewChat = (): void => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'New Chat',
//       messages: [
//         { role: 'assistant', content: 'Hello! How can I help you today?' }
//       ]
//     };
//     setChats(prevChats => [...prevChats, newChat]);
//     setActiveChat(newChat.id);
//     setInputValue('');
//     setIsTyping(false);
//     setSidebarOpen(false);
//   };

//   const handleSubmit = async (e: React.FormEvent): Promise<void> => {
//     e.preventDefault();
//     if (!inputValue.trim() || isTyping) return;

//     const updatedChats = chats.map(chat => {
//       if (chat.id === activeChat) {
//         return {
//           ...chat,
//           messages: [...chat.messages, { role: 'user' as const, content: inputValue }]
//         };
//       }
//       return chat;
//     });

//     setChats(updatedChats);
//     setInputValue('');
//     setIsTyping(true);

//     setTimeout(() => {
//       const response: Message = { 
//         role: 'assistant', 
//         content: 'This is a simulated response.' 
//       };
      
//       setChats(prevChats => 
//         prevChats.map(chat => 
//           chat.id === activeChat 
//             ? { ...chat, messages: [...chat.messages, response] }
//             : chat
//         )
//       );
//       setIsTyping(false);
//     }, 1500);
//   };

//   const deleteChat = (chatId: string): void => {
//     setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
//     if (activeChat === chatId) {
//       setActiveChat(chats[0]?.id || '');
//     }
//   };

//   const currentChat = chats.find(chat => chat.id === activeChat);

//   return (
//     <div className="h-screen flex flex-col bg-white">
//       {/* Navigation Bar */}
//       <nav className="w-full bg-gray-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <button 
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="p-2 hover:bg-gray-800 rounded-md"
//               >
//                 <span className="text-sm">{sidebarOpen ? '[X]' : '[MENU]'}</span>
//               </button>
//               <span className="ml-4 font-semibold">
//                 {currentChat?.title || 'ChatGPT'}
//               </span>
//             </div>
//             <button 
//               onClick={handleNewChat}
//               className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 p-2 rounded-md"
//             >
//               <span className="text-sm">[+]</span>
//               New chat
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Sidebar */}
//         {sidebarOpen && (
//           <div className="w-64 bg-gray-900 flex flex-col">
//             {/* Chat List */}
//             <div className="flex-1 overflow-y-auto p-2">
//               <div className="space-y-2">
//                 {chats.map(chat => (
//                   <div 
//                     key={chat.id} 
//                     className={`group flex items-center gap-2 ${
//                       activeChat === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'
//                     } rounded-md`}
//                   >
//                     <button 
//                       onClick={() => {
//                         setActiveChat(chat.id);
//                         setSidebarOpen(false);
//                         setTimeout(() => inputRef.current?.focus(), 100);
//                       }}
//                       className="flex-1 text-left text-gray-300 p-3 flex items-center gap-2"
//                     >
//                       <span className="text-sm">[CHAT]</span>
//                       <span className="truncate">{chat.title}</span>
//                     </button>
//                     <button 
//                       onClick={() => deleteChat(chat.id)}
//                       className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-200"
//                     >
//                       <span className="text-sm">[DEL]</span>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Sidebar Footer */}
//             <div className="p-4 border-t border-gray-800">
//               <button 
//                 onClick={() => {
//                   const currentChatId = activeChat;
//                   setChats(prevChats => prevChats.filter(chat => chat.id === currentChatId));
//                 }}
//                 className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800 p-3 rounded-md text-sm"
//               >
//                 <span className="text-sm">[TRASH]</span>
//                 Clear conversations
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col overflow-hidden bg-white">
//           <div className="flex-1 overflow-y-auto">
//             <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
//               {currentChat?.messages.map((message, index) => (
//                 <div key={index} className={`flex gap-4 p-4 ${message.role === 'assistant' ? 'bg-gray-50' : ''}`}>
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     message.role === 'assistant' ? 'bg-green-500' : 'bg-gray-500'
//                   } text-white text-xs`}>
//                     {message.role === 'assistant' ? '[BOT]' : '[YOU]'}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold mb-1">
//                       {message.role === 'assistant' ? 'ChatGPT' : 'You'}
//                     </p>
//                     <p className="text-gray-700">{message.content}</p>
//                   </div>
//                 </div>
//               ))}
//               {isTyping && <TypingIndicator />}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Input Area */}
//           <div className="border-t border-gray-200 p-4">
//             <div className="max-w-3xl mx-auto">
//               {/* Prompt Suggestions */}
//               {currentChat && isNewChat(currentChat) && (
//                 <div className="mb-4 flex flex-wrap gap-2">
//                   {PROMPT_SUGGESTIONS.map(suggestion => (
//                     <button
//                       key={suggestion.id}
//                       onClick={() => handlePromptClick(suggestion.prompt)}
//                       className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
//                       disabled={isTyping}
//                     >
//                       {suggestion.text}
//                     </button>
//                   ))}
//                 </div>
//               )}
              
//               <form onSubmit={handleSubmit} className="relative">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={inputValue}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
//                   placeholder="Send a message..."
//                   className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
//                   disabled={isTyping}
//                 />
//                 <button 
//                   type="submit"
//                   disabled={isTyping || !inputValue.trim()}
//                   className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${
//                     isTyping || !inputValue.trim() 
//                       ? 'text-gray-300' 
//                       : 'text-gray-400 hover:text-gray-600'
//                   }`}
//                 >
//                   <span className="text-sm">[SEND]</span>
//                 </button>
//               </form>
//               <p className="text-xs text-center text-gray-500 mt-2">
//                 ChatGPT can make mistakes. Consider checking important information.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatGPTInterface;
