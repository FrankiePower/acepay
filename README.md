# ACEPAY

Empower anyone to receive and transfer funds, instantly & without fees.

UX is well known to be one of the subject that need a lot of improvements in Web3 - there's just too much terms and concepts to understand for your mother to start using a web3 app.

acepay (from the latin solvere, to settle / pay / solve) aims to be a user friendly replacement to a quick payment app like Venmo or PayPal, using crypto under the hood without you even knowing it. Create an account with your email or social login with Google/Apple etc, choose a username and you are ready to go! Top up your account with a credit card and send money to your friends & family in a few clicks without ever seeing a transaction signature modal or seeing the words "gas fees". If you are already a degen, you can of course login with your favorite wallet, top up your account with crypto on EVM chains, and take full control of your underlying wallet at any time (which acepay never has access to).

acepay is a Real World payment app, for Real World users.

## ⚙️ Installation

To run the project locally, simply clone the repository and follow these steps

### Contracts

The following contract addresses are the ones of the deployed version on Polygon mainnet, feel free to use them or to redeploy the contracts (all located in [the contracts folder](./contracts/)).
- ENS L2Registry: [`0xba9f0059500df81eb4ab8ccd16fd3df379ba7c57`](https://polygonscan.com/address/0xba9f0059500df81eb4ab8ccd16fd3df379ba7c57)
- ENS L2Registrar: [`0xbd806fDB39a7c23a4343376ABA7DbA890b14a106`](https://polygonscan.com/address/0xbd806fDB39a7c23a4343376ABA7DbA890b14a106)
- PaymentContract: [`0x58B073955759Ca04b0d574cB432835B2B304DCd2`](https://polygonscan.com/address/0x58B073955759Ca04b0d574cB432835B2B304DCd2)

### Frontend

Duplicate the `.env.example` file into `.env` and fill the required variables:
```sh
# ThirdWeb setup
VITE_THIRDWEB_CLIENT_ID=

# URL where you will deploy the backend, this is the default
VITE_BACKEND_API_URL=http://localhost:8000

# The deployed version of the payment contract
VITE_PAYMENT_CONTRACT_ADDRESS=0x58B073955759Ca04b0d574cB432835B2B304DCd2

```

Then you just need to install the dependencies and start the project:
```sh
npm install
npm run dev
```

### Backend

Again, duplicate the `.env.example` file into `.env` and fill the required variables.

For Curvegrid, you need to [create a deployment](https://docs.curvegrid.com/multibaas/getting-started/account-and-deployment/) on Polygon mainnet.\
You can then create an API key, a Cloud Wallet (to get the HSM address), and add the ENS contracts to your library. Finally, create a webhook to the `/curvegrid/internal-webhook` route of your backend and add the secret in the end.

The other variables are self-explanatory and default values are generally fine.\
There's only a Pinata account & API key to create, and a Thirdweb webhook for topups detection to setup (that should go to the `/thirdweb/webhook` route).
```sh
# -- Curvegrid --
CURVEGRID_API_KEY=
CURVEGRID_DEPLOYMENT_URL=
CURVEGRID_HSM_ADDRESS=
CURVEGRID_ENS_REGISTRAR_CONTRACT_LABEL=l2registrar
CURVEGRID_ENS_REGISTRAR_CONTRACT_ADDRESS_ALIAS=l2registrar1
CURVEGRID_ENS_REGISTRY_CONTRACT_LABEL=l2registry
CURVEGRID_ENS_REGISTRY_CONTRACT_ADDRESS_ALIAS=l2registry1
CURVEGRID_WEBHOOK_SECRET=

# -- Logging --
LOG_LEVEL=INFO
LOG_FILE=

# -- Database --
POSTGRES_DB=acepay
POSTGRES_USER=acepay
POSTGRES_PASSWORD=
POSTGRES_HOST=localhost:5432
DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST/$POSTGRES_DB

# -- Authentication --
JWT_SECRET=  # Generate a secure random key using: python -c "import secrets; print(secrets.token_hex(32))"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES="43200" # 30 days

# -- Miscellaneous --
IS_DEVELOPMENT=False
PINATA_JWT=
THIRDWEB_WEBHOOK_SECRET=
```

Install the dependencies & launch the FastAPI backend:
```sh
python -m venv venv
source venv/bin/activate
poetry install
python -m uvicorn src.main:app --reload
```

You also need to start the PostgreSQL database with the following script:
```sh
./scripts/dev.sh
```

To launch the API and database in production, simply run `docker compose up -d` (don't forget to update the `POSTGRES_HOST` environment variable to use the service name aka `postgres` by default).

## 🚀 Getting started

To use acepay, you can either follow the steps above to launch your own version of the app or use the [deployed version](#).

> 💡 acepay is also available as a PWA that you can add to your home screen if you are a mobile user

## 📈 Current caveats and future improvements

As a hackathon project built in solo, this is obviously not finished and can be improved in many ways. Some examples and ideas I'd like to explore are listed below

- 📈 UI / UX improvements
  - Detect transactions made without the PaymentContract (especially top-ups) and show them in the app
  - Recurring transactions (could also lead to subscriptions)
  - Transaction history filtering & detailed view
- 🏎️ Multi-chain transactions (by leveraging [1inch Fusion](https://1inch.dev/fusion-plus-api/) or [Circle's CCTP](https://developers.circle.com/stablecoins/cctp-getting-started) for example, both not yet on Polygon unfortunately)
- ⚙️ Enterprise features with dashboards to track revenues, APIs / webhooks, off-ramp solutions...
- 🧠 Various codebase improvements & refactoring, some parts (especially the UI were generated with AI tools and are far from perfect)

