const sendResponse = async (req, res, code, data = "") => {
  let objResponse = {
    ERROR_CODE: `RE-${code}`,
    RESPONSE_CODE: code,
    RESPONSE_MESSAGE: "",
    RESPONSE_DATA: "",
  };
  try {
    const listMessageAndCode = {
      "00": {
        RESPONSE_MESSAGE: "Transaction Successful",
        httpCode: 200,
      },
      "01": {
        RESPONSE_MESSAGE: "Time Out",
        httpCode: 200,
      },
      "02": {
        RESPONSE_MESSAGE: "Invalid Data",
        httpCode: 422,
      },
      "03": {
        RESPONSE_MESSAGE: "Record Not Found",
        httpCode: 200,
      },
      "04": {
        RESPONSE_MESSAGE: "Transaction Failed",
        httpCode: 200,
      },
      "05": {
        RESPONSE_MESSAGE: "Duplicate Records",
        httpCode: 200,
      },
      99: {
        RESPONSE_MESSAGE: "General Error",
        httpCode: 400,
      },
    };

    res_data = {
      Results: data,
      //   Pagination: {
      //     TotalData: "",
      //     TotalPage: "",
      //     TotalPerpage: "",
      //   },
    };

    objResponse.RESPONSE_DATA = res_data;
    objResponse.RESPONSE_MESSAGE = listMessageAndCode?.[code].RESPONSE_MESSAGE;
    return res.status(listMessageAndCode?.[code].httpCode).json(objResponse);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendResponse;
