import mongoose, { Schema, Query } from '../../bootstrap';
import {Case} from './case';

console.log(Case)
const Alert = new Schema({
  id: Schema.Types.ObjectId,
  case: {type: Schema.Types.Mixed, required: true},
  latitude: {type: Schema.Types.Decimal128, required: false},
  longitude: {type: Schema.Types.Decimal128, required: false},
  spotter_id: Schema.Types.ObjectId
});

export default mongoose.model('Alert', Alert);
export {Query, Alert};
