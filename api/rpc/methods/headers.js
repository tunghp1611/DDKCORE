const ReservedErrorCodes = require('./../errors');
const {
  createServerApiMethod,
  prepareServerError
} = require('./../util');



const METHOD_NAME = 'headers';


function MethodHeaders (wss, params) {

  let response = {};
  let errorCode = false;
  let errorMessage = 'Error Message';

  if (params.trx) {
    response.title = 'Title Headers';
    response.data = 'Data resend';
  } else {
    errorCode = ReservedErrorCodes.ServerErrorInvalidMethodParameters;
    errorMessage = ReservedErrorCodes[errorCode];
  }

  return errorCode
    ? prepareServerError(errorCode, errorMessage, response)
    : response;
}

module.exports = createServerApiMethod(METHOD_NAME, MethodHeaders);
