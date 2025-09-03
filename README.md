# AcePay

**AcePay** is a simple platform that lets you pay with crypto for real-world services. Order food delivery using your crypto wallet - AI agents handle the ordering process automatically.

## How It Works

1. **Connect Wallet** - Connect your crypto wallet  
2. **Order Food** - Choose what you want to order and from where
3. **Pay with Crypto** - Deposit funds into escrow contract
4. **AI Orders** - Our AI agent places your order automatically
5. **Get Your Food** - Food gets delivered to your address

## Tech Stack

- **Frontend:** Next.js, React, Tailwind
- **Backend:** FastAPI, WebSockets  
- **AI:** LangChain, OpenAI GPT-4
- **Blockchain:** Flare Network (FTSO price feeds)
- **Smart Contracts:** Solidity escrow contract

## Quick Start

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend  
cd backend
pip install -r requirements.txt
python main.py
```