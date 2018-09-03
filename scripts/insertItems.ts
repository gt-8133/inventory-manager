import gql from 'graphql-tag'
import ApolloClient from "apollo-boost"
import fetch from 'node-fetch'
import * as _ from 'lodash'


const items = {
basketball: {
    description: "a basketball",
    name: "Basketball",
    imageUrl: "https://image.flaticon.com/icons/png/128/1084/1084780.png",
    quantity:5,
    quantityUnits:'count'
},

 tennisball : {
    description:"Here's a description",
    imageUrl: "https://image.flaticon.com/icons/png/512/1084/1084790.png",
    name: "Tennis Ball",
    quantity: 12,
    quantityUnits: "count"
},

 whistle : {
    description:"Here's a description",
    imageUrl: "https://image.flaticon.com/icons/png/128/1084/1084794.png",
    name: "Referee Whistle",
    quantity: 3,
    quantityUnits: "count"
},


 dumbell : {
    description:"Here's a description",
    imageUrl: "https://image.flaticon.com/icons/png/128/1084/1084783.png",
    name: "Dumbell",
    quantity: 2,
    quantityUnits: "count"
}
}

const createItem = gql`
mutation createItem(
    $name:String!,
    $quantity:Int!,
    $quantityUnits:String!,
    $description:String!,
    $imageUrl:String!){
  createItem(
    name:$name
    description:$description
    imageUrl: $imageUrl
    quantity: $quantity
  	quantityUnits: $quantityUnits
  ){
    id
  }
}
`

const client = new ApolloClient({
    uri: "http://localhost:60000/simple/v1/cjllndxls00020107o32kr4h3",
    fetch
})

Object.keys(items).forEach((key)=>{
    client.mutate({
        mutation:createItem,
        variables: _.defaults(items[key],{reusable:true})
    })
})

// client.mutate({
//     mutation: createItem,
//     variables: tennisball,
// })
