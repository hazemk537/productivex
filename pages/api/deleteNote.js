import { FILE } from "dns"
import { readFile, writeFile } from "fs"
import { resolve } from "path"

export default async function handler(req, res) {
  // best practise shoud i use dlt here ? #todo_3
  let dataId = JSON.parse(req.body).dataId
  let filepath = JSON.parse(req.body).filepath
  console.log(dataId,filepath);



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
    let index = jsonData.findIndex((item) => item.id === dataId)

    let deletedItems = jsonData.splice(index, 1)
    if (deletedItems.length > 0)
      return jsonData
    else
      throw new Error('item not found')
  }).then((newData) => {
    // backed res
    writeFile(`${filepath}`, JSON.stringify(newData), (err) => {
      if (err) {

        throw new Error('error while writing new data')

      }
      else {
        console.log('File Saved Successfully', `${filepath}`);

        res.status(200).json({ message: 'delete api!', newData })

      }
    })
    // update file
  }).catch((err) => {
    // console.log(err);

    res.status(400).json({ message: `${err}`, })

  })


}