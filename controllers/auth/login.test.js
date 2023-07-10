const request = require('supertest');
const app = require('../../app');
const login = require('./login');

app.post('/api/auth/users/login', login);

describe("test login controller", () => {
    test("login return status 200", async ()=> {
        await request(app).post('/api/auth/login')
        .send({email: "example@example.com", password: "examplepassword"});
        expect(200);
    });
    test ("login return token", async() => {
        const response = await request(app).post('/api/auth/login')
        .send({email: "example@example.com", password: "examplepassword"});
        expect({token: "exampletoken"});
    });
    test("login return object 'user' whith fields: 'email' and 'subscription', type of String", async() => {
        const response = await request(app).post('/api/auth/login')
        .send({email: "example@example.com", password: "examplepassword"});
        expect({user: {email: "example@example.com", subscription: "starter"}});
        expect(typeof email === "string");
        expect(typeof subscription === "string");
    });
})


