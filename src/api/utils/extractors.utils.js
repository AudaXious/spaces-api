import { extract } from "@extractus/oembed-extractor";
import * as cheerio from "cheerio";

export const fetchIdSocialPost = async (url) => {
  const content = await extract(url);
  return content;
};

export const extractIdFromTweet = async (tweetBody) => {
  const $ = cheerio.load(tweetBody);
  const tweetText = $('blockquote').text().trim();
  const match = /aud-id=([a-f\d-]+)/i.exec(tweetText);
  return match ? match[0] : null;
};

export const  extractUsername= (authorUrl) => {
    const username = authorUrl.split('/').pop();
    return username;
  }
  