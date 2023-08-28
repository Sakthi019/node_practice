const express = require('express')
const { getJobs, newJobs } = require('../controller/jobControllers')
const router = express.Router()

router.route('/jobs').get(getJobs)
router.route('/job/new').post(newJobs)

module.exports = router