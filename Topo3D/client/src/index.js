import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import TopoToken from "./contracts/TopoToken.json";
//import App from './App';
import "./styles.css";

let web3 = "";
let endpoint = "https://eth-global-9.skalenodes.com:10648";
let chainId = "0xeef5f4e8bc294";

// https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
let web3_wss = new Web3("wss://eth-global-11.skalenodes.com:10007");
/**
 * To connect to a websocket endpoint instead
 * please see:
 * https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
 */
new Web3("wss://eth-global-11.skalenodes.com:10007");
/**
 * Simple example of how to use the new Web3
 * provider connected to SKALE to retrieve the
 * Chain ID.
 */
 web3_wss.eth.getChainId().then((response) => {
  console.log(response);
  document.getElementById("wss").innerHTML = response;
});


/**
 * MetaMask Documentation: https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
 *
 * For more information on how to
 * form the encrypted message please see:
 * https://eips.ethereum.org/EIPS/eip-3085
 */
let switchToSKALE = {
  chainId: chainId,
  chainName: "SKALE Network Testnet",
  rpcUrls: [endpoint],
  nativeCurrency: {
    name: "SKALE ETH",
    symbol: "skETH",
    decimals: 18
  },
  blockExplorerUrls: [
    "https://expedition.dev/?network=SKALE&rpcUrl=" + endpoint
  ]
};

async function getWeb3() {
  web3 = window.web3;

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      console.log("MetaMask - Web 3 Initialized!");

      //Get user wallet accounts
      window.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.error(error);
        }
        console.log(accounts);

        //request change to SKALE Network
        window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [switchToSKALE, accounts[0]]
          })
          .catch((error) => console.log(error.message));
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    console.log("MetaMask - Web 3 Initialized!");
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

//

function App() {
  return (
    <div className="App">
      <div className="NaveBar-Title">
      <h1>Topo Token T3D</h1>
      </div>
      <br />
      <div className="MetaMask"></div>
      <button onClick={getWeb3}>Switch MetaMask to SKALE</button>
     <div>
     Skale Chain ID: <span id="wss" />
     </div>
   </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);