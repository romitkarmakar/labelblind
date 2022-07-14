import moment from 'moment'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import TweetCard from '../components/TweetCard'
import { fetchData } from '../lib/api'
import { Tweet } from '../lib/schema'
import Context from '../lib/state'

interface IProps {
  tweets: Tweet[]
}

export default function IndexPage({ tweets }: IProps) {
  return (
    <>
      <SEO title="LabelBlind: Digitising Food Labelling" />
      <Layout>
        <div className="p-4">
          <Context.Consumer>
            {(state) => (
              <div className="flex flex-col items-center">
                {tweets
                  .filter((tweet) =>
                    tweet.text
                      .toLowerCase()
                      .includes(state.search.toLowerCase())
                  )
                  .filter((tweet) => {
                    let publishedDate = moment(tweet.publishedDate)

                    if (state.filter.startDate && state.filter.endDate) {
                      if (
                        publishedDate.isBefore(state.filter.endDate) &&
                        publishedDate.isAfter(state.filter.startDate)
                      )
                        return true
                      else return false
                    }

                    if (state.filter.startDate) {
                      if (publishedDate.isAfter(state.filter.startDate))
                        return true
                      else return false
                    }

                    if (state.filter.endDate) {
                      if (publishedDate.isBefore(state.filter.endDate))
                        return true
                      else return false
                    }

                    return true
                  })
                  .map((tweet, index) => {
                    return (
                      <TweetCard
                        animate={index > 3}
                        tweet={tweet}
                        key={tweet._id}
                      />
                    )
                  })}
              </div>
            )}
          </Context.Consumer>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Cache the response for 10 seconds
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  )

  // Fetch the most recent tweets
  const tweets = await fetchData()

  return {
    props: {
      tweets,
    },
  }
}
