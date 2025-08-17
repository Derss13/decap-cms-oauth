require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(cookieParser());

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const TOKEN_SECRET = process.env.GITHUB_TOKEN_SECRET;
const BASE_URL = process.env.BASE_URL;

function signToken(token) {
  return crypto.createHmac('sha256', TOKEN_SECRET).update(token).digest('hex');
}

app.get('/api/auth', async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const redirect = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${BASE_URL}/api/auth&scope=repo&state=decap`;
    return res.redirect(redirect);
  }
  try {
    // Step 2: Exchange code for access token
    const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: `${BASE_URL}/api/auth`,
      state
    }, {
      headers: { Accept: 'application/json' }
    });
    const { access_token } = tokenRes.data;
    if (!access_token) return res.status(400).json({ error: 'No access token' });
    // Step 3: Set token in cookie (for DecapCMS)
    res.cookie('token', access_token, { httpOnly: true, sameSite: 'lax' });
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'OAuth error', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('DecapCMS OAuth Proxy is running.');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`OAuth proxy running on port ${port}`);
});
