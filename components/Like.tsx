import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { deleteTweet, isTweetLiked, saveTweet } from '../lib/favourites'
import { Tweet } from '../lib/schema'

interface IProps {
  tweet: Tweet
}

export default function Like({ tweet }: IProps) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (isTweetLiked(tweet._id)) {
      setLiked(true)
    }
  }, [])

  const like = () => {
    if (!liked) {
      saveTweet(tweet)
      setLiked(true)
    } else {
      deleteTweet(tweet._id)
      setLiked(false)
    }
  }

  return (
    <div className="inline-flex items-center hover:text-red-500">
      <button onClick={like}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'h-6 w-6 ' + (liked ? 'fill-red-500' : 'fill-gray-400')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={0}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <span className="ml-1 text-sm text-gray-500">
        {parseInt(tweet.likes) + (liked ? 1 : 0)}
      </span>
    </div>
  )
}
