import { extract } from "@extractus/oembed-extractor";
import * as cheerio from "cheerio";
import { ErrInternalServer } from "../../errors/index.js";

export const fetchIdSocialPost = async (url) => {
  try{
    const content = await extract(url);
    return content;

  }catch(error){
    console.log(error);
    throw ErrInternalServer
  }
};

export const extractIdFromTweet = async (tweetBody) => {
  try{
    const $ = cheerio.load(tweetBody);
    const tweetText = $('blockquote').text().trim();
    const match = /aud-id=([a-f\d-]+)/i.exec(tweetText);
    return match ? match[0] : null;
  }catch(error){
    console.log(error)
    throw ErrInternalServer;
  }
};

export const  extractUsername= (authorUrl) => {
    const username = authorUrl.split('/').pop();
    return username;
  }
  