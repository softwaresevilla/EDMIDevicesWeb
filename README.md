# EDMI Devices web

This web is created to manage devices. This is a CRUD manager written in angular, which is connected to an API. To connect to the API you have to know that there are some changes to be applied in the configuration files that will be explained later.

# Requirements
1. NodeJS
2. Docker

# API configuration

Inside the project, there are two different configuration files, depending if you serve the web in a development environment or in a production environment. These files are named environment.ts and environment.prod.ts. In these files, it is necessary to change the apiUrl to connect to the correct API.

```
apiUrl: 'http://localhost:5001/api'
```

# Deployment

To deploy the web, you have two different options. You can deploy the web and use a web server to serve it, or you could choose to deploy the web using docker. To do this, of course, it is a requirement to have Docker installed on your system.

### 1. Deploy without docker

To deploy the web, you have to execute the following command and the web will be compiled.

```
npm run-script build
```

After that, will be available a folder called 'dist'. To use your web, copy the files inside this folder to your web server and configure it to serve the web.

### 2. Deploy using docker

To deploy the web using docker, you must have installed docker in your system. To do this, you have to execute the following commands.

```
docker build -t edmidevicesapp .
docker run -d -it -p 4200:80 --name edmidevicesapp edmidevicesapp
```

Executing the commands above, the web will be serve at port 4200. Change it to serve in the port you decide.
