import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x4B828aDc943f0B6B8f0c2Dd002f5b46ad77240fe'
);

export default instance;
