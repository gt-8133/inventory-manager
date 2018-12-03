import * as Server from './Server'
import { seed } from './mockData'


Server.init()
  .then(async (connection) => {
    await seed(connection)



    


  })
  .catch((error) => console.log(error))
