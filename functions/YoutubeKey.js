const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const response = process.env.YOUTUBE_API_KEY;
    return {
      statusCode: 200,
      body: JSON.stringify({ title: response }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
