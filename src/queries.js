import gql from 'graphql-tag'

export const createItem = gql`
    mutation createItem(
      $name: String!
      $description: String!
      $quantity: Int!
      $quantityUnits: String!
      $reusable: Boolean!
      $imageUrl: String
      ) {
      createItem( data: {
        name: $name
        description: $description,
        quantity: $quantity
        quantityUnits: $quantityUnits
        reusable: $reusable
        imageUrl: $imageUrl
        }) {
        id
        description
        name
        quantity
        imageUrl
        updatedAt
        quantityUnits
        reusable
      }
    }
  `

export const updateItem = gql`
  mutation updateItem(
    $id:ID!
    $name: String!
    $description: String!
    $quantity: Int!
    $quantityUnits: String!
    $reusable: Boolean!
    $imageUrl: String
  ) {
    updateItem(
      where: {
        id: $id
      }
      data: {
        name: $name
        description: $description,
        quantity: $quantity
        quantityUnits: $quantityUnits
        reusable: $reusable
        imageUrl: $imageUrl
      }
        ) {
        id
        description
        name
        quantity
        imageUrl
        updatedAt
        quantityUnits
        reusable
      }
  }
`
export const deleteItem = gql`
mutation deleteItem($id:ID!){
  deleteItem(where:{id:$id}){
    id
  }
}
`
