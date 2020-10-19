import express from 'express';
import logMsg from '../utils/logMsg';

import currentUser from '../middlewares/current-user';

const router = express.Router();

router.get('/currentUser', currentUser, (req, res) => {
  logMsg('greenBright', 'get', 'Retreiving current user');

  res.send({
    currentUser: req.currentUser || null,
  });
});

export default router;
