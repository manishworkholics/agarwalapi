const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const validateApiKey = require("./middlewares/api-key-middleware"); // Adjust the path accordingly
const multer =require("multer");
const parentRoutes = require("./routes/parentRoutes");
const teacherRoutes = require("./routes/teacherRoute");
const schoolRoutes = require("./routes/schoolRoutes");
const appuserRoutes = require("./routes/appuserRoutes");
const noticeBoardRoutes = require("./routes/noticeboardRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const pageRoutes = require("./routes/pageRoute");
const appScrollerMsgRoutes = require("./routes/appScrollerMsgRoutes");
const welcomeMsgRoutes = require("./routes/appTopWelcomeMsgRoutes");
const combineRoutes = require("./routes/combinedRoutes");
const msgRoutes = require("./routes/msgRoute");
const scholarRoutes = require("./routes/scholarRoute");
const adminRoutes = require("./routes/adminRoute");
const feesRoutes = require("./routes/feesRoute");
const chatMsgRoutes = require("./routes/chatmessageRoute");
const writeFileSync = require("fs");


dotenv.config();
const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//************************************************
// ************** CROSS ERROR  **************
//************************************************

app.use(cors());
app.use(cors({ origin: "*" }));
// app.use(cors({ origin: "http://206.189.130.102/" }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
//************************************************
// Image path access to directory **** IMP TO ACCESS DATA
//************************************************

app.use("/Uploads/", express.static("Uploads/"));
//Configuration for Multer image and pdf
const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/image/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Date.now() + ".png");
  },
});
app.use("/Uploads/", express.static("Uploads/"));
//Configuration for Multer image and pdf
const pdfstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/pdf/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Date.now() + ".pdf");
  },
});
// const videostorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Uploads/video/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + Date.now() + ".mp4");
//   },
// });

const imageStorage = multer({ storage: imagestorage }); //For Image
const pdfStorage = multer({ storage: pdfstorage }); //For Pdf
// const videoStorage = multer({ storage: videostorage }); //For Video
// //image Upload ===========
// old working 100 %
app.use(
  "/api/v1/admin/imageUpload_Use",
  imageStorage.single("file"),
  adminRoutes
);
app.use(
  "/api/v1/admin/pdfUpload_Use",
  pdfStorage.single("file"),
  adminRoutes
);

app.use("/api/admin", adminRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/chat", chatMsgRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/scholar", scholarRoutes);
// app.use('/api/appuser', appuserRoutes);
app.use("/api/notice", noticeBoardRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/appScrollerMsg", appScrollerMsgRoutes);
app.use("/api/welcomemsg", welcomeMsgRoutes);
app.use("/api/combine", combineRoutes);
app.use("/api/msg", msgRoutes);
// app.use('/api/intimation', intimationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
