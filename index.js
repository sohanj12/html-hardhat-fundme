import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const ConnectBtn = document.getElementById("ConnectBtn")
const FundBtn = document.getElementById("FundBtn")
const WithdrawBtn = document.getElementById("WithdrawBtn")
const RefreshBalanceBtn = document.getElementById("RefreshBalanceBtn")
ConnectBtn.onclick = connect
FundBtn.onclick = fund
WithdrawBtn.onclick = withdraw
RefreshBalanceBtn.onclick = refreshBalance

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    document.getElementById("ConnectBtn").innerHTML = "Connected"
    console.log("connected metamask")
  } else {
    document.getElementById("ConnectBtn").innerHTML = "Please connect metamask"
    console.log("did not connect metamask")
  }
}

async function fund() {
  const ethAmount = "10"
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const txResponse = await contract.fund({
    value: ethers.utils.parseEther(ethAmount),
  })
  //await listenForTransactionMine(txResponse, provider)
  //const balance = await provider.getBalance(contractAddress)

  const balance = await contract.getContractBalance()
  console.log(balance)
  document.getElementById("FundMeBalance").innerHTML = ethers.utils.formatEther(
    balance.toString()
  )
}

async function withdraw() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const txResponse = await contract.withdraw()

  const balance = await contract.getContractBalance()
  console.log(balance)
  document.getElementById("FundMeBalance").innerHTML = ethers.utils.formatEther(
    balance.toString()
  )
}

async function refreshBalance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const balance = await contract.getContractBalance()
  console.log(balance)
  document.getElementById("FundMeBalance").innerHTML = ethers.utils.formatEther(
    balance.toString()
  )
}
