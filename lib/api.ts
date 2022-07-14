import { Tweet, TwitterAPIError, TwitterSingleTweetResponse } from "./schema";

export async function fetchData(): Promise<Tweet[]> {
    try {
        let raw = await fetch("http://www.mocky.io/v2/5d1ef97d310000552febe99d");
        let response: Tweet[] = await raw.json();

        // Create an array ids from all the tweet urls by extracting the last part of tweet url
        let ids: string[] = [];
        for (let i = 0; i < response.length; i++) {
            if (response[i].url.split("/").pop() != undefined) ids.push(response[i].url.split("/").pop() as string);
        }

        // Fetch all the tweet data from the twitter api
        let result = await fetchMultipleTweets(ids);

        // Append the twitter data to the main data in the extra field
        for (let i = 0; i < response.length; i++) {
            let id = response[i].url.split("/").pop();
            if (!id) continue;

            if (result.get(id)) response[i].extra = result.get(id);
        }

        return response;
    } catch (e) {
        console.error(e);

        return [];
    }
}

export async function fetchTweet(id: string): Promise<TwitterSingleTweetResponse | null> {
    if (id == "") return null;

    let url = new URL(`https://api.twitter.com/2/tweets/${id}`);
    url.searchParams.set("expansions", "author_id");
    url.searchParams.set("user.fields", "profile_image_url");

    console.log(url.toString());
    try {
        let raw = await fetch(url.toString(), {
            headers: {
                "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        });
        let response = await raw.json();

        return response;
    } catch (e) {
        console.error(e);

        return null;
    }
}

export async function fetchMultipleTweets(ids: string[]): Promise<Map<string, TwitterSingleTweetResponse>> {
    if (ids.length == 0) return new Map();

    let url = new URL(`https://api.twitter.com/2/tweets`);
    url.searchParams.set("ids", ids.join(","));
    url.searchParams.set("expansions", "author_id,attachments.media_keys");
    url.searchParams.set("user.fields", "profile_image_url");
    url.searchParams.set("media.fields", "url");

    try {
        let raw = await fetch(url.toString(), {
            headers: {
                "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        });
        let response = await raw.json();

        if (response.status) {
            console.error(response);

            return new Map();
        }

        // Create a mapping from author data for faster access
        let authorMapping = new Map();
        for (let i = 0; i < response.includes.users.length; i++) {
            authorMapping.set(response.includes.users[i].id, response.includes.users[i]);
        }

        // Create a array from errors to memorize the post ids not accessible
        let errorPosts: string[] = response.errors.map((error: TwitterAPIError) => error.resource_id);

        // Create a mapping of posts using its id as key
        let postsMapping = new Map<string, TwitterSingleTweetResponse>();

        for (let i = 0; i < response.data.length; i++) {
            if (errorPosts.includes(response.data[i].id))
                postsMapping.set(response.data[i].id, {
                    errors: [response.errors.find((el: TwitterAPIError) => el.resource_id == response.data[i].id)]
                })
            else postsMapping.set(response.data[i].id, {
                data: response.data[i],
                includes: {
                    users: [authorMapping.get(response.data[i].author_id)],
                    // TODO: Add the media array
                    media: []
                }
            })
        }

        return postsMapping;
    } catch (e) {
        console.error(e);

        return new Map();
    }
}