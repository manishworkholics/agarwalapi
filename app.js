const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const appuserRoutes = require('./routes/appuserRoutes');
const noticeBoardRoutes = require('./routes/noticeboardRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const disclaimerRoutes = require('./routes/disclaimerRoutes');
const informationRoutes = require('./routes/informationRoutes');
const combineRoutes = require('./routes/combinedRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/appuser', appuserRoutes);
app.use('/api/notice', noticeBoardRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/disclaimer', disclaimerRoutes);
app.use('/api/information', informationRoutes);
app.use('/api/combine', combineRoutes);
// app.use('/api/intimation', intimationRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
