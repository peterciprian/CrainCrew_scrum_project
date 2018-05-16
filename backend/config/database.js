/*
use blog
db.createUser(
   {
     user: "root",
     pwd: "toor",
     roles:
       [
         { role: "readWrite", db: "blog" }
       ]
   }
)
*/

// const host = 'localhost';
// const port = 27017;
// const user = 'root';
// const password = 'toor';
// const database = 'blog';

/**
 * Set up and export database
 */

module.exports = {
  uri: 'mongodb://crane-crew:crane-crew@ds119150.mlab.com:19150/crane-crew',
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};
