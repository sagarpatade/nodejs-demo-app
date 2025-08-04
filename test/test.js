const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const obj = JSON.parse(data);
      if (obj.message && res.statusCode === 200) {
        console.log('TEST PASS');
        process.exit(0);
      } else {
        console.error('TEST FAIL: unexpected body', data);
        process.exit(1);
      }
    } catch (e) {
      console.error('TEST FAIL: invalid JSON', e);
      process.exit(1);
    }
  });
});

req.on('error', err => {
  console.error('TEST FAIL: request error', err);
  process.exit(1);
});

req.end();
