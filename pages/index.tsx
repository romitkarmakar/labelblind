import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TweetCard from "../components/TweetCard";
import { fetchData } from "../lib/api";
import { Tweet } from "../lib/schema";

interface IProps {
  tweets: Tweet[];
}

export default function IndexPage({ tweets }: IProps) {
  return (
    <>
      <SEO title="LabelBlind: Digitising Food Labelling" />
      <Layout>
        <div className="p-16">
          <div className="flex flex-col items-center">
            {tweets.map((tweet, index) => {
              return (
                <TweetCard animate={index > 3} tweet={tweet} key={tweet._id} />
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Cache the response for 10 seconds
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  // Fetch the most recent tweets
  const tweets = await fetchData();

  return {
    props: {
      tweets,
    },
  };
};
