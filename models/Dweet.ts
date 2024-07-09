import { Schema, model, models } from 'mongoose';

const DweetSchema = new Schema({
  creator: {
    type: Object,
  },
  dweet: {
    type: String,
    required: [true, 'dweet is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Dweet = models.Dweet || model('Dweet', DweetSchema);

export default Dweet;