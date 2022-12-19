import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(3333, () => console.log('Server running! http://localhost:3333'));
