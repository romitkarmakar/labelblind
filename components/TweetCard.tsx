import Link from "next/link";
import { useEffect, useState } from "react";
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
            onlyLarge
          />
          <div className="ml-3">
            <Link href={tweet.url} passHref>
              <a target="_blank">
                <div className="flex mb-4 md:mb-1">
                  <div className="block md:hidden">
                    <UserAvatar
                      name={tweet.author}
                      image={tweet.extra?.includes?.users[0].profile_image_url}
                    />
                  </div>
                  <div className="inline-flex md:items-center flex-col md:flex-row items-start ml-2 md:ml-0">
                    <span className="font-bold text-lg mr-1">
                      {tweet.extra?.includes?.users[0].name}
                    </span>
                    <span className="text-gray-500">@{tweet.author}</span>
                  </div>
                </div>

                <p>{tweet.text}</p>
                <div className="aspect-w-16 aspect-h-9 my-4">
                  <img
                    src={`https://picsum.photos/seed/${tweet.publishedDate}/400/600`}
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Posted on {new Date(tweet.publishedDate).toDateString()}
                </p>
              </a>
            </Link>
            <div className="flex w-full mt-4">
              <Like tweet={tweet} />
              <div className="inline-flex items-center text-gray-500 hover:text-blue-500 cursor-pointer ml-4">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="ml-1 text-sm">{tweet.retweets}</span>
              </div>
              <div className="flex-grow" />
              <div className="inline-flex items-center text-gray-500 hover:text-blue-500 cursor-pointer">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="ml-1 text-sm">Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationOnScroll>
  );
}

function UserAvatar({ image, name, onlyLarge }: any) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.screen.width < 768 && onlyLarge) setShow(false);

    addEventListener("resize", (event) => {
      if (window.screen.width < 768 && onlyLarge) setShow(false);
      else setShow(true);
    });
  }, []);

  if (!show) return <></>;

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
