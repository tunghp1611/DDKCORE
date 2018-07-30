const ReservedErrorCodes = require('./../errors');
const { createServerRPCMethod, validator } = require('./../util');
const { addTransactions } = require('../../../schema/transactions');


const METHOD_NAME = 'sendrawtransaction';

/**
 *
 * @param {WebSocketServer} wss
 * @param {object} params
 * @param {object} scope - The results from current execution,
 * @constructor
 */
function SendRawTransaction (wss, params, scope) {

  return new Promise(function (resolve) {

    let error;

    if (validator(params, addTransactions)) {
      scope.modules.transactions.shared.addTransactions({body: params}, (errorMessage, result) => {

        resolve(errorMessage
          ? {error: wss.createError(ReservedErrorCodes.ApplicationError, errorMessage)}
          : result);
      });
    }
    else {
      error = wss.createError(ReservedErrorCodes.ServerErrorInvalidMethodParameters, 'Failed operation');
      return {error}
    }

  });

}

module.exports = createServerRPCMethod(METHOD_NAME, SendRawTransaction);
