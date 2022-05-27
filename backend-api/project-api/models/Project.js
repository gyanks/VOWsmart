
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* defining schema for Project */

let projectSchema = new Schema({
  _id: String,
  projectName: String,
  version: String,
  clientName: String,
  creationDate: Date,
  owner: {
    _id: String,
    name: String
  },
  admin: {
    _id: String,
    name: String
  },
  users: [
    {
      _id: String,
      name: String,
      doj: Date,
      roles: {
        "user": Boolean,
        "supervisor": Boolean,
        "admin": Boolean
      }
    }
  ],
  

}, {
  collection: 'ClientProjects'
})

module.exports = mongoose.model('Project', projectSchema);
