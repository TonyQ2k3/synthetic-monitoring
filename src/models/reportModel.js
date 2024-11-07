const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    totalSuites: {
        type: Number,
        required: true
    },
    totalTests: {
        type: Number,
        required: true
    },
    totalFailed: {
        type: Number,
        required: true
    },
    totalPassed: {
        type: Number,
        required: true
    },
    totalPending: {
        type: Number,
        required: true
    },
    totalSkipped: {
        type: Number,
        required: true
    },
    duration: {
        totalDuration: {
            type: Number,
            required: true
        },
        startedAt: {
            type: Date,
            required: true
        },
        endedAt: {
            type: Date,
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