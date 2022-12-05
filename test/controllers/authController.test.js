const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

beforeEach( () => {
   mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {});
});

afterAll(()=>{mongoose.disconnect()})

  
test('should create a new user', async () =>{
    
    await request(app).post('/api/v1/users/signup')
        .send({
            name: 'Erick Souza',
            email:'erickbarroso09@gmail.com',
            password: '12345678',
            passwordConfirm:'12345678'
        })
        .expect(201)
},10000)

test('login should login with valid user', async () =>{
    await request(app).post('/api/v1/users/login')
        .send({
            email:'erickbarroso09@gmail.com',
            password: '12345678'
        })
        .expect(200)
},10000)


test('it should logout a valid logged user', async () =>{
    await request(app).get('/api/v1/users/logout')
        .send({ })
        .expect(200)
})
