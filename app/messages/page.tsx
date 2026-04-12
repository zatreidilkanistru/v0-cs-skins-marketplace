"use client"

import { useState, useRef, useEffect } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  ImageIcon,
  Paperclip,
  Shield,
  AlertTriangle,
  Check,
  CheckCheck,
  ArrowLeft,
  MessageSquare,
} from "lucide-react"

// Mock conversations data
const mockConversations = [
  {
    id: "1",
    user: {
      name: "SkinMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=skin",
      online: true,
      verified: true,
    },
    lastMessage: "Sounds good, I'll accept the trade offer now",
    timestamp: "2 min ago",
    unread: 2,
    tradeLinked: true,
    tradeId: "trade-12345",
  },
  {
    id: "2",
    user: {
      name: "CryptoTrader",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crypto",
      online: true,
      verified: true,
    },
    lastMessage: "Can you do $2,200 for the Howl?",
    timestamp: "15 min ago",
    unread: 0,
    tradeLinked: false,
  },
  {
    id: "3",
    user: {
      name: "KnifeLover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=knife",
      online: false,
      verified: false,
    },
    lastMessage: "Thanks for the trade! Left you a review",
    timestamp: "1 hour ago",
    unread: 0,
    tradeLinked: true,
    tradeId: "trade-12344",
  },
  {
    id: "4",
    user: {
      name: "CSGOPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=csgopro",
      online: false,
      verified: true,
    },
    lastMessage: "Is the Dragon Lore still available?",
    timestamp: "3 hours ago",
    unread: 1,
    tradeLinked: false,
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "other",
    content: "Hey! I'm interested in your M4A4 Howl. Is it still available?",
    timestamp: "10:30 AM",
    read: true,
  },
  {
    id: "2",
    senderId: "me",
    content: "Yes, it's still available! The float is 0.041 and it has Titan Holo stickers.",
    timestamp: "10:32 AM",
    read: true,
  },
  {
    id: "3",
    senderId: "other",
    content: "Nice! What's your best price? I can pay in USDT or ETH",
    timestamp: "10:35 AM",
    read: true,
  },
  {
    id: "4",
    senderId: "me",
    content: "I'm asking $2,450 but I could do $2,400 for a quick sale",
    timestamp: "10:38 AM",
    read: true,
  },
  {
    id: "5",
    senderId: "other",
    content: "Can you do $2,200? That's my budget",
    timestamp: "10:40 AM",
    read: true,
  },
  {
    id: "6",
    senderId: "me",
    content: "Sorry, lowest I can go is $2,350. The stickers alone add significant value.",
    timestamp: "10:42 AM",
    read: true,
  },
  {
    id: "7",
    senderId: "other",
    content: "Alright, let me think about it. I'll get back to you soon.",
    timestamp: "10:45 AM",
    read: true,
  },
  {
    id: "8",
    senderId: "other",
    content: "Sounds good, I'll accept the trade offer now",
    timestamp: "2 min ago",
    read: false,
  },
]

function MessagesContent() {
  const { isCollapsed } = useSidebar()
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedChat = conversations.find(c => c.id === selectedConversation)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message = {
      id: Date.now().toString(),
      senderId: "me",
      content: newMessage,
      timestamp: "Just now",
      read: false,
    }
    
    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredConversations = conversations.filter(c =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r border-border flex flex-col bg-card">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No conversations</p>
                </div>
              ) : (
                filteredConversations.map(conversation => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left hover:bg-secondary/50 transition-colors ${
                      selectedConversation === conversation.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="font-medium truncate">{conversation.user.name}</span>
                          {conversation.user.verified && (
                            <Shield className="h-3 w-3 text-primary" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {conversation.tradeLinked && (
                          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                            Trade linked
                          </span>
                        )}
                        {conversation.unread > 0 && (
                          <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                      <AvatarFallback>{selectedChat.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {selectedChat.user.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{selectedChat.user.name}</span>
                      {selectedChat.user.verified && (
                        <Shield className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.user.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedChat.tradeLinked && (
                    <Button variant="outline" size="sm">
                      View Trade
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Trade Link Banner */}
              {selectedChat.tradeLinked && (
                <div className="px-6 py-2 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
                  <p className="text-sm text-primary">
                    This conversation is linked to trade #{selectedChat.tradeId}
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary h-7">
                    Open Trade
                  </Button>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Safety Warning */}
                <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg max-w-md mx-auto">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-yellow-500">
                      Never share your login credentials or trade URLs outside of the platform. 
                      All trades are protected by escrow.
                    </p>
                  </div>
                </div>

                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === "me"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        <span className="text-[10px]">{message.timestamp}</span>
                        {message.senderId === "me" && (
                          message.read ? (
                            <CheckCheck className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px] max-h-32"
                      rows={1}
                    />
                  </div>
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-secondary/20">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <SidebarProvider>
      <MessagesContent />
    </SidebarProvider>
  )
}
