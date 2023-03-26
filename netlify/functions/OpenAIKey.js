const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const response = await axios.get(`${process.env.API_KEY}`);
    const urlResponse = await axios.get(`${process.env.API_URL}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        key: response.data.title,
        url: urlResponse.data.title,
      }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
