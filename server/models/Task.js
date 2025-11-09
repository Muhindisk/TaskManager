import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In-progress', 'Completed'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Pending'
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
taskSchema.index({ status: 1, createdAt: -1 });
taskSchema.index({ dueDate: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  return this.status !== 'Completed' && new Date() > this.dueDate;
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
