"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface AiLecturerProps {
    context: any; // Chapter data to pass as context
}

export function AiLecturer({ context }: AiLecturerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");

    const { messages, sendMessage, status, error } = useChat({
        body: { context },
        onError: (err: any) => {
            console.error("AI Chat Error:", err);
        }
    } as any);

    const isLoading = status === "submitted" || status === "streaming";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        await sendMessage({ text: input });
        setInput("");
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 left-6 w-96 h-[600px] bg-background border border-border rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden font-main"
                        dir="rtl"
                    >
                        {/* Header */}
                        <div className="bg-primary px-4 py-3 flex items-center justify-between text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary-foreground/20 p-1.5 rounded-full">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">המרצה הדיגיטלי</h3>
                                    <p className="text-xs opacity-90">כאן כדי לעזור לך ללמוד</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-primary-foreground/20 p-1 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        {error && (
                            <div className="bg-red-50 border-b border-red-200 p-2 text-xs text-red-700 text-center">
                                שגיאה: {error.message || "משהו השתבש, נסה שוב."}
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            <div className="text-center text-muted-foreground mt-8 text-sm px-6">
                                <p className="mb-4">היי! שאל אותי כל דבר על הנושא הזה — מה שעולה לך בראש.</p>
                                <p className="mb-2">אני אענה בשתי דרכים:</p>
                                <div className="space-y-3 pt-2">
                                    <p>🎓 <strong>טון מרצה</strong> — שפה אקדמית, פורמלית, מדויקת.</p>
                                    <p>🍺 <strong>שיחת בר</strong> — עברית של אנשים, הסבר רחוב, ישיר לעניין.</p>
                                </div>
                            </div>
                            {messages.map((m: UIMessage) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-background border border-border rounded-bl-none"
                                            }`}
                                    >
                                        <div className="prose-container rtl text-right">
                                            {m.parts.map((part: any, i: number) => (
                                                part.type === "text" ? (
                                                    <ReactMarkdown
                                                        key={i}
                                                        components={{
                                                            p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
                                                            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 pr-2">{children}</ul>,
                                                            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 pr-2">{children}</ol>,
                                                            li: ({ children }) => <li className="mb-1">{children}</li>,
                                                            hr: () => <hr className="my-8 border-t-2 border-border/40" />,
                                                            strong: ({ children }) => <strong className="font-black text-sky-800/90">{children}</strong>,
                                                            h1: ({ children }) => <h1 className="text-lg font-bold mb-4 mt-2">{children}</h1>,
                                                            h2: ({ children }) => <h2 className="text-md font-bold mb-3 mt-2">{children}</h2>,
                                                        }}
                                                    >
                                                        {part.text}
                                                    </ReactMarkdown>
                                                ) : part.type === "reasoning" ? (
                                                    <div key={i} className="text-xs italic opacity-70 mb-4 border-r-2 border-primary/30 pr-2">
                                                        {part.text}
                                                    </div>
                                                ) : null
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-end">
                                    <div className="bg-background border border-border rounded-2xl rounded-bl-none px-4 py-2.5 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-3 bg-background border-t border-border flex gap-2"
                        >
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="שאל שאלה על הפרק..."
                                className="flex-1 bg-muted/50 border border-input rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/70"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-primary text-primary-foreground p-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button Container */}
            <div className="fixed bottom-24 left-6 z-50 flex flex-col items-center gap-2">
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border shadow-sm whitespace-nowrap mb-1"
                    >
                        שאל אותי כל דבר על הנושא
                    </motion.div>
                )}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <MessageCircle size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </>
    );
}
