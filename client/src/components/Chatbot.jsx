import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatbotService } from '../services/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am ChronoCare AI. I can help answer questions about chronobiology, medication timing, and health. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatbotService.chat(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to my service right now. Please try again later.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert markdown bold (**text**) to HTML <strong> elements
  const formatText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: "var(--color-healthcare-main)" }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'var(--color-healthcare-main)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
          border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(0.8)' : 'scale(1)',
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto'
        }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '380px', height: '600px', maxHeight: '80vh',
          background: 'var(--bg-card)',
          borderRadius: '20px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          overflow: 'hidden', backdropFilter: 'blur(16px)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-healthcare-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'white' }}>ChronoCare AI</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-healthcare-main)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>
                Online
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Messages Layout */}
        <div className="custom-scrollbar" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', maxWidth: '85%', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                
                {/* Avatar */}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} color="var(--color-healthcare-main)" />}
                </div>

                {/* Bubble */}
                <div style={{
                  padding: '12px 16px', borderRadius: '16px', fontSize: '14px', lineHeight: '1.5',
                  background: msg.role === 'user' ? 'var(--color-primary)' : msg.isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                  color: msg.isError ? '#f87171' : 'white',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                }}>
                  {formatText(msg.content)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)' }}>
                <Bot size={14} color="var(--color-healthcare-main)" />
              </div>
              <div style={{ padding: '12px 16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', borderBottomLeftRadius: '4px', color: 'var(--text-secondary)' }}>
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', position: 'relative' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              style={{
                flex: 1, padding: '12px 48px 12px 16px', borderRadius: '24px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'white', fontSize: '14px', outline: 'none'
              }}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              style={{
                position: 'absolute', right: '4px', top: '4px', bottom: '4px',
                width: '38px', borderRadius: '50%',
                background: input.trim() ? 'var(--color-healthcare-main)' : 'transparent',
                color: input.trim() ? 'white' : 'var(--text-secondary)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
            >
              <Send size={16} style={{ marginLeft: '2px' }} />
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
            AI can make mistakes. Check important information.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
