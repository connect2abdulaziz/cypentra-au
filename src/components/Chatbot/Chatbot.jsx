'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, ExternalLink, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { sendChatMessage } from '@/services/chatbot'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m Cypentra\'s AI assistant. How can I help you with cybersecurity, compliance, or our services today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [messages, isOpen])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const data = await sendChatMessage(userMessage.content)

      if (data.success && data.data) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.data.answer,
          sources: data.data.sources || [],
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(data.message || 'Failed to get response')
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again in a moment.',
        isError: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#0091a4] text-black rounded-full shadow-2xl shadow-[#0091a4]/40 flex items-center justify-center hover:bg-white transition-all duration-300 group'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key='close'
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className='w-6 h-6 sm:w-7 sm:h-7' />
            </motion.div>
          ) : (
            <motion.div
              key='open'
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className='w-6 h-6 sm:w-7 sm:h-7' />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.span
            className='absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#0091a4]'
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='fixed bottom-24 right-6 lg:top-20 lg:bottom-auto z-50 w-[calc(100vw-3rem)] sm:w-96 md:w-[420px] lg:w-[450px] h-[calc(100vh-8rem)] max-h-[600px] sm:h-[calc(100vh-7rem)] sm:max-h-[650px] lg:h-[calc(100vh-6rem)] lg:max-h-[700px] bg-black border-2 border-[#0091a4]/30 rounded-2xl shadow-2xl shadow-[#0091a4]/20 flex flex-col overflow-hidden backdrop-blur-xl'
            >
              {/* Header */}
              <div className='bg-gradient-to-r from-[#0091a4]/20 to-[#0091a4]/10 border-b border-[#0091a4]/30 p-4 sm:p-5 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0091a4] flex items-center justify-center overflow-hidden'>
                    <Image
                      src='/icon.png'
                      alt='Cypentra Logo'
                      width={24}
                      height={24}
                      className='w-6 h-6 sm:w-7 sm:h-7 object-contain'
                      style={{
                        filter: 'brightness(0)',
                      }}
                    />
                  </div>
                  <div>
                    <h3 className='text-white font-bold text-sm sm:text-base'>Cypentra AI Assistant</h3>
                    <p className='text-[#0091a4] text-xs font-medium'>Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className='text-white/60 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              {/* Messages Container */}
              <div className='flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-hide'>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0091a4]/20 flex items-center justify-center flex-shrink-0 overflow-hidden p-1'>
                        <Image
                          src='/icon.png'
                          alt='Cypentra Logo'
                          width={20}
                          height={20}
                          className='w-full h-full object-contain'
                          style={{
                            filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(160deg)',
                          }}
                        />
                      </div>
                    )}
                    <div className={`max-w-[80%] sm:max-w-[75%] ${message.type === 'user' ? 'order-2' : ''}`}>
                      <div
                        className={`rounded-2xl p-3 sm:p-4 ${
                          message.type === 'user'
                            ? 'bg-[#0091a4] text-black'
                            : message.isError
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-white/5 text-white border border-white/10'
                        }`}
                      >
                        <p className='text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap'>
                          {message.content}
                        </p>
                      </div>
                      {message.sources && message.sources.length > 0 && (
                        <div className='mt-2 space-y-1.5'>
                          <p className='text-[#0091a4] text-xs font-semibold'>Sources:</p>
                          {message.sources.map((source, idx) => (
                            <motion.a
                              key={idx}
                              href={source.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              whileHover={{ x: 3 }}
                              className='flex items-center gap-2 text-xs text-white/60 hover:text-[#0091a4] transition-colors group'
                            >
                              <ExternalLink className='w-3 h-3 opacity-50 group-hover:opacity-100' />
                              <span className='line-clamp-1'>Source {idx + 1} (Score: {Math.round(source.score * 100)}%)</span>
                            </motion.a>
                          ))}
                        </div>
                      )}
                      <p className='text-white/30 text-[10px] mt-1.5'>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0091a4] flex items-center justify-center flex-shrink-0 order-3'>
                        <User className='w-4 h-4 sm:w-5 sm:h-5 text-black' />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex gap-3 justify-start'
                  >
                    <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0091a4]/20 flex items-center justify-center overflow-hidden p-1'>
                      <Image
                        src='/icon.png'
                        alt='Cypentra Logo'
                        width={20}
                        height={20}
                        className='w-full h-full object-contain'
                        style={{
                          filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(160deg)',
                        }}
                      />
                    </div>
                    <div className='bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4'>
                      <div className='flex items-center gap-2'>
                        <Loader2 className='w-4 h-4 text-[#0091a4] animate-spin' />
                        <span className='text-white/60 text-xs sm:text-sm'>Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className='border-t border-white/10 p-4 bg-black/50'>
                <div className='flex items-end gap-2'>
                  <div className='flex-1 relative'>
                    <input
                      ref={inputRef}
                      type='text'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder='Ask about Cypentra...'
                      disabled={isLoading}
                      className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-[#0091a4] focus:ring-2 focus:ring-[#0091a4]/20 transition-all disabled:opacity-50'
                    />
                  </div>
                  <motion.button
                    type='submit'
                    disabled={!inputValue.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-11 h-11 sm:w-12 sm:h-12 bg-[#0091a4] text-black rounded-xl flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isLoading ? (
                      <Loader2 className='w-5 h-5 animate-spin' />
                    ) : (
                      <Send className='w-5 h-5' />
                    )}
                  </motion.button>
                </div>
                <p className='text-white/40 text-[10px] mt-2 text-center'>
                  Powered by Cypentra AI • Responses may vary
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

