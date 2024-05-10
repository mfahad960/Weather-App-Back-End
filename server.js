const express = require('express');
const axios = require('axios');
var cors=require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = '54782925e015d68f12e1c0e2f35f5ef2';

app.use(express.json());
app.use(cors());
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
