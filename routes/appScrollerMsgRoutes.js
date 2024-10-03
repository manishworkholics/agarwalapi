const express = require('express');
const router = express.Router();
const appScrollerMsgController = require('../controllers/appScrollerMsgController');

router.get('/getAppScrollerMsgDetail', appScrollerMsgController.getappScrollerMsgDetail);
// Route to get a single record by ID
router.get('/getSingleScrollerData/:scroller_id', appScrollerMsgController.getSingleScrollerData);
// Route to create a new record
router.post('/createScrollerData', appScrollerMsgController.createScrollerData);
// Route to update a record by ID
router.put('/updateScrollerData/:scroller_id', appScrollerMsgController.updateScrollerData);
// Route to delete a record by ID
router.delete('/deleteScrollerData/:scroller_id', appScrollerMsgController.deleteScrollerData);

module.exports = router;
