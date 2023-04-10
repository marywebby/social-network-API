const router = require('express').Router();
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/courses', userRoutes);
router.use('/students', thoughtRoutes);

module.exports = router;