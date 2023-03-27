const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const response = process.env.API_KEY;
    const urlResponse = process.env.API_URL;
    return {
      statusCode: 200,
      body: JSON.stringify({
        key: response,
        url: urlResponse,
      }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
