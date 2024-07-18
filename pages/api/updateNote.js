import { FILE } from "dns"
import { readFile } from "fs"
import { json } from "stream/consumers"

export default async function handler(req, res) {




  let data = JSON.parse(req.body.data)
  let filePath = JSON.parse(req.body.filePath)
  // console.log( JSON.parse(req.body));




  new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, jsonData) => {
      if (err) {
        console.log('Update API', err);
        reject()
      }
      else {
        resolve(JSON.parse(jsonData))

      }

    })
  }).then((jsonData) => {

    for (let x = 0; x < jsonData.length; ++x) {
      if (jsonData[x].id === data.id) {
        // update
        jsonData[x] = data
      }
      
    }

    
    

  })


  res.status(200).json({ message: 'update api!' })

}