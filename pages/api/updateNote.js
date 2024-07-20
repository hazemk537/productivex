import { FILE } from "dns"
import { readFile, writeFile } from "fs"
import { resolve } from "path"

export default async function handler(req, res) {




  let data = JSON.parse(req.body).data
  let filepath = JSON.parse(req.body).filepath
  // console.log( JSON.parse(req.body));



  new Promise((resolve, reject) => {
    readFile(filepath, 'utf8', (err, jsonData) => {
      if (err) {
        // console.log('Update API', err);
        throw new Error('cannot open json File')
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
        // return new data
        return jsonData
      }

    }
    throw new Error('item not found')
  }).then((newData) => {
    // backed res
    writeFile(`${filepath}`, JSON.stringify(newData), (err) => {
      if (err) {

        throw new Error('error while writing new data')

      }
      else {
        console.log('File Saved Successfully',`${filepath}`);

        res.status(200).json({ message: 'update api!' })

      }
    })
    // update file
  }).catch((err) => {
    // console.log(err);
    
    res.status(400).json({ message: `${err}`,  })
    // #note_case bad sending err
    // res.status(400).json({ message: 'see error', err }) err should be object has keys
    // res.status(400).json({ message: 'see error', err:err }) not work



  })
  // #todo_3 catch gets also err code 
  // #todo_3 replace with async await
  // 
  // #note_1 will excuted before promise chain end
  // res.status(400).json({ message: 'error happen in update note api!' })


}