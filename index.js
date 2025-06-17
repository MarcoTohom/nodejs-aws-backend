require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! API is running. Navigate to /api-docs for documentation.');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});