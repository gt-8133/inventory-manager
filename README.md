<div align="center">
    <img src="docs/readme-logo.png" width="256px">
    <h1>Inventory-Manager</h1>
    <a href="https://circleci.com/gh/gt-8133/inventory-manager/tree/develop">
    <img src="https://img.shields.io/circleci/project/github/gt-8133/inventory-manager/develop.svg">
    </a>
    <a href="https://circleci-latest-artifact.herokuapp.com/gt-8133/inventory-manager/develop/dist/index.html">
    <img src="https://img.shields.io/badge/live%20demo-link-blue.svg">
    </a>
    <a href="https://circleci-latest-artifact.herokuapp.com/gt-8133/inventory-manager/develop/cypress/videos/main.spec.js.mp4">
    <img src="https://img.shields.io/badge/cypress-tests-blue.svg">
    </a>
        
<p>An inventory management solution with user controls and admin features.</p>
    
</div>


## Release Notes

### features:

- admin inventory view with edit access:
    - allow admin to search and edit any item in inventory
    - allow editing item details includding name, quantity, description, among other features
    - allow deleting items from inventory
    - allow creating new item in inventory
- admin events view
    - view recent checkouts from inventory
    - ability to reverse/revert item checkout from inventory
- admin main view
    - recieve notification for event checkout
 - user scanner view
    - allow user scan QR code and checkout item
    - can report item as missing
    - can add app to homescreen
  

### features not yet implemented:

- admin report generation
- admin notifications for item below set threshold
- user notification for item not returned after checkout
- inventory management through scale-measured IOT devices

## Known bugs or defects:
- authentication must be setup by OIT in order to work properly:
  - OIT must set up CAS SSO for this application
- users scanning barcodes that don't match an item have no error handling

# install guide:




## Development

### Setup

- Install Nodejs
    ### Windows:
     - [install node-version-manager-windows from here](https://github.com/coreybutler/nvm-windows)
     -do the setup msi
     - open cmd and type: nvm install latest
     - then write: nvm on
        after this npm will be availible until computer is restarted

    ### MacOS / Linux:
     - [install node-version-manager from here](https://github.com/creationix/nvm)

        ```sh
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
        ```
        - close and reopen terminal
        ```sh
        nvm install --lts

        nvm alias default node
        ```

- Install Docker:
    - Install docker, then ensure you can run the following command in the terminal:
    ```sh
    docker ps
    ```
    If you get a permissions error, search solutions for running docker without sudo, or permissions error in windows.

- Install Graphcool globally from npm:
    ```sh
    npm i -g graphcool
    ```
- Install Prisma globally from npm:
    ```sh
    npm i -g prisma
    ```
- Install get-graphql-schema
    ```sh
    npm install -g get-graphql-schema
    ```
- Clone this repo
    ```sh
    git clone https://github.com/gt-8133/inventory-manager.git \
    cd inventory-manager \
    ```
- Install dependencies:
    ```sh
    npm install
    ```
:+1: Good to go

### Running Instructions

- Start the backend server:
    ```sh
    npm run server
    ```
    - If you want to restore the database from a backup, refer to the readme.md in the `server` folder


- Start the frontend server:
    ```sh
    npm start
    ```
    **Now open up your browser to localhost:3000**
    
#### For a mocked in-browser database:
 - You only need to start the frontend server, and use an environment variable during the webpack build:
    ```sh
    npm run start:mocked
    ```
    


## Extra Reads

- see `server/README.md` for instructions for controlling the database (backing-up, restoring, controlling via terminal)

- [Prisma Docs](https://www.prisma.io/docs/)



## Contributing

- make sure the code you're writing has a corrosponding issue (if it addresses multiple issues, just pick one)
- make a new branch with the issue number in the name  
(ex. `issue-42`):
```sh
    git checkout -b issue-42
```
- **commit** early and often
- **push** your code:
```sh
    git push origin HEAD
```
- open a WIP PR, named something like this:  
`WIP: Admin Features`

- See a build of your branch at  
`https://gt-8133.github.io/inventory-manager/<branch-name>`
