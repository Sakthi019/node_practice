const mongoose = require('mongoose')
const validator = require('validator')
const slugify = require('slugify')
const geoCoder = require('../utils/geocoder')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please enter job title.'],
        trim: true,
        maxlength: [100, 'Job title can not exceed 100 characters.']
    },
    slug: String,
    description: {
        type: String,
        require: [true, 'Please enter job description.'],
        maxlength: [1000, 'Job description can not exceed 100 characters.']
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please add a valid email address.']
    },
    address: {
        type: String,
        require: [true, 'Please add an address.']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    company: {
        type: String,
        require: [true, 'Please add company name.']
    },
    industry: {
        type: [String],
        require: true,
        enum: {
            values: ['Business', 'IT Industry', 'Banking', 'Education/Training', 'Telecommunication', 'Others'],
            message: 'Please select the correct options for Industry.'
        }
    },
    jobType: {
        type: String,
        require: true,
        enum: {
            values: ['Permanent', 'Temporary', 'Internship'],
            message: 'Please select the correct options for Job type.'
        }
    },
    minEducation: {
        type: String,
        require: true,
        enum: {
            values: ['Bachelors', 'Masters', 'Phd'],
            message: 'Please select the correct options for Education.'
        }
    },
    positions: {
        type: Number,
        default: 1
    },
    experience: {
        type: String,
        require: true,
        enum: {
            values: ['No Experience', '1year - 2years', '2years - 5years', '5years+'],
            message: 'Please select the correct options for Experience.'
        }
    },
    salary: {
        type: Number,
        require: [true, 'Please enter expected salary for this job']
    },
    postingDate: {
        type: Date,
        default: Date.now
    },
    lastDate: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 7)
    },
    applicantsApplied: {
        type: [Object],
        select: false
    }
})

jobSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next();
})

jobSchema.pre('save', async function (next) {
    const loc = await geoCoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
})

module.exports = mongoose.model('Job', jobSchema)