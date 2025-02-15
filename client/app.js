const contractAddress = "0x63F1FaC7DEcc9918a841aBD97633f6210F392D67"; 
const contractABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getName",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];



let web3;
let contract;
let accounts;

async function connectWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
}

async function setName() {
    const name = document.getElementById("nameInput").value;
    if (!name) return alert("Enter a name!");
    
    await contract.methods.setName(name).send({ from: accounts[0] });
    alert("Name updated!");
    getName();
}

async function getName() {
    const name = await contract.methods.getName().call();
    document.getElementById("displayName").innerText = name;
}

window.onload = connectWeb3;
