// wrap the response in a json that includes the status code and the data


// Path: backend/routes/responseHandler.js

const responseHandler = (data, status, message) => {
  // create new json
  const response = {
    status: status,
    message: message,
    data: data,
  };
  // send the json
  return response;
};

module.exports = responseHandler;   