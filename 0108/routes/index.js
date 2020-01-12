const express = require('express');
const router = express.Router();
const postRouter = require('./post');

const myErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({success: false});
}

router.get('/', function(req, res, next) {
  res.status(200).send('hello!!');
});

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});
router.use(myErrorHandler);

module.exports = router;
