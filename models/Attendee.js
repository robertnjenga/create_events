import   { Schema, model, models } from 'mongoose'; 

const AttendeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  validated: {
    type: Boolean,
    default: false,
  },
}); 

const Attendee = models.Attendee || model("Attendee", AttendeeSchema);

export default Attendee;   