import { Schema, model } from "mongoose";

const pointSchema = new Schema({
  user_id : {
    type : Schema.Types.ObjectId,
    ref : "Users",
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default : 0
  },
},
  {
    timestamps: true,
    versionKey : false,
    id : false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

pointSchema.statics.updatePoints = async function(userId, newPoints) {
  try {
    const existingPoints = await this.findOne({ user_id: userId });

    if (existingPoints) {
      existingPoints.points += newPoints;
      await existingPoints.save();
      return existingPoints;
    } else {
      const newPoint = new this({ user_id: userId, points: newPoints });
      await newPoint.save();
      return newPoint;
    }
  } catch (error) {
    console.error("Error updating points:", error);
    throw error;
  }
};

const Points = model("Points", pointSchema);

export default Points;
