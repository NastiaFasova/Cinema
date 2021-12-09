# Cinema

![Cinema](/images/cinema.jpg)

## Table of contents
* [Project purpose](#purpose)
* [Project structure](#structure)
* [For developer](#for_developer)
* [Authors](#authors)

# <a name="purpose"></a>Project purpose
This project is a simple version of cinema which simulates its main functions.
By the way, it gives you an opportunity to add movies' tickets into your shopping-cart
and make orders as a USER or add new movies, seances and cinema-halls as ADMIN.
#### The main functions of Cinema:

* Registration and log in form(provided by Spring Security)
* Services which will simulate the main features of cinema(which are described in more detail below)
* Two roles: User and Admin
* Authentication
As it was mentioned above, your ROLE determines the provided opportunities.
The main ones are listed below.
<hr>

### Depending on the role you will have such opportunities:

#### Functions available for all users:
* log in
* register
* get all movies
* get all movie-sessions
* get all cinema-halls
* get all you orders

#### Functions available only for users with a USER-role:

* make an order
* add a movie-session into your shopping-cart

#### Functions available only for users with a ADMIN-role:

* add new movies 
* add new cinema-halls with their capacity and description
* add new movie-sessions including the information about a film, cinema-hall 
it will be shown and the time of broadcasting

#### Table with endpoints and their description:
|   Endpoint                 |   Function    |        Action             |          Role           |
| -------------------------- |:-------------:| -------------------------:|-------------------------|
| /login                     |      GET      |         Login             |          all            |
| /register                  |      GET      |        Register           |          all            |
| /cinema-halls              |      GET      |     Display all           |          all            |
|                            |               |     cinema-halls          |                         |
| /cinema-halls              |     POST      |  Add new cinema-hall      |         ADMIN           |
| /movies                    |      GET      |  Display all movies       |          all            |
| /movies                    |     POST      |    Add new movie          |         ADMIN           |
| /movie-sessions/available/ |      GET      |   Display movie-sessions  |          all            |
|   movieId=%&date=%         |               | (of the film, on the date)|                         |
| /movie-sessions            |     POST      |   All new movies-session  |         ADMIN           |
| /orders                    |      GET      |  Get all orders of logged |          USER           |
|                            |               |           in user         |                         |
| /orders/complete           |     POST      |   Complete new order      |          USER           |
| /shopping-carts/by-user    |      GET      |   Get shopping-cart by    |    Not used on pages,   |
|                            |               |   user-id(logged in user) | just for authentication |
| /shopping-carts/           |     POST      |      User buys ticket     |          USER           |
|          add-movie-session |               |    for a movie-session    |                         |
| /users/by-email            |      GET      |    Get user by email      |     Not user on pages,  |
|                            |               |                           |  (for authentication)   |



In order to add some security and give the access to appropriate resources,
depending on the role,
Spring Security was plugged in. As a result, Basic Authentication is built into this project.
EmailValidation and PasswordValidation will also make an app more secure.
It also should be pointed out that it implements the principle of layered architecture.
By the way, such layers as DAO and, Service and Controller are absent.

I used Hibernate and implemented mapping of all our entities into the DataBase and vice verse on the DAO layer,
while on the Service layer all the business logic is concentrated.

Not the less important feature of my Cinema is that it's a REST-ful application.
All the responses are formatted using JSON. It makes the program stateless and more flexible as
the data format that the client needs may change.

# <a name="structure"></a>Project structure

* Java 11
* Hibernate 5.4.5.Final
* Spring 5.2.6.RELEASE
* Spring Security 5.3.3.RELEASE
* Maven 4.0.0
* javax.servlet 3.1.0
* log4j 1.2.17
* maven-checkstyle-plugin
* mysql-connector-java 8.0.15

# <a name="for_developer"></a>For developer
#### To run and test this project you need to install:

* [Java 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
* [Tomcat](https://tomcat.apache.org/download-90.cgi)
* [MySQL 8 ](https://www.mysql.com/downloads/)
* [Postman](https://www.postman.com/downloads/)

#### After installation, you should do the following:

Add this project to your IDE as Maven project.

Configure Tomcat : 
* Add artifact
* Add Java SDK 11

Change a path in src.main.java.resources.log4j.properties. It has to reach your logFile.

#### If you want to test it using SQL DataBase and see the results of HTTP requests, you should:  

* Create a schema "mate_cinema" in any SQL database.
* At src.main.resources.db.properties file use your personal data for the DB to plug in.

![Configure_db](/images/configure_db.png)

* Configure the dependency for the connector to your DBMS.

![Configuring_pom](/images/my_sql.png)

You may change nothing in pom.xml file. There are used the latest versions 
of Hibernate and Spring frameworks.

Run the project and log in.

By default, two users will be generated.
 
The first one - with a USER role (login = user@ukr.net, password = 1111) 
The second one – with an ADMIN role (login = admin@gmail.com, password = 9999). 

After that, with help of Postman, you may test any function.
Add the Content-type : application/json into the Header.

![Configuring_postman](/images/configure_postman.png)

Don't forget to fill the BODY for POST methods.

![Configuring_post-method](/images/configure_post-method.png)
<hr>

# <a name="authors"></a>Authors
* [NastiaFasova](https://github.com/NastiaFasova) 
