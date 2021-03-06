const logger = require("./logger");


/**
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

/**
 * Middleware to handle errors
 * @param {Error} error 
 * @param {Request} request 
 * @param {Response} response 
 * @param {Function} next 
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
