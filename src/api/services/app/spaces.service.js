import SpacesMembers from "../../../database/models/spaces/spaceMembers.js";
import Spaces from "../../../database/models/spaces/spaces.js";
import Username from "../../../database/models/user/username.js";
import { ErrResourceAlreadyExists,ErrAlreadyJoined, ErrResourceNotFound } from "../../../errors/index.js";

const createSpaceService = async (userReq, userId)=>{
    const  {title} = userReq;

    const [isExistingUsername,isExistingSpace] = await Promise.all([await Username.findOne({
        username : { $regex: new RegExp(title, "i") }
    }),

    await Spaces.findOne({
        title : { $regex: new RegExp(title, "i") }
    })
    ]);

    if(isExistingUsername) throw ErrResourceAlreadyExists;
    if(isExistingSpace) throw ErrResourceAlreadyExists;

    const newSpace = await Spaces.create({
        ...userReq,
        creator_id : userId
    })

    return newSpace;
}

const joinSpaceService = async(spaceId)=>{
    const space = await Spaces.findOne({
        uuid : spaceId,
    });

    if(!space) throw ErrResourceNotFound;
    //
    const spaceMember = await SpacesMembers.findOne({
        spaceId : space._id,
        user_id : userId
    })

    if(spaceMember) throw ErrAlreadyJoined;

    await SpacesMembers.create({
        spaceId : space._id,
        user_id : userId,
    })
    return;
};

// const addSpaceBannerAndAvatarService = async()=>{

// };
export const SpaceService = {
    createSpaceService,
    joinSpaceService
}