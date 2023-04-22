export const processErrorMessage = (error: any) => {
  console.log(error);
  if (error === null) {
    return "Minting went wrong. Please refresh and try again.";
  }

  let errMsg = "";

  if (error.reason === "transaction failed") {
    errMsg = "The transaction has failed";
  } else if (error.code === 4001 || error.code === "ACTION_REJECTED") {
    // User rejected the transaction
    errMsg = "Please approve the transaction.";
  } else if (error.error && error.error.code === -32603) {
    // Internal Error Code from Smart Contract
    // Error use Smart Contract error messages
    let filteredMessage = "Minting went wrong. Please refresh and try again.";
    if (error.message.length > 20) {
      filteredMessage = error.error.message.substring(40);
    }
    errMsg = filteredMessage;
  } else {
    errMsg = "Minting went wrong. Please refresh and try again.";
  }

  return errMsg;
};
