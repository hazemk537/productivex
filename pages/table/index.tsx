import Table from "@/components/Table";
import { readFile } from "fs";
import React from "react";

function index(props) {
 
  return (
    <div>
      <Table jsonData={props.jsonData} />
    </div>
  );
}

export default index;

export async function getServerSideProps(context) {
  // let tablePath=context?.params
  let filepath = context?.query?.filepath;
  // console.log('-------------------');
  // console.log(filepath);

  let jsonData = await new Promise((resolve, reject) => {
    readFile(filepath, "utf8", (err, jsonData) => {
      if (err) {
        reject(err);
      } else {
       
        resolve(jsonData);
      }
    }
  
  );
  });
  return { props: { jsonData: JSON.parse(jsonData) } };
}
