## Astar Bounty - On-chain Identity Scoring System
demo: http://ec2-54-193-115-169.us-west-1.compute.amazonaws.com/

## Introduction
This is an on-chain credit scoring dashboard build for Astar Bounty. It allows users to connect wallet, view their scores, and view/filter their rank on the leaderboard.
The following 3 scoring creteria are supported:
- Wallet OG Score: a nomalized score between 1 and 1000 based on the amount of all ERC20 tokens user transferred / interacted with in the wallet
- Txn Activity Score: a nomalized score between 1 and 1000 based on the total number and quality of transactions user made in the wallet
- NFT collecting score: a nomalized score between 1 and 1000 based on the total value (sum of floor prices) of all NFTs in the user's wallet

## External API Endpoints used:
- [Covalent](https://www.covalenthq.com/) for user's ERC20 assets & all on-chain history
- [Neeva](https://docs.n.xyz/reference/introduction) for user's NFT collections & history

## Tech Stack
- Frontend in React.js & Typescript & TailwindCSS
- Backend in Node.js & Express
- Database in MongoDB
- DevOps in Docker
- Server AWS EC2 (Ubuntu)