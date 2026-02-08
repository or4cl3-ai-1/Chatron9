import { useEffect, useRef, useState } from "react";
import { getChatronCore } from "@/lib/chatron/daedalus-core";
import {
  OrchestrationRequest,
  AffectiveState,
  PlanningResponse,
} from "@shared/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  type: "user" | "system" | "plan";
  content: string;
  timestamp: string;
  data?: PlanningResponse;
}

export default function ChatronChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [affectiveState, setAffectiveState] = useState<AffectiveState>({
    valence: 0.2,
    arousal: 0.5,
    trust: 0.7,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const core = getChatronCore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial system message
    const welcome: ChatMessage = {
      id: "welcome",
      type: "system",
      content:
        "CHATRON-1 initialized. Ready to process planning requests through the Daedalus Epinoetic Nexus.",
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate affective state drift
    const newAffectiveState = {
      valence: Math.max(
        -1,
        Math.min(
          1,
          affectiveState.valence + (Math.random() * 0.2 - 0.1)
        )
      ),
      arousal: Math.max(
        0,
        Math.min(1, affectiveState.arousal + (Math.random() * 0.15 - 0.075))
      ),
      trust: Math.max(
        0,
        Math.min(1, affectiveState.trust + (Math.random() * 0.1 - 0.05))
      ),
    };
    setAffectiveState(newAffectiveState);

    try {
      // Create planning request
      const request: OrchestrationRequest = {
        userIntent: inputValue,
        context:
          "User is actively engaged in planning session. Previous interactions show good system understanding.",
        affectiveState: newAffectiveState,
        timestamp: new Date().toISOString(),
      };

      // Get plan from core
      const response = await core.plan(request);

      // Add system response with plan
      const planMessage: ChatMessage = {
        id: `plan-${Date.now()}`,
        type: "plan",
        content: `Generated ${response.allPlans.length} plan superposition(s). Selected best option with ${(response.selectedPlan.score * 100).toFixed(1)}% confidence.`,
        timestamp: new Date().toISOString(),
        data: response,
      };
      setMessages((prev) => [...prev, planMessage]);

      // Add follow-up system message
      const systemMessage: ChatMessage = {
        id: `sys-${Date.now()}`,
        type: "system",
        content: `Plan ready for execution. Ethical validation: ${response.selectedPlan.ethicalApproval ? "✓ Passed" : "✗ Failed"}. Affective alignment: ${getAffectiveDesc(newAffectiveState)}.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        type: "system",
        content: `Error during planning: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAffectiveDesc = (state: AffectiveState): string => {
    let desc = "";
    if (state.valence > 0.3) desc += "Positive ";
    else if (state.valence < -0.3) desc += "Negative ";
    else desc += "Neutral ";

    if (state.arousal > 0.6) desc += "Engaged ";
    else if (state.arousal < 0.3) desc += "Calm ";

    if (state.trust > 0.6) desc += "Trusting";
    else if (state.trust < 0.3) desc += "Cautious";
    else desc += "Balanced";

    return desc;
  };

  return (
    <div className="min-h-screen bg-black chatron-grid flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-purple-500/30 p-6 bg-black/50 backdrop-blur">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                CHATRON-1 Orchestration Console
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Epinoetic Planning via Natural Language
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                className={`text-xs ${
                  affectiveState.valence > 0
                    ? "bg-green-600"
                    : "bg-red-600"
                } text-white`}
              >
                Val: {affectiveState.valence.toFixed(2)}
              </Badge>
              <Badge className="text-xs bg-yellow-600 text-white">
                Aro: {affectiveState.arousal.toFixed(2)}
              </Badge>
              <Badge className="text-xs bg-blue-600 text-white">
                Tru: {affectiveState.trust.toFixed(2)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full px-6 py-8">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "user" ? (
                  <Card className="max-w-xl bg-gradient-to-r from-purple-900/60 to-purple-800/50 border-purple-500/50 p-4">
                    <p className="text-gray-100">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </Card>
                ) : message.type === "plan" ? (
                  <Card className="max-w-2xl bg-gradient-to-r from-cyan-900/50 to-cyan-800/40 border-cyan-500/50 p-4 w-full">
                    <div className="mb-3">
                      <p className="text-cyan-300 font-semibold text-sm">
                        {message.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>

                    {message.data && (
                      <div className="mt-4 border-t border-cyan-500/30 pt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-xs text-gray-300">
                              Plan ID
                            </label>
                            <p className="text-xs font-mono text-cyan-200 mt-1">
                              {message.data.selectedPlan.planId}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-300">
                              Confidence
                            </label>
                            <p className="text-sm font-bold text-purple-200 mt-1">
                              {(message.data.selectedPlan.score * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="text-xs text-gray-300 block mb-2">
                            Tool Calls
                          </label>
                          <div className="space-y-1">
                            {message.data.selectedPlan.toolCalls.map(
                              (tool, idx) => (
                                <div
                                  key={tool.id}
                                  className="text-xs bg-black/60 p-2 rounded border border-cyan-500/20"
                                >
                                  <span className="text-cyan-300 font-mono">
                                    {idx + 1}.
                                  </span>
                                  <span className="text-gray-200 ml-2">
                                    {tool.name}
                                  </span>
                                  <span className="text-gray-400 text-xs ml-auto float-right">
                                    {tool.description}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Badge
                            className={
                              message.data.selectedPlan.ethicalApproval
                                ? "bg-green-600/70 text-white text-xs"
                                : "bg-red-600/70 text-white text-xs"
                            }
                          >
                            {message.data.selectedPlan.ethicalApproval
                              ? "✓ Ethical"
                              : "✗ Flagged"}
                          </Badge>
                          <Badge className="bg-blue-600/70 text-white text-xs">
                            Ready for Execution
                          </Badge>
                        </div>
                      </div>
                    )}
                  </Card>
                ) : (
                  <Card className="max-w-2xl bg-gray-800/60 border-gray-600/50 p-4">
                    <p className="text-gray-100 text-sm">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </Card>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-gradient-to-r from-purple-600/30 to-purple-500/20 border-purple-500/50 p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-purple-500/30 p-6 bg-black/50 backdrop-blur">
          <div className="max-w-6xl mx-auto flex gap-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Describe your planning request to CHATRON-1..."
              className="flex-1 bg-black/50 border-purple-500/30 text-gray-200 placeholder-gray-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
