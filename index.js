const app = require('./server');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Trips API running at http://localhost:${PORT}`));
