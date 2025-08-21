const { initializeDatabase } = require('./db/db.connect')
const Event = require('./models/event.model')

const express = require('express')
const app = express()

initializeDatabase()

app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));



const createEvent = async (newEvent) => {
    try {
        const event = new Event(newEvent)
        return await event.save()
    } catch (error) {
        throw error
    }
}

app.post('/events', async (req, res) => {
    try {
        console.log(req.body)
        const savedEvent = await createEvent(req.body)
        res.status(201).json({message: "Event data added successfully.", event: savedEvent}) 
        
    } catch (error) {
        res.status(500).json({error: "Failed to save data.", error})
    }
})



const getEvents = async () => {
    try {
        const events = await Event.find()
        return events

    } catch (error) {
        throw error
    }
}

app.get('/events', async (req, res) => {
    try {
        const events = await getEvents()
        if(events.length != 0){
            res.json(events)
        } else {
            res.status(404).json({error: "Events not found"})
        }
        
    } catch (error) {
        res.status(500).json({error: "Falied to fetch events."})
    }
})



const getEventsByTitle = async (eventTitle) => {
    try {
        const event = Event.find({title: eventTitle})
        return event

    } catch (error) {
        throw error
    }
}

app.get('/events/title/:eventTitle', async (req, res) => {
    try {
        const event = await getEventsByTitle(req.params.eventTitle)
        if(event.length != 0){
            res.json(event)
        } else {
            res.status(404).json({error: "Event not found."})
        }

    } catch (error) {
        res.status(500).json({error: "Failed to fetch event"})
    }
})



const getEventById = async (eventId) => {
    try {
        const event = await Event.find({_id: eventId})
        return event

    } catch (error) {
        throw error
    }
}

app.get('/events/:eventId', async (req, res) => {
    try {
        const event = await getEventById(req.params.eventId)
        event ? res.status(200).json({message: "Found event by id", eventDetail: event}) : res.status(404).json({error: error})
        
    } catch (error) {
        res.status(500).json({error: "Failed to fetch event."})
    }
})




const PORT=3000
app.listen(PORT, () => {
    console.log('Server connected to port', PORT)
})