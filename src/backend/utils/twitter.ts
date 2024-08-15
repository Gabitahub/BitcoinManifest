import Twitter from "twit";

declare global {
  // eslint-disable-next-line no-var
  var twitterCli: Twitter | undefined;
}

const twitterConfig: any = {
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token: process.env.TWITTER_CLIENT_ID,
  access_token_secret: process.env.TWITTER_CLIENT_SECRET,
};

const twitterCli = global.twitterCli ?? new Twitter(twitterConfig);

global.twitterCli = twitterCli;

export default twitterCli;
