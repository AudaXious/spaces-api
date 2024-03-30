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
import uploadSingleMedia from "../storage/cloudinary.service.js";
import Attachment from "../../../database/models/attachments/attachments.js";
import { deleteInviteCode, validateInviteCode } from "../../utils/inviteCode.utils.js";

const createSpaceService = async (userReq, userId, req)=>{
    const  {title,inviteCode} = userReq;
   
    const invite_id = await validateInviteCode(inviteCode)

    //
    if(!req.files['icon'] || req.files['icon'].length === 0) throw new Error("Please add space Icon")

    const bannerFile =req.files['banner'] ? req.files['banner'][0] : null; // Access the first file uploaded to the 'banner' field
    const iconFile = req.files['icon'][0]; // Access the first file uploaded to the 'icon' field

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

    await deleteInviteCode(invite_id);

    let bannerBuffer = bannerFile ? bannerFile.buffer : null;
    
    const [spaceIcon, spaceBanner] = await Promise.all([
        await uploadSingleMedia(iconFile.buffer, "icon", newSpace._id),
        bannerBuffer ? await uploadSingleMedia(bannerBuffer, "banner", newSpace._id) : null,
    ])

    const spaceIconObj = {
        item_id : newSpace._id,
        user_id : userId,
        mime  : iconFile.mimetype,
        url : spaceIcon.secure_url,
        label : 'icon',
    }

    const attachmentsArray = [
        spaceIconObj,
    ]

    if (spaceBanner !== null) {
        const bannerFileMimeType = bannerFile.mimetype;
        const spaceBannerSecureUrl = spaceBanner.secure_url;

        const spaceBannerObj = {
            item_id: newSpace._id,
            user_id: userId,
            mime: bannerFileMimeType,
            url: spaceBannerSecureUrl,
            label : 'banner',
        };

        attachmentsArray.push(spaceBannerObj);
    }

    const attachment = await Attachment.insertMany(attachmentsArray);

    // console.log(spaceIcon);
    // console.log("Space Banner",spaceBanner);
    await SpacesMembers.create({
        space_id : newSpace._id,
        space_uuid : newSpace.uuid,
        user_id: user._id,
        role : "owner",
    })
    
    return {
        ...newSpace.toJSON(), 
        iconUrl : attachment[0].url, 
        bannerUrl : attachment[1] ? attachment[1].url : null, 
    };
}


//
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


//
const getAllSpacesService = async ()=>{

    // const spaces = await Spaces.aggregate([
    //     {
    //         $lookup: {
    //             from: "space_members", // Name of the SpacesMembers collection
    //             localField: "uuid", // Field in the Spaces collection
    //             foreignField: "space_uuid", // Field in the SpacesMembers collection
    //             as: "spaceMembers" // Output array field
    //         }
    //     },
    //     {
    //         $addFields: {
    //             spaceMembersCount: { $size: "$spaceMembers" }, // Calculate the size of the spaceMembers array
    //         }
    //     },
    //     {
    //         $project: {
    //             spaceMembers: 0,// Exclude the spaceMembers array from the final output
    //             _id : 0
    //         }
    //     }
    // ]);

    const spaces = await Spaces.aggregate([
        {
          $lookup: {
            from: "space_members",
            localField: "uuid",
            foreignField: "space_uuid",
            as: "spaceMembers"
          }
        },
        {
          $addFields: {
            spaceMembersCount: { $size: "$spaceMembers" }
          }
        },
        {
          $project: {
            spaceMembers: 0,
            _id: 0
          }
        },
        {
          $lookup: {
            from: "attachments",
            let: { space_uuid: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$item_id", "$$space_uuid"] },
                      { $in: ["$label", ["icon", "banner"]] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: "$label",
                  url: { $first: "$url" }
                }
              },
              {
                $project: {
                  _id: 0,
                  label: "$_id",
                  url: 1
                }
              }
            ],
            as: "attachments"
          }
        },
        {
          $addFields: {
            iconUrl: {
              $cond: [
                { $eq: [{ $size: "$attachments" }, 0] },
                null,
                { $arrayElemAt: ["$attachments.url", 0] }
              ]
            },
            bannerUrl: {
              $cond: [
                { $eq: [{ $size: "$attachments" }, 0] },
                null,
                { $arrayElemAt: ["$attachments.url", 1] }
              ]
            }
          }
        },
        {
          $project: {
            attachments: 0
          }
        }
      ]);

    

    return spaces;
}


//
const getASpaceService = async(spaceNameOrId)=>{
    const space = await Spaces.aggregate([
        {
          $match: {
            $or: [
              { uuid: spaceNameOrId },
              { title: { $regex: new RegExp(`^${spaceNameOrId}$`, "i") } },
            ],
          },
        },
        {
          $lookup: {
            from: "space_members",
            localField: "uuid",
            foreignField: "space_uuid",
            as: "spaceMembers",
          },
        },
        {
          $addFields: {
            spaceMembersCount: { $size: "$spaceMembers" },
          },
        },
        {
          $project: {
            spaceMembers: 0,
          },
        },
        {
          $lookup: {
            from: "attachments",
            let: { item_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$item_id", "$$item_id"] },
                      { $in: ["$label", ["icon", "banner"]] },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: "$label",
                  url: { $first: "$url" },
                },
              },
              {
                $project: {
                  _id: 0,
                  label: "$_id",
                  url: 1,
                },
              },
            ],
            as: "attachments",
          },
        },
        {
          $addFields: {
            iconUrl: {
              $cond: [
                { $eq: [{ $size: "$attachments" }, 0] },
                null,
                { $arrayElemAt: ["$attachments.url", 0] },
              ],
            },
            bannerUrl: {
              $cond: [
                { $eq: [{ $size: "$attachments" }, 0] },
                null,
                { $arrayElemAt: ["$attachments.url", 1] },
              ],
            },
          },
        },
        {
          $project: {
            attachments: 0,
          },
        },
      ]);
    
      if (space.length === 0) throw ErrResourceNotFound;
    
      return {
        ...space[0],
        iconUrl: space[0].iconUrl || null,
        bannerUrl: space[0].bannerUrl || null,
      };
    // const space = await Spaces.findOne({
    //     $or : [
    //         {uuid : spaceNameOrId,},
    //         {title : { $regex: new RegExp(`^${spaceNameOrId}$`, "i") }}

    //     ]
    // })

    // if(!space) throw ErrResourceNotFound;
    // const spaceMembersCount = await SpacesMembers.countDocuments(
    //         {
    //             space_uuid : space._id,
    //         })
    // return {...space.toJSON(), spaceMembersCount : spaceMembersCount};
}


//
const getUserSpaceService = async (userId) =>{
    const user = await User.findOne({
        uuid : userId
    })
    
    if(!user) throw ErrUserNotFound;


    const spaces = await Spaces.aggregate([
        {
            $match: {
                creator_id: user._id // Match spaces created by the user
            }
        },
        {
            $lookup: {
                from: "space_members", 
                localField: "uuid", 
                foreignField: "space_uuid", 
                as: "spaceMembers" 
            }
        },
        {
            $addFields: {
                spaceMembersCount: { $size: "$spaceMembers" } // Calculate the size of the spaceMembers array
            }
        },
        {
            $project: {
                spaceMembers: 0, // Exclude the spaceMembers array from the final output
                _id : 0,
            }
        },
        {
            $lookup: {
              from: "attachments",
              let: { space_uuid: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$item_id", "$$space_uuid"] },
                        { $in: ["$label", ["icon", "banner"]] }
                      ]
                    }
                  }
                },
                {
                  $group: {
                    _id: "$label",
                    url: { $first: "$url" }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    label: "$_id",
                    url: 1
                  }
                }
              ],
              as: "attachments"
            }
          },
          {
            $addFields: {
              iconUrl: {
                $cond: [
                  { $eq: [{ $size: "$attachments" }, 0] },
                  null,
                  { $arrayElemAt: ["$attachments.url", 0] }
                ]
              },
              bannerUrl: {
                $cond: [
                  { $eq: [{ $size: "$attachments" }, 0] },
                  null,
                  { $arrayElemAt: ["$attachments.url", 1] }
                ]
              }
            }
          },
          {
            $project: {
              attachments: 0
            }
          }
    ]);

    if(!spaces) throw ErrResourceNotFound;

    return spaces;
}

//
const getUserJoinedSpaceService = async (userId) =>{
    const spaces = await SpacesMembers.find({
        user_id : userId,
    }).select("space_uuid -_id")
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