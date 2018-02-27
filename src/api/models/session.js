import mongoose, { Schema, Query } from '../../bootstrap';

const Topic = new Schema({
  title: String,
  submitter: String,
  created: { type: Date, default: Date.now },
});

//show comment if author or visibility set to true
const Comment = new Schema({
  message: String,
  private: { type: Boolean, default: false },
  author: String,
  emotion: {},
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Session', new Schema({
  title: String,
  employee: String,
  manager: String,
  employee_username: String,
  manager_username: String,
  employee_id: Number,
  manager_id: Number,
  topics: [Topic],
  comments: [Comment],
  action_items: [String],
  created: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  closed: Date
}));

export {Query};
