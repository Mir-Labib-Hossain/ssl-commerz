// node app.js

const express = require("express");
const bodyParser = require("body-parser");
const SSLCommerzPayment = require("sslcommerz-lts");
const app = express();

require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use("/ssl-request", async (req, res, next) => {
  const data = {
    total_amount: 100,
    currency: "EUR",
    tran_id: "REF123",
    success_url: `${process.env.BASE_URL}:${process.env.PORT}/success`,
    fail_url: `${process.env.BASE_URL}:${process.env.PORT}/fail`,
    cancel_url: `${process.env.BASE_URL}:${process.env.PORT}/cancel`,
    ipn_url: `${process.env.BASE_URL}:${process.env.PORT}/ipn`,
    shipping_method: "Courier",
    product_name: "Laptop.",
    product_category: "Electronic",
    product_profile: "Macbook Pro",
    cus_name: "Mir Labib Hossain",
    cus_email: "labib@gmail.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01670280474",
    cus_fax: "01670280474",
    ship_name: "Mir Labib Hossain",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };

  const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false); //true for live default false for sandbox
  sslcommer.init(data).then((data) => {
    console.log(data);
    if (data?.GatewayPageURL) return res.status(200).redirect(data.GatewayPageURL);
    return res.status(400).json({
      message: "Ssl-commerz's session was not succesful",
    });
  });
});

app.post("/success", async (req, res, next) => {
  return res.status(200).json({
    data: req.body,
  });
});

app.post("/fail", async (req, res, next) => {
  return res.status(400).json({
    data: req.body,
  });
});

app.post("/cancle", async (req, res, next) => {
  return res.status(200).json({
    data: req.body,
  });
});

app.post("/ipn", async (req, res, next) => {
  return res.status(200).json({
    data: req.body,
  });
});

app.listen(process.env.PORT, () => {
  console.log("App is running");
});
