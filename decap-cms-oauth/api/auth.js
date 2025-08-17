const axios = require('axios');

module.exports = async (req, res) => {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  const BASE_URL = process.env.BASE_URL;

  const { code, state } = req.query;

  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const redirect = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${BASE_URL}/api/auth&scope=repo&state=decap`;
    res.writeHead(302, { Location: redirect });
    res.end();
    return;
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
    if (!access_token) {
      res.status(400).json({ error: 'No access token' });
      return;
    }
    // Step 3: Set token in cookie (for DecapCMS)
    res.setHeader('Set-Cookie', `token=${access_token}; HttpOnly; Path=/; SameSite=Lax`);
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (err) {
    res.status(500).json({ error: 'OAuth error', details: err.message });
  }
};
