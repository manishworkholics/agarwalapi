const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');
const schoolRoutes = require('./routes/school.routes');
const appuserRoutes = require('./routes/appuser.routes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/appuser', appuserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
