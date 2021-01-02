/**
 * @author      Vadim Pride (pride.mk.ua@gmail.com)
 * @licence     MIT
 * @version     exmo-rest $Id:$
 */

const PublicAPI = require('./Public');

const PrivateAPI = class PrivateAPI extends PublicAPI
{

    constructor(apiKey, secretKey) {
        super();
        this.__apiKey = String(apiKey || '');
        this.__secretKey = String(secretKey || '');
        if(!this.getApiKey().match(/^K-+/g)){
            throw new Error('Invalid API key! Example: K-****************')
        }
        if(!this.getSecretKey().match(/^S-+/g)){
            throw new Error('Invalid Secret key! Example: S-****************')
        }
    }




//
// Authenticated API (https://documenter.getpostman.com/view/10287440/SzYXWKPi#9df85ac2-5a00-4715-a54e-e891d6ab3468)
// To access this API it is necessary to use the POST method.
//



    /**
     * user_info - Getting information about user's account
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#c8388df7-1f9f-4d41-81c4-5a387d171dc6
     * @returns {Promise}
     */
    async getUserInfo(){
        return this.sendAPI('/user_info');
    }


    /**
     * order_create - Order creation
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#80daa469-ec59-4d0a-b229-6a311d8dd1cd
     * @param pair - currency pair
     * @param quantity - quantity for the order
     * @param price - price for the order
     * @param type - type of order, can have the following values: PrivateAPI.ORDER_TYPE
     * @param client_id - client id for the order (optional parameter, must be a positive integer)
     * @returns {Promise}
     */
    async orderCreate(pair, quantity, price, type, client_id){
        let data = {
            "pair" : pair || '',
            "quantity" : quantity || '',
            "price" : price || '',
            "type" : type || ''
        };
        if(client_id){
            data['client_id'] = client_id;
        }
        return this.sendAPI('/order_create', data);
    }


    /**
     * order_cancel - Order cancellation
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#1f710d4b-75bc-4b65-ad68-006f863a3f26
     * @param order_id - order identifier
     * @returns {Promise}
     */
    async orderCancel(order_id){
        return this.sendAPI('/order_cancel', {
            'order_id' : order_id
        });
    }


    /**
     * stop_market_order_create - Stop market order creation
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#de6f4321-eeac-468c-87f7-c4ad7062e265
     * @param pair - currency pair
     * @param quantity - quantity for the order
     * @param trigger_price - price for the order
     * @param type - type of order, can have the following values: [PrivateAPI.ORDER_TYPE.BUY, PrivateAPI.ORDER_TYPE.SELL]
     * @param client_id - client id for the order (optional parameter, must be a positive integer)
     * @returns {Promise<void>}
     */
    async stopMarketOrderCreate(pair, quantity, trigger_price, type, client_id){
        let data = {
            "pair" : pair || '',
            "quantity" : quantity || '',
            "trigger_price" : trigger_price || '',
            "type" : type || ''
        };
        if(client_id){
            data['client_id'] = client_id;
        }
        return this.sendAPI('/stop_market_order_create', data);
    }


    /**
     * stop_market_order_cancel - Stop market order cancellation
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#a4d0aae8-28f7-41ac-94fd-c4030130453d
     * @param parent_order_id - stop market order identifier
     * @returns {Promise}
     */
    async stopMarketOrderCancel(parent_order_id){
        return this.sendAPI('/stop_market_order_cancel', {
            'parent_order_id' : parent_order_id || ''
        });
    }


    /**
     * user_open_orders - Getting the list of user’s active orders
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#0e135370-daa4-4689-8acd-b6876dee9ba1
     * @returns {Promise}
     */
    async getUserOpenOrders(){
        return this.sendAPI('/user_open_orders');
    }


    /**
     * user_trades - Getting the list of user’s deals
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#b8d8d9af-4f46-46a1-939b-ad261d79f452
     * @param pair - one or various currency pairs separated by commas
     * @param limit - the number of returned deals (default: 100, maximum: 100)
     * @param offset - last deal offset (default: 0)
     * @returns {Promise}
     */
    async getUserTrades(pair, limit, offset){
        return this.sendAPI('/user_trades', {
            'pair' : String(pair || ''),
            'limit' : limit || '',
            'offset' : offset || 0
        });
    }

    /**
     * user_cancelled_orders - Getting the list of user’s cancelled orders
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#a51be1d0-af5f-44e4-99d7-f7b04c6067d0
     * @param limit
     * @param offset
     * @returns {Promise}
     */
    async getUserCancelledOrders(limit, offset){
        return this.sendAPI('/user_cancelled_orders', {
            'limit' : limit || '',
            'offset' : offset || 0
        });
    }


    /**
     * order_trades - Getting the history of deals with the order
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#cf27781e-28e5-4b39-a52d-3110f5d22459
     * @param order_id - order identifier
     * @returns {Promise}
     */
    async getOrderTrades(order_id){
        return this.sendAPI('/order_trades', {
            'order_id' : order_id || '',
        });
    }

    /**
     * deposit_address - Getting the list of addresses for cryptocurrency deposit
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#c8f9ced9-7ab6-4383-a6a4-bc54469ba60e
     * @returns {Promise}
     */
    async getDepositAddress(){
        return this.sendAPI('/order_trades', {});
    }


    /**
     * withdraw_crypt - Creation of the task for cryptocurrency withdrawal. ATTENTION!!!
     * This API function is available only after request to the Technical Support.
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#3ab9c34d-ad58-4f87-9c57-2e2ea88a8325
     * @param amount - Amount of currency to be withdrawn (required)
     * @param currency - Name of the currency to be withdrawn (required)
     * @param address - Withdrawal address (required)
     * @param invoice - Additional identifier (optional)
     * @param transport - The network in which the withdrawal will be made.
     * If you do not specify, then the default network will be selected.
     * Explanation: some currencies exist in several blockchains, and you can specify in which blockchain you want to
     * withdraw tokens. (optional)
     * @returns {Promise}
     */
    async withdrawCrypt(amount, currency, address, invoice, transport){
        let data = {
            'amount' : amount || '',
            'currency' : currency || '',
            'address' : address || ''
        }
        if(invoice){
            data['invoice'] = invoice;
        }
        if(transport){
            data['transport'] = transport;
        }
        return this.sendAPI('/withdraw_crypt', data);
    }


    /**
     * withdraw_get_txid - Getting the transaction ID in order to keep track of it on blockchain
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#22e31775-14b8-4a51-b023-5b115ea99219
     * @param task_id - withdrawal task identifier
     * @returns {Promise}
     */
    async getWithdrawTxid(task_id){
        return this.sendAPI('/withdraw_get_txid', {
            'task_id' : task_id || ''
        });
    }




//
// Excode API (https://documenter.getpostman.com/view/10287440/SzYXWKPi#16e6ce35-e8c8-47d5-9ec8-cd7a78c05105)
//
// Using EXCODE API you can create and upload EXCODE coupons.
// The access is given only after a request to the Technical Support.
//




    /**
     * excode_create - EXCODE coupon creation
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#6d7f3363-601b-4525-a546-a3729cefc5a6
     * @param currency - name of coupon currency
     * @param amount - amount in the coupon
     * @param login  - login of user, who can upload EXCODE coupon (not necessary param, if it present -
     * coupon can upload only this user or their creator)
     * @returns {Promise}
     */
    async excodeCreate(currency, amount, login){
        let data = {
            'currency' : currency || '',
            'amount' : amount || ''
        }
        if(login){
            data['login'] = login;
        }
        return this.sendAPI('/excode_create', data);
    }


    /**
     * excode_load - EXCODE coupon uploading
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#9cd0b31b-fb83-44b9-ac85-4e3cc67c15f4
     * @param code - code of the EXCODE coupon
     * @returns {Promise}
     */
    async excodeLoad(code){
        return this.sendAPI('/excode_load', {
            'code' : code || ''
        });
    }


    /**
     * code_check - EXCODE coupon checking
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#09750ed5-e6e1-472f-95d7-eea6ce913ec8
     * @param code - code of the EXCODE coupon
     * @returns {Promise}
     */
    async excodeCheck(code){
        return this.sendAPI('/code_check', {
            'code' : code || ''
        });
    }




//
// Wallet API (https://documenter.getpostman.com/view/10287440/SzYXWKPi#1530e970-5b30-4ef5-8781-e569dc6f4313)
// Wallet API call the same as Authenticated API.
//




    /**
     * wallet_history - Get history of wallet
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#31e69a33-4849-4e6a-b4b4-6d574238f6a7
     * @param date - timestamp of the day (if empty got current day)
     * @returns {Promise}
     */
    async getWalletHistory(date){
        return this.sendAPI('/wallet_history', {
            'date' : date ? this.convertDate(date, false) : 0
        });
    }


    /**
     * wallet_operations - Get operations of wallet
     * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#97f1becd-7aad-4e0e-babe-7bbe09e33706
     * @param limit - the number of returned transactions (default: 100, maximum: 100)
     * @param offset - last transaction offset (default: 0)
     * @param currency - one currency name (optional parameter)
     * @param provider - one provider name (optional parameter)
     * @param type - type of transaction: deposit or withdraw (optional parameter)
     * @param order_id - order identifier (optional parameter)
     * @returns {Promise}
     */
    async getWalletOperations(limit, offset, currency, provider, type, order_id){
        let data = {
            'limit' : limit || '',
            'offset' : offset || 0
        };
        if(currency){
            data['currency'] = currency;
        }
        if(provider){
            data['provider'] = provider;
        }
        if(type){
            data['type'] = type;
        }
        if(order_id){
            data['order_id'] = order_id;
        }
        return this.sendAPI('/wallet_operations', data);
    }

}

PrivateAPI.ORDER_TYPE                   = {};
PrivateAPI.ORDER_TYPE.BUY               = 'buy';               // buy order
PrivateAPI.ORDER_TYPE.SELL              = 'sell';              // sell order
PrivateAPI.ORDER_TYPE.MARKET_BUY        = 'market_buy';        // market buy-order
PrivateAPI.ORDER_TYPE.MARKET_SELL       = 'market_sell';       // market sell-order
PrivateAPI.ORDER_TYPE.MARKET_BUY_TOTAL  = 'market_buy_total';  // market buy-order for a certain amount
PrivateAPI.ORDER_TYPE.MARKET_SELL_TOTAL = 'market_sell_total'; // market sell-order for a certain amount


module.exports = PrivateAPI;