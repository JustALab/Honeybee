import axios from 'axios';
import {host, authUrl} from '../Config/Server';

export default Api = {

    login: (payload, callback) => {
        axios.post(host + authUrl, payload).then(res => {
            callback(res.data.token);
        }).catch(err => {
            callback(null);
        });
    }

};