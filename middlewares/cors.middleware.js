module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'POST,GET,PUT,DELETE,OPTIONS'
  );
  response.setHeader('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    return response.send(200);
  }

  next();
};
