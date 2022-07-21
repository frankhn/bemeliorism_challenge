import 'dotenv/config';
import app from './app';

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  console.log(`Docs available on http://localhost:${PORT}/api/version-name-["v1"]/docs`);
});
