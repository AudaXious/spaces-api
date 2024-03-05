import Spaces from "../../../database/models/spaces/spaces.js";
import { ErrResourceAlreadyExists, ErrResourceNotFound } from "../../../errors/index.js";

const createSpaceService = async (userReq)=>{
    const  {title} = userReq;

    const space = await Spaces.findOne({
        title : { $regex: new RegExp(title, "i") }
    });

    if(space) throw ErrResourceAlreadyExists;

    const newSpace = await Spaces.create({
        ...userReq,
    })

    return newSpace;
}

const joinSpace = async(spaceId)=>{
    const space = await Spaces.findOne({
        uuid : spaceId,
    });

    if(!space) throw ErrResourceNotFound;
    //
};
export const SpaceService = {
    createSpaceService,
    joinSpace
}