// deploy code will go here
const HDWalletProvider =require('@truffle/hdwallet-provider');
const Web3 =require('web3');
const {interface,bytecode}=require('./compile');

const provider =new HDWalletProvider(
    'beauty brass afford slush milk autumn robust pole recipe word disease crunch',
    'https://sepolia.infura.io/v3/021c42a485114ee3b84c866e1a11caaa'
);
const web3 = new Web3(provider);

const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from acount',accounts[0]);
    const result=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['Hii there !! ']})
    .send({gas:'1000000',from:accounts[0]});
    console.log('contract deployed in this adress',result.options.address);
    provider.engine.stop();

};
deploy();