import express from 'express';
import routes from './app/routes/routes';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
