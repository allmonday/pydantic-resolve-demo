import { ModuleAService, ModuleBService, ModuleCService } from "./src/client";

type AsyncReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

type ReadMySite1 = typeof ModuleAService.readMySite1;
type MySite1 = AsyncReturnType<ReadMySite1>;
type Param1 = Parameters<ReadMySite1>[0];

type ReadMySite2 = typeof ModuleBService.readMySite2;
type MySite2 = AsyncReturnType<ReadMySite2>;
type Param2 = Parameters<ReadMySite2>[0];

type ReadMySite3 = typeof ModuleCService.readMySite3;
type MySite3 = AsyncReturnType<ReadMySite3>;
type Param3 = Parameters<ReadMySite3>[0];

(async () => {
  const site1 = async () => {
    const name: Param1["name"] = "tangkikodo";
    const data: MySite1 = await ModuleAService.readMySite1({ name: name });
    console.log("------sample 1-------");
    console.log(JSON.stringify(data, null, 2));
  };

  const site2 = async () => {
    const name: Param2["name"] = "tangkikodo";
    const data: MySite2 = await ModuleBService.readMySite2({ name: name });
    console.log("------sample 2-------");
    console.log(JSON.stringify(data, null, 2));
  };

  const site3 = async () => {
    const name: Param3["name"] = "tangkikodo";
    const data: MySite3 = await ModuleCService.readMySite3({ name: name });
    console.log("------sample 3-------");
    console.log(JSON.stringify(data, null, 2));
  };

  await Promise.all([site1(), site2(), site3()]);
})();
