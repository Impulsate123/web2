
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAiChatResponse } from '../services/geminiService';

const ChatIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.53-.388m-5.168-4.48a9.76 9.76 0 0 1-.388-2.53C3.75 7.444 7.78 3.75 12.75 3.75c4.97 0 9 3.694 9 8.25Z" />
  </svg>
);
const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);
const SendIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

const LoadingDots: React.FC = () => (
    <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
)

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "¡Hola! Soy el asistente de EduVerse. ¿Cómo puedo ayudarte hoy?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);
        
        const history = newMessages.map(m => `${m.sender}: ${m.text}`).join('\n');
        const aiResponse = await getAiChatResponse(history);
        
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        setIsLoading(false);
    };

    return (
        <>
            <div className={`fixed bottom-8 right-8 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-primary text-white rounded-full p-4 shadow-2xl hover:bg-indigo-500 transition-transform transform hover:scale-110 animate-subtle-pulse"
                    aria-label="Abrir chat"
                >
                    <ChatIcon className="w-8 h-8" />
                </button>
            </div>
            
            <div className={`fixed bottom-8 right-8 w-[calc(100%-4rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-gray-900 p-4 rounded-t-2xl flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Asistente EduVerse</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="Cerrar chat">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-700 text-gray-200 rounded-2xl rounded-bl-none px-4 py-2">
                               <LoadingDots/>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Haz una pregunta..."
                            className="w-full bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-brand-primary text-white rounded-full p-3 hover:bg-indigo-500 disabled:bg-gray-600 transition" disabled={isLoading}>
                            <SendIcon className="w-5 h-5"/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatWidget;
