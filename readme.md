# Simple Note RESTapi

an simple note REST API application to saves our notes

## guides

- ## running an server 
  
  - run this command first
  
    ```
    npm install
    ```

  - setup an <em>.env</em> file
    
    ```
    PORT_SERVER= [YOUR_PORT]
    DB_HOST= [YOUR_HOST_DATABASE]
    DB_USER= [YOUR_DATABASE_USERNAME]
    DB_PASSWORD= [YOUR_DATABASE_PASSWORD]
    DB_NAME= [YOUR_NAME_DATABASE]

    ```

  - to running an server you just type 
    ```
    npm start
    ```

- ## package is used
  
  ```
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "express": "^4.17.1",
    "mysql": "^2.17.1",
  ```


- ## Routes
  
  ### Index Routes

    - ` / ` -> index of main REST
  
  
  ## notes routes

  
  ### GET Method for fetch an data

    - ` /notes ` ->listing our notes data
      
      - __query list__
        - sort -> sorting data in ` asc ` or ` desc `
        - id -> for seeing specific notes (must in integer value)
        - page -> for changing position page
        - limit -> limiting data 
        - search -> search data
  
  ### PUT Method for updating data
    
    - ` /notes?id= `

  ### POST Method for inserting data

    - ` /notes `

  ### DELETE Method for deleting data

    - ` /notes?id= `


  ## categories routes

    - ` /categories ` ->listing our notes data
      
      - __query list__
        - sort -> sorting data in ` asc ` or ` desc `
        - id -> for seeing specific notes (must in integer value)
        - page -> for changing position page
        - limit -> limiting data 
        - search -> search data
    
    ### PUT Method for updating data

    - ` /categories?id= `

    ### POST Method for insert data

    - ` /categories `

    ### DELETE Method for deleting data

    - ` /categories?id= `



  
