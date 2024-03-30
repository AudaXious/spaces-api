import { Schema, model } from "mongoose";


const inviteSchema = new Schema(
  {
    serial : {
        type : Number,
        unique : true,
        default : () =>{
          return Math.floor(Math.random() * 9000) + 1000;
        },
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


inviteSchema.virtual('code').get(function () {
    return `${this.prefix}-${this.serial}`; // Access the generated _id and prepend the prefix
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
