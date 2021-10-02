const defaultErrorMeg =
  'Une erreur est survenue, veuillez réessayer ultérieurement';
const networkErrorMsg = 'Veuillez vérifier votre connexion internet';

export function responseHasMsg(data) {
  const { responseContext } = data;
  if (!responseContext) return false;

  const { returnMessage } = responseContext;
  if (!returnMessage) return false;

  const errorMessage = returnMessage !== '';
  if (!errorMessage) return false;

  return true;
}

export function errorHandler(errorType, error) {
  if (error.timeout) {
    return {
      type: errorType,
      payload: { errorMessage: defaultErrorMeg, errorCode: null },
    };
  }
  if (error.response === undefined) {
    return {
      type: errorType,
      payload: { errorMessage: networkErrorMsg, errorCode: null },
    };
  }

  const isResponseHasMsg = responseHasMsg(error.response.data);
  const errorMessage = isResponseHasMsg
    ? error.response.data.responseContext.returnMessage
    : null;
  const errorCode = isResponseHasMsg
    ? error.response.data.responseContext.returnCode
    : null;

  return {
    type: errorType,
    payload: { errorMessage: errorMessage || defaultErrorMeg, errorCode },
  };
}
