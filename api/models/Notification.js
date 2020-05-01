const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'Event',
        'Avatar',
        'Interests',
        'Attendant',
        'Comment',
        'Friendship',
        'Message',
        'Announcement',
      ],
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    path: { type: String, required: true },
    read: { type: Boolean, required: true, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);