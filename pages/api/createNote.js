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

    jsonData.push(data)
    return jsonData


  }).then((newData) => {
    // backed res
    writeFile(`${filepath}`, JSON.stringify(newData), (err) => {
      if (err) {

        throw new Error('error while writing new data')

      }
      else {
        console.log('File Saved Successfully', `${filepath}`);

        res.status(200).json({ message: 'update api!' })

      }
    })
    // update file
  }).catch((err) => {
    // console.log(err);

    res.status(400).json({ message: `${err}`, })
   

  })


}