# veliqo-code-challenge
A spring microservice and angular app 

Install instructions:
FrontEnd:
Use the `yarn` command to install the packages. Then use `ng serve` to start the frontend app on port 4200

 BackEnd:
 Open all the files in intellij, or open one and use the maven add button to add all the microservices.
With Intelij, run all projects (the api-gateway hasn't been fully configured yet so you can leave it out) you can start with the following order

1. The config server: this is a eureka instance that registers all the services and facilates the communication between services, Project can run without it (with constant console errors) since there are no client requests. Runs on port 8761
2. The Auth service: this handles the authentication and the user functions. runs on port 9100
3. The Insurance service: this handle the insurance applications and creation of the insurances. runs on port 9200 
4. (Optional) The api-gateway: It should handle the routing of the application, this module has not yet been configured fully so the api is bypassing it for now. Runs on port 8888 
5. (Optional) Zipkin: This is used to track and log a request even between even multiple services. Install with docker using the command `docker run -d -p 9411:9411 openzipkin/zipkin` then go to port 9411 to access the zipkin dashboard

On start login then create your user then log in with that user. Then you can create an insurance type e.g travel insurance, then create an application on user/applications, which can be accepted or rejected on the route admin/applications
