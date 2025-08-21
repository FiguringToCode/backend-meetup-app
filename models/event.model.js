const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ["Online", "Offline", "Both"],
        default: ["Both"]
    },
    eventImageUrl: {
        type: String
    },
    eventHostedBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        required: true
    },
    venue: {
        name: String,
        address: String,
        city: String,
        state: String,
        country: String
    },
    entryPrice: {
        type: String,
        required: true
    },
    speakerDetails: {
        speakerName: String,
        speakersDesignation: String
    },
    eventTags: [{
        type: String
    }]
},
{
    timestamps: true
})

const EventDetails = mongoose.model('EventDetails', eventSchema)

module.exports = EventDetails