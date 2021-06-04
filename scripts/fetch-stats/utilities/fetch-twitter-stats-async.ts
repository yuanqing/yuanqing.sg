import fetch from 'isomorphic-unfetch'

export async function fetchTwitterStatsAsync(
  tweetIds: Record<string, string>,
  bearerToken: string
): Promise<
  Record<string, { likes: number; retweets: number; replies: number }>
> {
  console.log('Twitter') // eslint-disable-line no-console
  const response = await fetch(
    `https://api.twitter.com/2/tweets?ids=${Object.keys(tweetIds).join(
      ','
    )}&tweet.fields=public_metrics`,
    {
      headers: {
        authorization: `Bearer ${bearerToken}`
      }
    }
  )
  const json = await response.json()
  const result: Record<
    string,
    { likes: number; retweets: number; replies: number }
  > = {}
  for (const tweet of json.data) {
    const stats = tweet.public_metrics
    result[tweetIds[tweet.id]] = {
      likes: stats.like_count,
      replies: stats.reply_count,
      retweets: stats.retweet_count + stats.quote_count
    }
  }
  return result
}
