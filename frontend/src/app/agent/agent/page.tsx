'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Play, Square, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { ethers } from 'ethers';

interface LogUpdate {
  id: string;
  message: string;
  timestamp: Date;
}

// TaskEscrow ABI for agent completion
const TASK_ESCROW_ABI = [
  "function completeTask(uint256 taskId) external",
  "function nextTaskId() external view returns (uint256)",
  "function tasks(uint256) external view returns (address user, address agent, uint256 amount, string description, uint8 status, uint256 createdAt, uint256 completedAt)"
];

export default function AgentPage() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogUpdate[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "completed" | "error">("idle");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const handleBack = () => {
    router.push('/services/food-delivery');
  };

  const handleNext = () => {
    router.push('/services/order-complete');
  };

  const startAgent = () => {
    setIsRunning(true);
    setStatus("running");
    setLogs([]);

    // Get stored order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    
    if (!storedOrder) {
      const errorLog: LogUpdate = {
        id: `log-${Date.now()}`,
        message: "No booking data found. Please make a booking first.",
        timestamp: new Date(),
      };
      setLogs((prev) => [...prev, errorLog]);
      setIsRunning(false);
      setStatus("error");
      return;
    }

    // Mock WebSocket simulation for now
    const mockLogs = [
      "🚀 Initializing AI agent for food delivery...",
      "📍 Processing delivery address...",
      "🔍 Searching for restaurant on DoorDash...",
      "📝 Adding items to cart...",
      "💳 Processing payment with virtual card...",
      "✅ Order placed successfully!"
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        const newLog: LogUpdate = {
          id: `log-${Date.now()}-${logIndex}`,
          message: mockLogs[logIndex],
          timestamp: new Date(),
        };
        setLogs((prev) => [...prev, newLog]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        
        // Simulate completion
        setTimeout(async () => {
          const doneLog: LogUpdate = {
            id: `log-${Date.now()}`,
            message: "✅ Agent task completed successfully! Your order is on the way. Calling escrow contract...",
            timestamp: new Date(),
          };
          setLogs((prev) => [...prev, doneLog]);

          try {
            // Simulate blockchain call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const contractLog: LogUpdate = {
              id: `log-${Date.now()}`,
              message: "✅ Escrow contract updated - task marked as completed!",
              timestamp: new Date(),
            };
            setLogs((prev) => [...prev, contractLog]);

            // Wait a moment then redirect to order complete
            setTimeout(() => {
              router.push('/services/order-complete');
            }, 2000);

          } catch (error) {
            const errorLog: LogUpdate = {
              id: `log-${Date.now()}`,
              message: `❌ Failed to update escrow contract: ${error instanceof Error ? error.message : 'Unknown error'}`,
              timestamp: new Date(),
            };
            setLogs((prev) => [...prev, errorLog]);
          }

          setIsRunning(false);
          setStatus("completed");
        }, 1000);
      }
    }, 2000);
  };

  const stopAgent = () => {
    setIsRunning(false);
    setStatus("idle");
    const stopLog: LogUpdate = {
      id: `log-${Date.now()}`,
      message: "Agent stopped by user",
      timestamp: new Date(),
    };
    setLogs((prev) => [...prev, stopLog]);
    socketRef.current?.close();
  };

  const clearLogs = () => {
    setLogs([]);
    setStatus("idle");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [logs]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center mb-20 relative">
        <h1 className="text-5xl font-bold tracking-tight mb-6 text-center text-foreground">
          <b>Ace</b>Pay
          <span className="text-primary">.</span>
        </h1>

        <div className="relative w-[600px]">
          {/* Back Arrow */}
          <button
            onClick={handleBack}
            className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <Card className="w-full overflow-hidden gap-2 relative bg-card">
            <CardHeader className="z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">AI Agent</CardTitle>
                  <CardDescription className="text-muted-foreground">Monitor your agent's progress in real-time</CardDescription>
                </div>
                <Badge variant={status === "completed" ? "secondary" : status === "running" ? "default" : "outline"}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {!isRunning ? (
                  <Button 
                    onClick={startAgent} 
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Play className="h-4 w-4" />
                    Start Agent
                  </Button>
                ) : (
                  <Button 
                    onClick={stopAgent} 
                    variant="destructive" 
                    className="flex items-center gap-2"
                  >
                    <Square className="h-4 w-4" />
                    Stop Agent
                  </Button>
                )}
                <Button 
                  onClick={clearLogs} 
                  variant="outline" 
                  disabled={isRunning}
                >
                  Clear Logs
                </Button>
              </div>

              <div className="border rounded-lg p-6 bg-muted/20">
                <div className="flex flex-col items-center justify-center mb-6">
                  {isRunning ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-12 w-12 animate-spin mb-3 text-primary" />
                      <p className="font-medium text-foreground">Agent is working...</p>
                    </div>
                  ) : status === "completed" ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-12 w-12 mb-3 text-primary" />
                      <p className="font-medium text-foreground">Task completed!</p>
                    </div>
                  ) : status === "error" ? (
                    <div className="flex flex-col items-center">
                      <AlertCircle className="h-12 w-12 mb-3 text-primary" />
                      <p className="font-medium text-foreground">Error occurred</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full border-2 border-border flex items-center justify-center mb-3">
                        <Play className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-muted-foreground">Ready to start</p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 border-border">
                  <h3 className="text-sm font-medium mb-3 text-foreground">Agent Logs</h3>
                  <ScrollArea ref={scrollAreaRef} className="h-64 pr-4">
                    {logs.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">No logs yet. Start the agent to see updates.</p>
                    ) : (
                      <div className="space-y-2">
                        {logs.map((log) => (
                          <div
                            key={log.id}
                            className="py-2 border-b border-border flex justify-between items-center animate-in fade-in duration-300"
                          >
                            <span className="text-foreground">{log.message}</span>
                            <span className="text-xs text-muted-foreground">{formatTime(log.timestamp)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}