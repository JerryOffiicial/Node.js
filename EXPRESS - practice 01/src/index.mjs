import express from "express";

const app = express();

const PORT = 3000;

const vehicles = [
  {
    id: 1,
    vehicle_name: "Toyota-super",
    vehicle_number: "244-GH-14",
    price: 1000000,
  },
  {
    id: 2,
    vehicle_name: "Honda-vision",
    vehicle_number: "499-KD-43",
    price: 2500000,
  },
  {
    id: 3,
    vehicle_name: "Honda-wessel",
    vehicle_number: "234-MN-56",
    price: 1800000,
  },
  {
    id: 4,
    vehicle_name: "Maruti-hinis",
    vehicle_number: "543-OE-23",
    price: 4000000,
  },
  {
    id: 5,
    vehicle_name: "fera-extreme",
    vehicle_number: "973-SP-98",
    price: 16000000,
  },
];

// ----------- GET -----------------------

//Query param - /api/users?filter={attributeName}&value={search}
app.get("/api/vehicles", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    res.send(
      vehicles.filter((vehicle) =>
        vehicle[filter].toLowerCase().includes(value)
      )
    );
  }
  res.send(vehicles);
});

//Route param
app.get("/api/vehicles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);

  if (isNaN(id)) {
    res.status(400).send({ msg: "Invalid Number" });
  }
  const vehicle = vehicles.find((vehicle) => vehicle.id === id);

  if (vehicle) {
    res.send(vehicle);
  }
  res.status(404).send({ msg: "Vehicle not found." });
});

//------------- POST --------------------
app.use(express.json());

app.post("/api/vehicles", (req, res) => {
  const { body } = req;
  const newVehicle = { id: vehicles[vehicles.length - 1].id + 1, ...body };
  vehicles.push(newVehicle);
  return res.status(201).send(newVehicle);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
