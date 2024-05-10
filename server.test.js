const axios = require('axios');
const express = require('express');
const request = require('supertest');

const app = express();

const mockWeatherData = {
  name: 'London',
  main: { temp: 20 },
  weather: [{ description: 'Cloudy' }],
};

jest.mock('axios');

describe('Weather API Endpoint', () => {
  it('responds with weather data for a valid city', async () => {
    axios.get.mockResolvedValueOnce({ data: mockWeatherData });
    const cityName = 'London';

    const response = await request(app)
      .get(`/api/weather/${cityName}`)
    });

  it('handles server error for an invalid city', async () => {
    axios.get.mockRejectedValueOnce(new Error('City not found'));
    const cityName = 'InvalidCity';

    const response = await request(app)
      .get(`/api/weather/${cityName}`)
      .expect('Content-Type', /html/)
      .expect(404);

    expect(response.body.error).toBe(undefined);
  });
});
