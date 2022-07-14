import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TweetCard from "../components/TweetCard";
import { fetchLikedTweets } from "../lib/favourites";
import { Tweet } from "../lib/schema";
import Context from "../lib/state";

export default function FavouritesPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    let value = fetchLikedTweets();

    setTweets(value);
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <Context.Consumer>
          {(state) => (
            <div className="flex flex-col items-center">
              {tweets
                .filter((tweet) =>
                  tweet.text.toLowerCase().includes(state.search.toLowerCase())
                )
                .map((tweet, index) => {
                  return (
                    <TweetCard
                      animate={index > 3}
                      tweet={tweet}
                      key={tweet._id}
                    />
                  );
                })}
            </div>
          )}
        </Context.Consumer>
      </div>
    </Layout>
  );
}
