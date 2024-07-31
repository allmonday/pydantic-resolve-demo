import { MainService } from './src/client'

type MySite1 = Awaited<ReturnType<typeof MainService.readMySite1>>
type Param1 = Parameters<typeof MainService.readMySite1>[0]

type MySite2 = Awaited<ReturnType<typeof MainService.readMySite2>>
type Param2 = Parameters<typeof MainService.readMySite2>[0]

type MySite3 = Awaited<ReturnType<typeof MainService.readMySite3>>
type Param3 = Parameters<typeof MainService.readMySite3>[0]

(async () => {
    const site1 = async () => {
        const name: Param1['name'] = 'tangkikodo'
        const data: MySite1 = await MainService.readMySite1({ name: name })
        console.log('------sample 1-------')
        console.log(JSON.stringify(data, null, 2))
    }

    const site2 = async () => {
        const name: Param2['name'] = 'tangkikodo'
        const data: MySite2 = await MainService.readMySite2({ name: name })
        console.log('------sample 2-------')
        console.log(JSON.stringify(data, null, 2))
    }

    const site3 = async () => {
        const name: Param3['name'] = 'tangkikodo'
        const data: MySite3 = await MainService.readMySite3({ name: name })
        console.log('------sample 3-------')
        console.log(JSON.stringify(data, null, 2))
    }

    await Promise.all([site1(), site2(), site3()])
})()