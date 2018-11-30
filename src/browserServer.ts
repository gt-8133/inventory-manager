import 'reflect-metadata'
import 'sql.js/js/sql-optimized'
import { createConnection, Connection, ConnectionOptionsReader } from 'typeorm'
import { User, Item, Transaction, StatusType } from '../server/entity/Entities'
import { seed } from '../server/mockData'
import faker from 'faker'

let connection: Connection

export async function init() {
  connection = await createConnection({
    type: 'sqljs',
    entities: [User, Item, Transaction],
    synchronize: true
  })
  await seed(connection)
}

export function db() {
  return connection
}

// import "sql.js/js/sql-optimized";
// import {createConnection} from "typeorm";
// import { Item } from '../server/entity/Entities';
// // import {Post} from "./entity/Post";
// // import {Category} from "./entity/Category";

// export async function init() {

// await createConnection({
//     type: "sqljs",
//     location: "test",
//     autoSave: true,
//     entities: [
//       Item
//     ],
//     logging: ['query', 'schema'],
//     synchronize: true
// }).then(async connection => {
//     // document.write("Writing new post...<br>");

//     // const category1 = new Category();
//     // category1.name = "TypeScript";

//     // const category2 = new Category();
//     // category2.name = "Programming";

//     // const author = new Author();
//     // author.name = "Person";

//     // const post = new Post();
//     // post.title = "Control flow based type analysis";
//     // post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
//     // post.categories = [category1, category2];
//     // post.author = author;

//     // const postRepository = connection.getRepository(Post);
//     // await postRepository.save(post);

//     // document.write("<br>Post has been save:<br>");
//     // document.write("<pre>", JSON.stringify(post, null, 2), "</pre>");
//     console.log("Post has been saved: ");

// }).catch(error => {
//     // document.write("<b>Error: ", JSON.stringify(error, null, 2), "</b>");
//     console.log("Error: ", error)
// });
// }
