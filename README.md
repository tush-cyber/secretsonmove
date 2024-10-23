# Secrets on Move

Secrets on Move is a decentralized application (dApp) where users can anonymously leave secrets on the blockchain for a small fee of 0.01 MOVE. All secrets are stored on-chain, making them public but without linking them to any identifiable information. Additionally, users can view recent secrets left by others.
Test it: https://secretsonmove.vercel.app/


## Features

- **Connect Wallet**: Users must connect their Web3 wallet to interact with the dApp.
- **Leave a Secret**: For a fee of 0.01 MOVE, users can submit their secrets to the blockchain.
- **View Secrets**: Recent secrets are displayed anonymously on the platform.
- **On-chain Interaction**: All interactions with the platform (such as submitting secrets) are directly stored on-chain, ensuring security and anonymity.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16 or above)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (or npm)
- A crypto wallet like [MetaMask](https://metamask.io/) to connect and interact with the platform.

### Installing

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/secrets-on-move.git
    cd secrets-on-move
    ```

2. **Install the dependencies**:
    ```bash
    yarn install
    ```
    or if you prefer npm:
    ```bash
    npm install
    ```

### Running the dApp Locally

To start the development server, run:

```bash
yarn dev
