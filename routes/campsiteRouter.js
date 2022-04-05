const express = require('express');
const campsiteRouter = express.Router();
//Gives us an object that we can use with Express routing methods

campsiteRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
  //passes control of the routing to the next relevant routing method (below). If the path is to app.post, it will skip app.get and go to that method next.
})
.get((req, res) => {
  res.end('Will send all the campsites to you');
}) //typical approach to add a little functionality at a time
.post((req, res) => {
  res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
}) //Post requests typically contain some info within the body of the request
.put((req, res) => {
  res.statusCode = 403 //error code used when operation isn't supported
  res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
  res.end('Deleting all campsites');
}); //Usually a 'dangerous operation' so you don't want to allow ordinary users to do it. When we study authentication, we will see how we can limit this operation to priviledged users.


campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put((req, res) => {
  res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
  res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
  res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

module.exports = campsiteRouter;

