const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    stats: {
        suites: {
            type: Number,
            required: true
        },
        tests: {
            type: Number,
            required: true
        },
        passes: {
            type: Number,
            required: true
        },
        pending: {
            type: Number,
            required: true
        },
        failures: {
            type: Number,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    tests: [
        {
            title: {
                type: String,
                default: 'Untitled Test',
                required: true,
            },
            description: {
                type: String,
                default: 'No description available',
            },
            state: {
                type: String,
                required: true,
                enum: ['passed', 'failed']
            },
            duration: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('report', reportSchema);