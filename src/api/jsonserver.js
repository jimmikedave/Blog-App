import axios from 'axios';

//MUST REPLACE BASE URL WITH NEW FORWARDING LINK WHEN RESTARTING
export default axios.create({
    baseURL: 'http://02d5b7105b09.ngrok.io'
});