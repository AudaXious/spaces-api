import SpacesMembers from "../../../database/models/spaces/spaceMembers.js";
import Spaces from "../../../database/models/spaces/spaces.js";
import Username from "../../../database/models/user/username.js";
import { 
    ErrResourceAlreadyExists,
    ErrAlreadyJoined, 
    ErrResourceNotFound, 
    ErrSpaceAlreadyExists, 
    ErrUserNotFound, 
    ErrTwitterAccountNotLinked } from "../../../errors/index.js";
import User from "../../../database/models/user/user.js";

const createSpaceService = async (userReq, userId)=>{
    const  {title} = userReq;

    const user  = await User.findById(userId);

    if(!user) throw ErrUserNotFound;

    const [isExistingUsername,isExistingSpace] = await Promise.all([await Username.findOne({
        username : { $regex: new RegExp(`^${title}$`, "i") }
    }),

    await Spaces.findOne({
        title : { $regex: new RegExp(`^${title}$`, "i") }
    })
    ]);

    if(isExistingUsername) throw ErrResourceAlreadyExists;
    if(isExistingSpace) throw ErrSpaceAlreadyExists;
    if(user.twitterUsername === null) throw ErrTwitterAccountNotLinked;
    
    const newSpace = await Spaces.create({
        ...userReq,
        creator_id : userId,
        creator_uuid : user.uuid,
    })

    return newSpace;
}

const joinSpaceService = async(spaceId, userId)=>{
    const space = await Spaces.findOne({
        uuid : spaceId,
    });

    if(!space) throw ErrResourceNotFound;
    //
    const spaceMember = await SpacesMembers.findOne({
        space_id : space._id,
        user_id : userId
    })

    if(spaceMember) throw ErrAlreadyJoined;

    await SpacesMembers.create({
        space_id : space._id,
        space_uuid : space.uuid,
        user_id : userId,
    })
    return;
};

const getAllSpacesService = async ()=>{
    const spaces = await Spaces.find();
    return spaces;
}

const getASpaceService = async(spaceNameOrId)=>{
    const space = await Spaces.findOne({
        $or : [
            {uuid : spaceNameOrId,},
            {title : { $regex: new RegExp(`^${spaceNameOrId}$`, "i") }}

        ]
    })

    if(!space) throw ErrResourceNotFound;

    return space.toJSON();
}

const getUserSpaceService = async (userId) =>{
    const user = await User.findOne({
        uuid : userId
    })
    
    if(!user) throw ErrUserNotFound;

    const spaces = await Spaces.find({
        creator_id : user._id,
    })

    if(!spaces) throw ErrResourceNotFound;

    return spaces;
}
const getUserJoinedSpaceService = async (userId) =>{
    const spaces = await SpacesMembers.find({
        user_id : userId,
    });
    return spaces;
}

export const SpaceService = {
    createSpaceService,
    joinSpaceService,
    getAllSpacesService,
    getASpaceService,
    getUserSpaceService,
    getUserJoinedSpaceService
}