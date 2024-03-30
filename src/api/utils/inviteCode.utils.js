import Invites from "../../database/models/invites/invites.js";
import { ErrInvalidInviteCode } from "../../errors/index.js";

export const validateInviteCode = async(code)=>{
 const codeData = code.split("-");
 const codeNumber = codeData[1];
 const codePrefix = codeData[0]

 const inviteData = await Invites.findOne({
    serial : codeNumber,
    prefix :{ $regex: new RegExp(`^${codePrefix}$`, "i") },
 })


 if (!inviteData) throw ErrInvalidInviteCode;

 return inviteData._id;
}


export const deleteInviteCode = async (invite_id)=>{
    await Invites.deleteOne({
        _id : invite_id,
    });

    console.log("Invite code deleted");
}