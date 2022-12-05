const request = require('supertest')
const app = require('../../app')
  
test('it should show login screen', async () => {
  await request(app).get('/login').expect(200);
});

test('it should show signup screen', async () => {
    await request(app).get('/signup').expect(200);
});

test('it should show forgot password screen', async () => {
    await request(app).get('/forgotpassword').expect(200);
});
