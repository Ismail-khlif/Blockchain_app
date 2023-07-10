// contract test code will go here
const assert =require ('assert');
const ganache = require('ganache-cli');
const Web3 =require('web3');
const web3 =new Web3(ganache.provider());
const {interface,bytecode}=require('../compile');





let accounts;
let Inbox;
beforeEach(async()=>{
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    Inbox=await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode , arguments: ['Hi there!'] })
        .send({ from: accounts[0] , gas: '1000000'});
    });

    //Use one of those accounts to deploy the contract


describe('Inbox',()=>{
    it('deploys a contract',()=>{
        //console.log(Inbox);
        assert.ok(Inbox.options.address);
    });
    it('has a default message',async()=>{
        const message = await Inbox.methods.message().call();
        assert.equal(message,'Hi there!');
    });
    it('can change the  message',async()=>{
        await Inbox.methods.setMessage('bye').send({from:accounts[0]});
        const message = await Inbox.methods.message().call();
        assert.equal(message,'bye');
    });
});



/*
let accounts;
beforeEach(async()=>{
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    });

    //Use one of those accounts to deploy the contract


describe('Inbox',()=>{
    it('deploys a contract',()=>{
        console.log(accounts);
    });
});
*/
/////////////--------------------------------------------------------------------------
/*
beforeEach(()=>{
    //Get a list of all accounts
    web3.eth.getAccounts()
    .then(fetchedAccounts =>{
        console.log(fetchedAccounts);
    });

    //Use one of those accounts to deploy the contract
});

describe('Inbox',()=>{
    it('deploys a contract',()=>{});
});
*/
//-------------------------------------------------------------------
/*
class Car{
    park(){
        return 'stopped';
    }
    drive(){
        return 'vroom';
    }
}
let car;
beforeEach(()=>{
    car =new Car();
});
describe('Car description',()=>{
    it('can park',()=>{
        const car = new Car();
        assert.equal(car.park(),'stopped');
    });
    it('can drive',()=>{
        const car = new Car();
        assert.equal(car.drive(),'vroom');
    });
});

*/