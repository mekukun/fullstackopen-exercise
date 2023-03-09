const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const now = new Date();
  response.send(
    `<h1>Phonebook has info for ${persons.length} people.</h1><p>Request received at: ${now}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const min = 1;
  const max = 1000;

  while (true) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (![...persons.map((n) => n.id)].includes(randomNumber)) {
      return randomNumber;
    }
  }
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    });
  }

  if ([...persons.map((n) => n.name)].includes(body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number is missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
