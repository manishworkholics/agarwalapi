const express = require('express');
const dotenv = require('dotenv');
const parentRoutes = require('./routes/parentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const appuserRoutes = require('./routes/appuserRoutes');
const noticeBoardRoutes = require('./routes/noticeboardRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const appScrollerMsgRoutes = require('./routes/appScrollerMsgRoutes');
 const welcomeMsgRoutes = require('./routes/appTopWelcomeMsgRoutes');
 const combineRoutes = require('./routes/combinedRoutes');
 const msgRoutes = require('./routes/msgRoute');
 const scholarRoutes = require('./routes/scholarRoute');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/parents', parentRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/scholar', scholarRoutes);
// app.use('/api/appuser', appuserRoutes);
app.use('/api/notice', noticeBoardRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/appScrollerMsg', appScrollerMsgRoutes);
 app.use('/api/welcomemsg', welcomeMsgRoutes);
app.use('/api/combine', combineRoutes);
app.use('/api/msg', msgRoutes);
// app.use('/api/intimation', intimationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
