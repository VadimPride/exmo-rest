/**
 * @author      Vadim Pride (pride.mk.ua@gmail.com)
 * @licence     MIT
 * @version     exmo-rest $Id:$
 */

const API = require('./API');

module.exports = class PublicAPI extends API
{

    /**
     * trades - List of the deals on currency pairs
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#5a5a9c0d-cf17-47f6-9d62-6d4404ebd5ac
     * @param pair
     * @returns {Promise}
     */
    async getTrades(pair){
        return this.sendAPI('/trades', {
            'pair' : String(pair || '')
        });
    }

    /**
     * order_book - The book of current orders on the currency pair
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#c60c51a8-e683-4f45-a000-820723d37871
     * @param pair
     * @param limit
     * @returns {Promise}
     */
    async getOrderBook(pair, limit){
        return this.sendAPI('/order_book', {
            'pair' : String(pair || ''),
            'limit' : limit || 100
        });
    }


    /**
     * ticker - Statistics on prices and volume of trades by currency pairs
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#4c8e6459-3503-4361-b012-c34bb9f7e385
     * @returns {Promise}
     */
    async getTiker(){
        return this.sendAPI('/ticker');
    }


    /**
     * pair_settings - Currency pairs settings
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#7de7e75c-5833-45a8-b937-c2276d235aaa
     * @returns {Promise}
     */
    async getPairSettings(){
        return this.sendAPI('/pair_settings');
    }


    /**
     * currency - Currencies list
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#20263fe7-bbcd-4bae-89f4-4f830a893c38
     * @returns {Promise}
     */
    async getCurrency() {
        return this.sendAPI('/currency');
    }


    /**
     * currency/list/extended - Extended list of currencies
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#7cdf0ca8-9ff6-4cf3-aa33-bcec83155c49
     * @returns {Promise}
     */
    async getCurrencyListExtended() {
        return this.sendAPI('/currency/list/extended', {}, true);
    }


    /**
     * required_amount - Calculating the sum of buying a certain amount of currency for the particular currency pair
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#21af9230-221b-4aea-8243-2fd3da72055b
     * @param pair
     * @param quantity
     * @returns {Promise}
     */
    async getRequiredAmount(pair, quantity){
        return this.sendAPI('/required_amount', {
            'pair' : pair,
            'quantity' : quantity || 1
        }, true);
    }


    /**
     * candles_history - Get candles history
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#65eeb949-74e5-4631-9184-c38387fe53e8
     * @param symbol - (currency pair)
     * @param resolution - (discreteness of candles, possible values: 1, 5, 15, 30, 45, 60, 120, 180, 240, D, W, M)
     * @param from - (beginning of period)
     * @param to - (end of period)
     * @returns {Promise}
     */
    async getCandlesHistory(symbol, resolution, from, to){
        return this.sendAPI('/candles_history', {
            'symbol' : symbol || '',
            'resolution' : resolution || 1,
            'from' : this.convertDate(from || 0, false),
            'to' : this.convertDate(to || 0, false)
        }, true);
    }


    /**
     * payments/providers/crypto/list - Crypto providers list
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2
     * @returns {Promise}
     */
    async getPaymentsProvidersCryptoList(){
        return this.sendAPI('/payments/providers/crypto/list', {}, true);
    }


}
