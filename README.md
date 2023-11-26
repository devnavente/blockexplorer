# Ethereum Block Explorer

This explorer gives us the ability to view different information about the blockchain including data about:
  * blocks in the blockchain
  * transactions in a block
  * accounts
  
[Etherscan](https://etherscan.io/) is a good example of an Ethereum blockexplorer. 

This particular project is a simpler version built using React and [AlchemySDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp) (v2). 

You can find lots of good docs on the AlchemySDK here:
  * [API Quickstart](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp)
  * [API Overview](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp)

Alright, without further ado, let's get started!

## Getting Started

Clone this project to pull down some basic starter code.

After that cd into the base directory of the project and run `npm install` to download all the project dependencies.

## 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key
for your project as [described here](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp).

## 2. Add your API key to as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Do not remove the `REACT_APP_` prefix. React uses that to import env variables.

**⚠️ Note**

> Your Alchemy API Mainnet Key is a sensitive piece of data. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.
>
> But hey, we're just learning this stuff right now, not conquering anything\
> yet! :-) It won't be the end of the world to put the Alchemy API key in our\
> front-end code for this project.

## 3. Start the webserver

`npm start`

Running the command above will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The webpage will automatically reload when you make code changes.

## 4. Have fun!

Feel free to play around, and make some improvements.


## Some ideas to think about

- Make an accounts page where a user can look up their balance or someone else's balance
- Given a contract address and token id, can you get the NFT's metadata?
- What is the floor price of an NFT right now?
- Did a pending transaction get mined?
- What transfers did an address receive this year?
