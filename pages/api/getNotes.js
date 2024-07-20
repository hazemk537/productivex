import { error, log } from "console"
import { FILE } from "dns"
import { readFile, writeFile } from "fs"
import { resolve } from "path"

export default async function handler(req, res) {


  // #todo_1 id api
  let filepath = req.url.match(/filepath=(\w|\W)+/)[0].replace('filepath=','')
  // let data = JSON.parse(req.body).data
  // console.log( JSON.parse(req));
  readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      res.status(400).json({ message: 'getNotes  api failed !', err })
    }
    else {
      res.status(200).json({ message: 'getNotes  api success !',data: JSON.parse(data) })


    }

  })






}
