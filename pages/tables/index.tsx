import React, { useState } from "react";
import { readdir, readFile } from "fs";
import { promiseHooks } from "v8";
import Table from "@/components/Table";
import Link from "next/link";
import { Router, useRouter } from "next/router";
function index(props) {
  // console.log(props.filesInFolder);

  // #note_case not react compoentn

  // let router=useRouter()

  return (
    <div>
      {props?.filesInFolder?.map((item, id) => {
        let filepath = `${props?.folderPath}/${item}`;
        return (
          <Link key={id} href={{ pathname: `/table`, query: { filepath } }}>
            <span>{item}</span>
            <br></br>
          </Link>
        );
      })}
    </div>
  );
}
export default index;

export async function getServerSideProps(context) {
  // let tablePath=context?.params
  let folderPath = context?.query?.folder;
  // console.ltablePathog(context)

  let files = await new Promise((resolve, reject) => {
    readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        console.log(files);

        resolve(files);
      }
    });
  });
  return { props: { filesInFolder: files, folderPath: folderPath } };
}
