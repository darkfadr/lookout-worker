import mongoose, { Schema, Query } from '../../bootstrap';
import {Alert} from  './alert';

const Case = new Schema({
  id: Schema.Types.ObjectId,
  alerts: [Alert],
  plate: {type: String, required: true},
  created_at: {type: Date, default: Date.Now},
  updated_at: {type: Date, default: Date.Now},
  active: {type: Boolean, default: true}
});

export default mongoose.model('Case', Case);
export {Query, Case};
