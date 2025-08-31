'use client';

import { AnimatedSection } from './animated-section';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ShoppingCart, 
  Plane, 
  UtensilsCrossed, 
  Car,
  Home,
  Gamepad2,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const agents = [
  {
    id: 1,
    title: "Food Delivery Agent",
    description: "Orders from DoorDash, Uber Eats, Grubhub",
    icon: UtensilsCrossed,
    status: "running",
    tasks: ["Finding best deals", "Placing order", "Tracking delivery"],
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    id: 2,
    title: "Travel Booking Agent",
    description: "Books flights, hotels, rental cars",
    icon: Plane,
    status: "completed",
    tasks: ["Price comparison", "Booking confirmed", "Tickets sent"],
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    id: 3,
    title: "Shopping Agent",
    description: "Amazon, eBay, marketplace purchases",
    icon: ShoppingCart,
    status: "running",
    tasks: ["Product search", "Price monitoring", "Adding to cart"],
    color: "bg-green-500/10 text-green-600"
  },
  {
    id: 4,
    title: "Ride Share Agent",
    description: "Uber, Lyft, taxi bookings",
    icon: Car,
    status: "idle",
    tasks: ["Route optimization", "Driver matching", "Payment processing"],
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    id: 5,
    title: "Real Estate Agent",
    description: "Property search and booking",
    icon: Home,
    status: "running",
    tasks: ["Market analysis", "Viewing scheduled", "Paperwork"],
    color: "bg-pink-500/10 text-pink-600"
  },
  {
    id: 6,
    title: "Entertainment Agent",
    description: "Event tickets, gaming, streaming",
    icon: Gamepad2,
    status: "completed",
    tasks: ["Event search", "Tickets secured", "Calendar updated"],
    color: "bg-yellow-500/10 text-yellow-600"
  }
];

export function BentoSection() {
  return (
    <section className="py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Agents
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One Platform, Infinite Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI agents handle any real-world service you need. Just deposit crypto and watch the magic happen.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {agents.map((agent, index) => (
            <AnimatedSection key={agent.id} delay={index * 0.1}>
              <Card className="relative h-full p-6 glass border-0 group hover:scale-105 transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${agent.color}`}>
                    <agent.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {agent.status === 'running' && (
                      <>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs text-blue-600 font-medium">Running</span>
                      </>
                    )}
                    {agent.status === 'completed' && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">Completed</span>
                      </>
                    )}
                    {agent.status === 'idle' && (
                      <>
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">Idle</span>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{agent.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

                <div className="space-y-2">
                  {agent.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2 text-xs">
                      {taskIndex < 2 || agent.status === 'completed' ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-muted-foreground rounded-full" />
                      )}
                      <span className={taskIndex < 2 || agent.status === 'completed' 
                        ? "text-foreground" 
                        : "text-muted-foreground"}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.8} className="text-center mt-16">
          <Card className="inline-block p-8 glass border-0">
            <h3 className="text-2xl font-bold mb-2">Don't see your service?</h3>
            <p className="text-muted-foreground mb-4">
              Our AI agents can be trained for any real-world task
            </p>
            <Badge variant="secondary" className="text-sm">
              Request Custom Agent
            </Badge>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}