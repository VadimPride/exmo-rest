/**
 * @author      Vadim Pride (pride.mk.ua@gmail.com)
 * @licence     MIT
 * @version     exmo-rest $Id:$
 */

const API_URI  = 'https://api.exmo.com/v1.1';

const request     = require('request');
const cryptoJS    = require("crypto-js");
const querystring = require('querystring');


module.exports = class API {


    constructor() {
        this.__apiKey = '';
        this.__secretKey = '';
    }


    /**
     *
     * @param date
     * @param isOutput
     * @returns {number}
     */
    convertDate(date, isOutput){
        return Math.floor(isOutput ? date * 1000 : date / 1000);
    }


    /**
     *
     * @param method
     * @param data
     * @param isGet
     * @returns {Promise}
     */
    async sendAPI(method, data, isGet){
        const $this = this;
        return new Promise( (resolve, reject) => {
            if(typeof method !== 'string' || !method.length){
                throw new Error('Invalid method');
            }
            data = typeof data === 'object' ? data : {};
            data['nonce'] = Math.floor(new Date().getTime());
            let params =  (() => {
                if(!isGet || Object.keys(data).length === 1) return '';
                let q = method.indexOf('?') === -1 ? '?' : '&';
                for(let i in data){
                    q += String(i) + '=' + String(data[i]) + '&';
                }
                return q;
            })();
            request({
                'url': API_URI + method + params,
                'method': isGet ? 'GET' : 'POST',
                'form': isGet ? undefined : data,
                'headers': {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Key': $this.getApiKey(),
                    'Sign': $this.getSign(data)
                }
            },  (error, response, body) => {
                if(error){
                    return reject(new Error(error));
                }
                let data = {};
                try{
                    data = JSON.parse(body);
                }catch (e){}
                if(response.statusCode !== 200){
                    return reject(new Error('Invalid http statusCode'));
                }
                let err = data['error'] || data['errmsg'] || data['s'];
                if(err){
                    if(typeof err !== 'string'){
                        try{
                            err = JSON.stringify(err);
                        }catch (e){
                            console.error('Error parse error', err);
                        }
                    }
                    return reject(new Error(err));
                }
                resolve(data);
            });
        });
    }

    /**
     *
     * @returns {string}
     */
    getSecretKey(){
        return typeof this.__secretKey === 'string' ? this.__secretKey : '';
    }

    /**
     *
     * @returns {string}
     */
    getApiKey(){
        return typeof this.__apiKey === 'string' ? this.__apiKey : '';
    }

    /**
     *
     * @param data
     * @returns {*|string}
     */
    getSign(data){
        return this.getSecretKey().length && this.getApiKey().length ? cryptoJS.HmacSHA512(querystring.stringify(data || {}), this.getSecretKey()).toString(cryptoJS.enc.hex) : '';
    }
}
