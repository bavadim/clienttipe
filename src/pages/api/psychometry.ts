// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Error {
  message: string
}

export type Grades = 'мало' | 'меньше среднего' | 'средне' | 'больше среднего' | 'много'

export interface UserStatistics {
	name: string
	psychotypes: {
		меланхолик: Grades
		холерик: Grades
		флегматик: Grades
		сангвиник: Grades
	}

	temperament: {
		истероид: Grades
		гипертим: Grades
		шизоид: Grades
		параноял: Grades
		эпилептоид: Grades
		депрессивный: Grades
		эмотив: Grades
		тревожный: Grades
	}
}

export interface Measures {
  [username: string]: UserStatistics
}

export interface ChatMessage {
  message: string
  sender: string
}

const getRandomElement = (arr: any[]) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined

const fakeMeasure: (name: string) => UserStatistics = (name: string) => {
  return ({
    name: name,
    psychotypes: {
      меланхолик: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      холерик: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      флегматик: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      сангвиник: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
    },

    temperament: {
      истероид: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      гипертим: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      шизоид: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      параноял: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      эпилептоид: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      депрессивный: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      эмотив: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
      тревожный: getRandomElement(['мало', 'меньше среднего', 'средне', 'больше среднего', 'много']),
    }
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Measures>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const body: ChatMessage[]  = JSON.parse(req.body);

  //todo: stub
  const users = [ ...new Set(body.map(chatMessage => chatMessage.sender)) ]
  const measures = users.reduce((o, key) => Object.assign(o, {[key]: fakeMeasure(key)}), {});

  res.status(200).json(measures)
}
