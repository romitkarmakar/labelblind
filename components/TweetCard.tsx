import Link from "next/link";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Tweet } from "../lib/schema";
import { generateRandomColor, getInitials } from "../lib/util";
import Like from "./Like";

interface IProps {
  tweet: Tweet;
  animate: boolean;
}

export default function TweetCard({ tweet, animate }: IProps) {
  return (
    <AnimationOnScroll animateIn="animate__fadeIn" initiallyVisible={!animate}>
      <div className="shadow-lg rounded-lg p-8 my-2 hover:bg-gray-100 max-w-2xl">
        <div className="flex items-start">
          <UserAvatar
            name={tweet.author}
            image={tweet.extra?.includes?.users[0].profile_image_url}
          />
          <div className="ml-3">
            <Link href={tweet.url} passHref>
              <a target="_blank">
                <div className="inline-flex items-center">
                  <span className="font-bold text-lg">
                    {tweet.extra?.includes?.users[0].name}
                  </span>
                  <span className="text-gray-500 ml-1">@{tweet.author}</span>
                </div>
                <p>{tweet.text}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Posted on {new Date(tweet.publishedDate).toDateString()}
                </p>
              </a>
            </Link>
            <div className="flex justify-between mt-4">
              <Like tweet={tweet} />
              <div className="inline-flex items-center text-gray-500 hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
                  />
                </svg>
                <span className="ml-1 text-sm">Save</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationOnScroll>
  );
}

function UserAvatar({ image, name }: any) {
  if (image)
    return <img src={image} className="w-12 h-12 rounded-full object-cover" />;
  else
    return (
      <div
        className="inline-flex items-center justify-center h-12 w-12 p-6 rounded-full object-cover"
        style={{ backgroundColor: generateRandomColor() }}
      >
        <span className="text-2xl font-medium leading-none text-white">
          {getInitials(name)}
        </span>
      </div>
    );
}
