import mongoose, { Schema, model } from "mongoose";
import autoIncrement from 'mongoose-sequence';

const increment = autoIncrement(mongoose);

const inviteSchema = new Schema(
  {
    id : {
        type : Number,
        unique : true,
    },
    prefix : {
        type : String,
        default : "adx"
    }
  },
  {
    timestamps: true,
    versionKey: false,
    // id: false,
  }
);

inviteSchema.plugin(increment, {id : "inviteCode_id",inc_field : "id"});

inviteSchema.virtual('code').get(function () {
    return `${this.prefix}-${this.id}`; // Access the generated _id and prepend the prefix
  });
  
const Invites = model("InvitesCodes", inviteSchema);

export async function createDefaultInviteCodes() {
    // Create 100 default invite codes
    const defaultInviteCodes = [];
    for (let i = 0; i < 100; i++) {
      defaultInviteCodes.push({});
    }
  
    try {
      await Invites.create(defaultInviteCodes);
      console.log("Default invite codes created successfully");
    } catch (err) {
      console.error("Error creating default invite codes:", err);
    }
  }




export default Invites;
