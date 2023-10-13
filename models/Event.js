import   { Schema, model, models } from 'mongoose'; 


const EventSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'Attendee',
    required: true,
}]
},
{ timestamps: true}
);

const Event = models.Event || model("Event", EventSchema);

export default Event;   

