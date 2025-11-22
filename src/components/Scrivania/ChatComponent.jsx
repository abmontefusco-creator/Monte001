import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { Card } from "../Card"
import { fetchTenantData } from "../../services/api";
import { useTranslation } from "../../contexts/LanguageContext";

export const ChatComponent = () => {
        const { user } = useAuth();
        const [users, setUsers] = useState([]);
        const { t } = useTranslation();
        //const myChats = MOCK_DB.chats.filter(c => c.membriIds.includes(user._id));
        //const [selectedChat, setSelectedChat] = useState(myChats[0]);
        //const [newMessage, setNewMessage] = useState('');
        const [myChats, setChats] = useState([]);
        const [messages, setMessages] = useState([]);
        const [selectedChat, setSelectedChat] = useState(null);

        useEffect(() => {
            fetch("http://localhost:5000/api/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Errore caricamento utenti", err));
        }, []);

        useEffect(() => {
            const loadChats = async () => {
                const res = await fetch(`http://localhost:5000/api/chats?userId=${user._id}`);
                const data = await res.json();
                setChats(data);
            };
            loadChats();
        }, [user._id]);

        useEffect(() => {
            if (!selectedChat) return;
            const loadMessages = async () => {
                const res = await fetch(`http://localhost:5000/api/messaggi?chatId=${selectedChat._id}`);
                const data = await res.json();
                setMessages(data);
            };
            loadMessages();
        }, [selectedChat]);


        const handleSend = () => {
            if (newMessage.trim() === '') return;
            const msg = {
                id: `msg-${Date.now()}`, chatId: selectedChat._id, autoreId: user._id,
                testo: newMessage, timestamp: new Date().toISOString(), reazioni: {}
            };
            setMessages(prev => [...prev, msg]);
            setNewMessage('');
        };

        /*const getChatPartner = (chat) => {
            if (chat.tipo === 'gruppo') return { nome: chat.nome, foto: 'https://placehold.co/40x40/E2E8F0/4A5568?text=G' };
            const otherUserId = chat.membriIds.find(id => id !== user._id);
            return MOCK_DB.users.find(u => u._id === otherUserId);
        };*/

        const getChatPartner = (chat) => {
            if (chat.tipo === 'gruppo') {
                return { 
                    nome: chat.nome, 
                    foto: 'https://placehold.co/40x40/E2E8F0/4A5568?text=G' 
                };
            }

            // trova id dell'altro utente
            const otherUserId = chat.membriIds.find(id => id !== user._id);

            // trova utente nei users caricati dal backend
            return users.find(u => u._id === otherUserId);
        };

        return (
            <Card className="h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('chat_messaggi')}</h3>
                <div className="flex-grow flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
                        {myChats.map(chat => {
                            const partner = getChatPartner(chat);
                            console.log("partner:", partner);
                            //const lastMessage = MOCK_DB.messaggi.filter(m => m.chatId === chat._id).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                            const lastMessage = messages
                                .filter(m => m.chatId === chat._id)
                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                            return (
                                <div key={chat._id} onClick={() => { setSelectedChat(chat); setMessages(MOCK_DB.messaggi.filter(m => m.chatId === chat._id)); }} className={`p-4 cursor-pointer flex items-center ${selectedChat?._id === chat._id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <img src={partner.foto} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                                    <div className="flex-grow overflow-hidden">
                                        <p className="font-semibold truncate">{partner.nome} {partner.cognome || ''}</p>
                                        <p className="text-sm text-gray-500 truncate">{lastMessage?.testo}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-2/3 flex flex-col">
                        {selectedChat ? (
                            <>
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                                    <img src={getChatPartner(selectedChat).foto} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                                    <h4 className="font-semibold">{getChatPartner(selectedChat).nome} {getChatPartner(selectedChat).cognome || ''}</h4>
                                </div>
                                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-white dark:bg-gray-900">
                                    {messages.map(msg => {
                                        const author = MOCK_DB.users.find(u => u._id === msg.autoreId);
                                        const isMe = author._id === user._id;
                                        return (
                                            <div key={msg._id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                {!isMe && <img src={author.foto} alt="author" className="w-8 h-8 rounded-full" />}
                                                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${isMe ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                                                    <p>{msg.testo}</p>
                                                    <p className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-gray-500'}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center">
                                    <button className="p-2 text-gray-500 hover:text-blue-500"><Smile /></button>
                                    <button className="p-2 text-gray-500 hover:text-blue-500"><Paperclip /></button>
                                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Scrivi un messaggio..." className="flex-grow bg-transparent focus:outline-none mx-2" />
                                    <button onClick={handleSend} className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"><Send /></button>
                                </div>
                            </>
                        ) : <div className="flex-grow flex items-center justify-center text-gray-500">Seleziona una chat per iniziare a messaggiare</div>}
                    </div>
                </div>
            </Card>
        );
    };