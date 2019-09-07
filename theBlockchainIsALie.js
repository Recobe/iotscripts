const Web3 = require('web3');
const config = require('./ethereum/build/contracts/StepmotorContract.json');
const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

const buyer = {'0426661AF54881': '0x1dB56Cd6fF36D9f0a2F6c97Ac305583D6b3c7221'};

let web3;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

client.on('connect', function () {
  client.subscribe('/nfc/cardnumber', function (err) {
    if (err) {
        console.log(err);
    }
  })
})

client.on('message', async function (topic, message) {
  // message is Buffer
  let mc = new web3.eth.Contract(config.abi,'0x2D374Bf775DC921FE44bFe9C4c44E8312F4E9d2A');
  try{
        console.log('Owner: ' + await web3.eth.getBalance('0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a'));
  	        console.log('Buyer: ' + await web3.eth.getBalance(buyer[message]));
	console.log(`Place bid from ${buyer[message]}`);
	await mc.methods.placeBid().send({from: buyer[message], value: web3.utils.toWei('1', 'ether')});
  	console.log('accept');
	await mc.methods.accept().send({from: '0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a'});
  	client.publish('/budget', 'test', console.error);
	console.log('Commission Product');
  	await mc.methods.commissionedProduct('id:100steps').send({from: buyer[message]});
  	console.log('Finalize');
	await mc.methods.finalize().send({from: '0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a'});
                console.log('Owner: ' + await web3.eth.getBalance('0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a'));
                console.log('Buyer: ' + await web3.eth.getBalance(buyer[message]));
  } catch(err) {
	console.log(`error: ${err}`);
  }
});

async function getAccounts(){
	let accounts = await web3.eth.getAccounts();
	console.log(accounts);
}

async function createContract(){
	mc = new web3.eth.Contract(config.abi,'0xaCC9b7162b31dd6bD20294769cf71BaE6aB4aB9d');
	console.log(mc.options);
	await mc.methods.placeBid(web3.utils.toWei('1', 'ether')).send({from: '0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a'});
	let lastBid = await mc.methods.getBid().call({from: '0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a'});
	console.log(lastBid);
}

function main(){
	getAccounts();
	createContract();
}

//main();
