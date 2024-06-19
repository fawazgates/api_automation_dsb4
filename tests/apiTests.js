const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const supertest = require('supertest');

chai.use(chaiJsonSchema);

const { expect } = chai;

const BASE_URL = 'https://reqres.in/api';
const request = supertest(BASE_URL);

// Schema Definitions
const userSchema = {
  type: 'object',
  required: ['data', 'support'],
  properties: {
    data: {
      type: 'object',
      required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        avatar: { type: 'string' },
      },
    },
    support: {
      type: 'object',
      required: ['url', 'text'],
      properties: {
        url: { type: 'string' },
        text: { type: 'string' },
      },
    },
  },
};

describe('Reqres API Automation Tests', () => {
  it('Sample GET Request', async () => {
    const response = await request.get('/users/2');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.jsonSchema(userSchema); // Using chai-json-schema here
  });

  it('Sample POST Request', async () => {
    const payload = {
      name: "morpheus",
      job: "leader"
    };
    const response = await request.post('/users').send(payload);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('name', 'morpheus');
    expect(response.body).to.have.property('job', 'leader');
  });

  it('Sample DELETE Request', async () => {
    const response = await request.delete('/users/2');
    expect(response.status).to.equal(204);
  });

  it('Sample PUT Request', async () => {
    const payload = {
      name: "morpheus",
      job: "zion resident"
    };
    const response = await request.put('/users/2').send(payload);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('name', 'morpheus');
    expect(response.body).to.have.property('job', 'zion resident');
  });
});
