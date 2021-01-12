#exmo-rest

# Install
```bash
npm install exmo-rest
// OR
git clone https://github.com/VadimPride/exmo-rest.git
```


# Init:

```javascript

const exmoREST = require('exmo-rest');

let API;

// Public and Private methods.
API = new exmoREST('K-apiKey', 'S-secretKey');
// OR (only Public api)
API = new exmoREST.Public();
```

#PUBLIC METHODS:
_This API does not require authorization._

```javascript

/**
 * trades - List of the deals on currency pairs
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#5a5a9c0d-cf17-47f6-9d62-6d4404ebd5ac
 * @param pair
 * @returns {Promise}
 */
await API.getTrades('BTC_USD,BTC_EUR');

/**
 * order_book - The book of current orders on the currency pair
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#c60c51a8-e683-4f45-a000-820723d37871
 * @param pair
 * @param limit
 * @returns {Promise}
 */
await API.getOrderBook('BTC_USD,BTC_EUR', 100);

/**
 * ticker - Statistics on prices and volume of trades by currency pairs
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#4c8e6459-3503-4361-b012-c34bb9f7e385
 * @returns {Promise}
 */
await API.getTiker();

/**
 * pair_settings - Currency pairs settings
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#7de7e75c-5833-45a8-b937-c2276d235aaa
 * @returns {Promise}
 */
await API.getPairSettings();

/**
 * currency - Currencies list
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#20263fe7-bbcd-4bae-89f4-4f830a893c38
 * @returns {Promise}
 */
await API.getCurrency();

/**
 * currency/list/extended - Extended list of currencies
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#7cdf0ca8-9ff6-4cf3-aa33-bcec83155c49
 * @returns {Promise}
 */
await API.getCurrencyListExtended();

/**
 * required_amount - Calculating the sum of buying a certain amount of currency for the particular currency pair
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#21af9230-221b-4aea-8243-2fd3da72055b
 * @param pair
 * @param quantity
 * @returns {Promise}
 */
await API.getRequiredAmount('BTC_USD', 11);

/**
 * candles_history - Get candles history
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#65eeb949-74e5-4631-9184-c38387fe53e8
 * @param symbol - (currency pair)
 * @param resolution - (discreteness of candles, possible values: 1, 5, 15, 30, 45, 60, 120, 180, 240, D, W, M)
 * @param from - (beginning of period)
 * @param to - (end of period)
 * @returns {Promise}
 */
await API.getCandlesHistory('BTC_USD', 30, 1609543108181, 1609548108142);

/**
 * payments/providers/crypto/list - Crypto providers list
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2
 * @returns {Promise}
 */
await API.getPaymentsProvidersCryptoList();

```

#PRIVATE METHODS:
_This API requires authorization._

```javascript

/**
 * user_info - Getting information about user's account
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#c8388df7-1f9f-4d41-81c4-5a387d171dc6
 * @returns {Promise}
 */
await API.getUserInfo();

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
await API.orderCreate('BTC_USD', 3, 100, 'buy', 100500);

/**
 * order_cancel - Order cancellation
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#1f710d4b-75bc-4b65-ad68-006f863a3f26
 * @param order_id - order identifier
 * @returns {Promise}
 */
await API.orderCancel(12345);

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
await API.stopMarketOrderCreate('BTC_USD', 1.56789, 10000.56789, 'buy', 100500);

/**
 * stop_market_order_cancel - Stop market order cancellation
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#a4d0aae8-28f7-41ac-94fd-c4030130453d
 * @param parent_order_id - stop market order identifier
 * @returns {Promise}
 */
await API.stopMarketOrderCancel(507056272792275327);

/**
 * user_open_orders - Getting the list of user’s active orders
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#0e135370-daa4-4689-8acd-b6876dee9ba1
 * @returns {Promise}
 */
await API.getUserOpenOrders();

/**
 * user_trades - Getting the list of user’s deals
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#b8d8d9af-4f46-46a1-939b-ad261d79f452
 * @param pair - one or various currency pairs separated by commas
 * @param limit - the number of returned deals (default: 100, maximum: 100)
 * @param offset - last deal offset (default: 0)
 * @returns {Promise}
 */
await API.getUserTrades('BTC_USD,BTC_EUR', 100, 0);

/**
 * user_cancelled_orders - Getting the list of user’s cancelled orders
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#a51be1d0-af5f-44e4-99d7-f7b04c6067d0
 * @param limit
 * @param offset
 * @returns {Promise}
 */
await API.getUserCancelledOrders(100, 0);

/**
 * order_trades - Getting the history of deals with the order
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#cf27781e-28e5-4b39-a52d-3110f5d22459
 * @param order_id - order identifier
 * @returns {Promise}
 */
await API.getOrderTrades(12345);

/**
 * deposit_address - Getting the list of addresses for cryptocurrency deposit
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#c8f9ced9-7ab6-4383-a6a4-bc54469ba60e
 * @returns {Promise}
 */
await API.getDepositAddress();

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
await API.withdrawCrypt(10, 'USDT', '16UM5DoeHkV7Eb7tMfXSu..', 1234, 'ERC20');

/**
 * withdraw_get_txid - Getting the transaction ID in order to keep track of it on blockchain
 * @param task_id - withdrawal task identifier
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#22e31775-14b8-4a51-b023-5b115ea99219
 * @returns {Promise}
 */
await API.getWithdrawTxid(467756);



//
// Excode API (https://documenter.getpostman.com/view/10287440/SzYXWKPi#16e6ce35-e8c8-47d5-9ec8-cd7a78c05105)
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
await API.excodeCreate('BTC', 10, 'test_user');

/**
 * excode_load - EXCODE coupon uploading
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#9cd0b31b-fb83-44b9-ac85-4e3cc67c15f4
 * @param code - code of the EXCODE coupon
 * @returns {Promise}
 */
await API.excodeLoad('EX-CODE_9004_BTC7c3f8adc0b158658....');

/**
 * code_check - EXCODE coupon checking
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#09750ed5-e6e1-472f-95d7-eea6ce913ec8
 * @param code - code of the EXCODE coupon
 * @returns {Promise}
 */
await API.excodeCheck('EX-CODE_9004_BTC7c3f8adc0b158658....');



//
// Wallet API (https://documenter.getpostman.com/view/10287440/SzYXWKPi#1530e970-5b30-4ef5-8781-e569dc6f4313)
//



/**
 * wallet_history - Get history of wallet
 * @link https://documenter.getpostman.com/view/10287440/SzYXWKPi#31e69a33-4849-4e6a-b4b4-6d574238f6a7
 * @param date - timestamp of the day (if empty got current day)
 * @returns {Promise}
 */
await API.getWalletHistory(1609543108181);

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
await API.getWalletOperations(100, 0, 'BTC', 'BTC', 'withdrawal', 524587);

```

