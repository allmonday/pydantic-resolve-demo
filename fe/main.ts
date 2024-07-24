import { readMySiteMySiteNameGet } from './src/client'

type MySite = Awaited<ReturnType<typeof readMySiteMySiteNameGet>>
type Param = Parameters<typeof readMySiteMySiteNameGet>


(async () => {
    const name: Param[0]['name'] = 'tangkikodo'
    const data: MySite = await readMySiteMySiteNameGet({ name: name })
    console.log(JSON.stringify(data, null, 2))
})()