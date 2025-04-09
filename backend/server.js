import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});