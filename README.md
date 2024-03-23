# Kwil DB Admin

## Introduction

The KwilDB admin interface allows users to interact with the Kwil database directly from a web interface. It is built as a Next.js application, and can be used upon deployment without requiring any setup process. Users can authenticate transactions on the client side using their Metamask wallet.

## Local Storage and IndexedDB

The application utilizes IndexedDB for persistent local storage of user data, organized into four tables: providers, queries, schemas, and settings.

- **providers**: This table allows users to manage (add or remove) these Kwil providers based on their requirements. It includes pre-configured connection details for the Kwil Testnet and Localhost environments.
- **queries**: This tables stores custom queries created by the user.
- **schemas**: Contains definitions for user-created database schemas. An initial example schema is provided to assist users in getting started with schema creation.
- **settings**: Holds user-specific settings, such as the currently active Kwil provider and the user's account.

## Deployment

The Kwil team can easily deploy the application on a sub-domain of Kwil.com. Additionally, individuals can run the admin interface locally to work with their Local Kwil network offline.

### Building and Pushing to Docker Hub

To deploy, first build the image and push it to a container registry, such as Docker Hub. Follow these steps:

1. Build the Docker image:

`docker build -t db-admin .`

2. Tag the image and push to the container registry

`docker tag db-admin:latest docker.io/kwildb/db-admin:latest && docker push docker.io/kwildb/db-admin:latest`

3. Once these steps have been taken anyone can run the DB Admin locally with the following command:

`docker run -p 3000:3000 kwildb/db-admin`

At this stage I have completed the above commands so the DB Admin is available from my own Docker Hub account with the following command:

`docker run -p 3000:3000 martinopensky/db-admin`

`docker tag db-admin:latest docker.io/martinopensky/db-admin:latest && docker push docker.io/martinopensky/db-admin:latest`

## Testing

Unit tests exist in the **tests** directory and can be run using the following command:

`yarn test`
