const catalogue = [
  { ref: "A", name: "Smartphone", price: 899.99 },
  { ref: "B", name: "Laptop", price: 619.99 },
  { ref: "C", name: "Headphones", price: 299.99 },
  { ref: "D", name: "Smartwatch", price: 199.99 },
  { ref: "E", name: "Robot vacuum cleaner", price: 335.88 },
  { ref: "F", name: "VR headset", price: 349.99 },
  { ref: "G", name: "Bicycle", price: 600 },
  { ref: "H", name: "Printer", price: 120 },
  { ref: "I", name: "Drone", price: 199.99 },
  { ref: "J", name: "Shower gel", price: 12.5 },
];

exports.get = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Articles recommandés
  res.send(catalogue);
};

exports.search = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Articles recommandés
  res.send(
    catalogue.filter(
      (item) =>
        item.titre.toLowerCase().includes(req.query.q.toLowerCase()) ||
        item.prix.toString().includes(req.query.q)
    )
  );
};
