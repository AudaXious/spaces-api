import User from "../../../database/models/user/user.js";
import Username from "../../../database/models/user/username.js";
import { ErrVerifyingTwitter, ErrUserNotFound,ErrAccountNotVerified } from "../../../errors/index.js";
import { fetchIdSocialPost, extractIdFromTweet, extractUsername } from "../../utils/extractors.utils.js";

const linkAccountService = async (userId) => {
  const user_uuid = await  User.findOne({_id : userId})
  if(!user_uuid) throw ErrUserNotFound;
  return user_uuid.uuid;
};

const verifySocialLinkService = async (url) => {
  const tweetBody = await fetchIdSocialPost(url);
  const content = await extractIdFromTweet(tweetBody.html);
  console.log(content);
  if (!content) throw ErrAccountNotVerified;
  
  const id = content.split("=")[1] ?? null;
  //
  const user = await User.findOne({
    uuid: id,
  });

  if (!user) throw ErrUserNotFound;

  const twitter_username = extractUsername(tweetBody.author_url);
  // await Username.updateOne(
  //   {
  //     twitterUsername: twitter_username,
  //   },
  //   { new: true }
  // );
  const isLinked = await Username.findOne({
    user_id : user._id,
  });

  if(isLinked && isLinked.twitterUsername !== null) throw ErrVerifyingTwitter

  await isLinked.updateOne({
        twitterUsername: twitter_username,
      },
      { new: true }
  );

  return {userId : user.uuid, twitterUserName : twitter_username};
};

export const TwitterService = {
    linkAccountService,
    verifySocialLinkService,
}