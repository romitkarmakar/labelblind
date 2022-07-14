import moment from "moment";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
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
    <>
    <SEO title="LabelBlind: Your Favourite Tweets" />
    <Layout>
      <div className="p-4">
        <Context.Consumer>
          {(state) => (
            <div className="flex flex-col items-center">
              {tweets
                .filter((tweet) =>
                  tweet.text.toLowerCase().includes(state.search.toLowerCase())
                ).filter((tweet) => {
                  let publishedDate = moment(tweet.publishedDate)

                  if (state.filter.startDate && state.filter.endDate) {
                    if (publishedDate.isBefore(state.filter.endDate) && publishedDate.isAfter(state.filter.startDate)) return true;
                    else return false;
                  }
                  
                  if (state.filter.startDate) {
                    if (publishedDate.isAfter(state.filter.startDate)) return true;
                    else return false;
                  }

                  if (state.filter.endDate) {
                    if (publishedDate.isBefore(state.filter.endDate)) return true;
                    else return false;
                  }

                  return true;
                })
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
    </>
  );
}
