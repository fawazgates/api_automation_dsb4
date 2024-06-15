const axios = require('axios');
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');

chai.use(chaiJsonSchema);

const { expect } = chai;

const BASE_URL = 'https://reqres.in/api';

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
    const response = await axios.get(`${BASE_URL}/users/2`);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.jsonSchema(userSchema); // Menggunakan chai-json-schema di sini
  });

  it('Sample POST Request', async () => {
    const payload = {
      name: "morpheus",
      job: "leader"
    };
    const response = await axios.post(`${BASE_URL}/users`, payload);
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('name', 'morpheus');
    expect(response.data).to.have.property('job', 'leader');
  });

  it('Sample DELETE Request', async () => {
    const response = await axios.delete(`${BASE_URL}/users/2`);
    expect(response.status).to.equal(204);
  });

  it('Sample PUT Request', async () => {
    const payload = {
      name: "morpheus",
      job: "zion resident"
    };
    const response = await axios.put(`${BASE_URL}/users/2`, payload);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('name', 'morpheus');
    expect(response.data).to.have.property('job', 'zion resident');
  });
});
