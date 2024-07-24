import { MainService } from './src/client'

type MySite = Awaited<ReturnType<typeof MainService.readMySite>>
type Param = Parameters<typeof MainService.readMySite>[0]


(async () => {
    const name: Param['name'] = 'tangkikodo'
    const data: MySite = await MainService.readMySite({ name: name })
    console.log(JSON.stringify(data, null, 2))
})()