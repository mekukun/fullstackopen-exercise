require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(express.static("dist"));

morgan.token("postData", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((err) => next(err));
});

app.get("/api/info", (request, response) => {
  const now = new Date();
  Person.find({})
    .then((result) => {
      response.send(
        `<h1>Phonebook has info for ${result.length} people.</h1><p>Request received at: ${now}</p>`
      );
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((person) => {
    response.json(person);
  });
});

// Error handling middlewares

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// handler of requests with result to errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Close the Mongoose connection when the Node.js process exits
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed");
    process.exit(0);
  });
});
