import { Tweet } from "./schema";

const LIKED_TWEETS_KEY = "liked_tweets";

export function saveTweet(tweet: Tweet) {
    // Fetch the locally stored tweets
    let localTweets = localStorage.getItem(LIKED_TWEETS_KEY)

    let tweets: Tweet[] = [];
    if (localTweets != undefined) tweets = JSON.parse(localTweets);

    // Add the new tweet to array
    tweets.push(tweet);

    // Save it to localstorage
    localStorage.setItem(LIKED_TWEETS_KEY, JSON.stringify(tweets));
}

export function isTweetLiked(id: string): boolean {
    // Fetch the locally stored tweets
    let localTweets = localStorage.getItem(LIKED_TWEETS_KEY)

    let tweets: Tweet[] = [];
    if (localTweets != undefined) tweets = JSON.parse(localTweets);

    // Check if the id exits in the array
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i]._id == id) return true;
    }

    return false;
}

export function fetchLikedTweets(): Tweet[] {
    // Fetch the locally stored tweets
    let localTweets = localStorage.getItem(LIKED_TWEETS_KEY)

    let tweets: Tweet[] = [];
    if (localTweets != undefined) tweets = JSON.parse(localTweets);

    return tweets;
}

export function deleteTweet(id: string) {
    // Fetch the locally stored tweets
    let localTweets = localStorage.getItem(LIKED_TWEETS_KEY)

    let tweets: Tweet[] = [];
    if (localTweets != undefined) tweets = JSON.parse(localTweets);

    // Delete the provided tweet
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i]._id == id) {
            tweets.splice(i, 1);
            break;
        }
    }

    // Save it to localstorage
    localStorage.setItem(LIKED_TWEETS_KEY, JSON.stringify(tweets));
}