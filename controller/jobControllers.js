const Job = require('../models/jobs')
const geoCoder = require('../utils/geocoder')

exports.getJobs = async (req, res, next) => {

    const jobs = await Job.find()
    res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    })
}

exports.newJobs = async (req, res, next) => {
    console.log(req.body);
    const job = await Job.create(req.body)
    res.status(200).json({
        success: true,
        message: 'job created.',
        data: job
    })
}

exports.getJobInRadius = (req, res, next) => {
    const { zipcode, distance } = req.params

    
}