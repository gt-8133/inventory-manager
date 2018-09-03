# Inventory-Manager
### An inventory management solution with user controls and admin features.


## Development

### Setup

- Install Nodejs
    ### Windows:
     - [install node-version-manager-windows from here](https://github.com/coreybutler/nvm-windows)

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

- Clone this repo
    ```sh
    git clone https://github.com/gt-8133/inventory-manager.git \
    cd inventory-manager \
    ```
- Install dependencies:
    ```sh
    npm install
    ```

### Running Instructions

- Start the backend server:
    ```sh
    npm run server
    ```

- Start the frontend server:
    ```sh
    npm start
    ```
    **Now open up your browser to localhost:3000**
    
- If you want to restore the database from a backup, refer to the readme.md in the `server` folder


## Extra Reads

- see `server/README.md` for instructions for controlling the database (backing-up, restoring, controlling via terminal)

- [Graphcool Docs](https://docs-next.graph.cool/docs/)

