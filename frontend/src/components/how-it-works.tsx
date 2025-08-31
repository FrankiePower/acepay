'use client';

import { AnimatedSection } from './animated-section';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Wallet,
  MessageSquare,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Wallet,
    title: "Connect & Deposit",
    description: "Connect your crypto wallet and deposit funds into our secure escrow",
    details: [
      "Flare Network integration",
      "FTSO price feeds",
      "Secure smart contracts"
    ]
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Describe Your Need",
    description: "Tell our AI what service you want in natural language",
    details: [
      "Natural language processing",
      "Context understanding",
      "Smart suggestions"
    ]
  },
  {
    id: 3,
    icon: Zap,
    title: "AI Agent Executes",
    description: "Our AI agent handles everything automatically and securely",
    details: [
      "Autonomous execution",
      "Real-time updates",
      "Error handling"
    ]
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Verify & Complete",
    description: "Review the results and funds are released automatically",
    details: [
      "Dual verification",
      "Instant settlement",
      "Transparent process"
    ]
  }
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            From Crypto to Service
            <br />
            <span className="text-primary">In 4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of payments. No more complicated exchanges, 
            no more intermediaries. Just pure, seamless automation.
          </p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, index) => (
              <AnimatedSection key={step.id} delay={index * 0.1}>
                <Card className="relative h-full p-6 text-center group hover:scale-105 transition-all duration-500">
                  <div className="relative">
                    {/* Step number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.id}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center justify-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Demo CTA */}
          <AnimatedSection delay={0.6} className="text-center">
            <Card className="inline-block p-8 glass border-0 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-2">Ready to try it?</h3>
              <p className="text-muted-foreground mb-6">
                Start with any service you need. Our AI agents are standing by.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline">
                  Watch Demo
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/20">
                <p className="text-xs text-muted-foreground">
                  ✨ No setup fees • Cancel anytime • 99.9% uptime guarantee
                </p>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}