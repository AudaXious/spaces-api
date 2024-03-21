import SpacesMembers from "../../database/models/spaces/spaceMembers.js"
import { ErrResourceNotFound } from "../../errors/index.js"

export const checkIfUserBelongToASpace = async(userId, spaceId)=>{
    try{        
        const isUser = await SpacesMembers.findOne({
            user_id : userId,
            space_uuid : spaceId, 
        });

        if(!isUser) throw new Error("You need to be a member of this space, to perform the tasks");
        return isUser.user_id;
    }catch(error){
        throw error;
    }
}