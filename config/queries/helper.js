const db = require("../db.js");

const getBanks = () => {
  return db
    .query("SELECT * FROM banks ORDER BY name;")
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const getListingsByCardID = (id) => {
  return db
    .query("SELECT * FROM listings JOIN vendors on vendor=vendors.id WHERE card_id = $1 ;", [id])
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const getListingsByVendor = (id) => {
  return db
    .query(
      "SELECT * FROM listings JOIN vendors on vendor=vendors.id JOIN cards on card_id=cards.id WHERE vendor = $1 ;",
      [id]
    )
    .then((data) => data.rows)
    .catch((err) => err.message);
};

const getCategories = () => {
  return db
    .query("SELECT * FROM categories ORDER BY featured desc, name;")
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const getFeaturedCategories = () => {
  return db
    .query("SELECT * FROM categories")
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const getVendors = () => {
  return db
    .query(
      "SELECT vendors.*, categories.name as category FROM vendors JOIN categories on category_id=categories.id ORDER BY name ;"
    )
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const getVendorsByRL = (rl) => {
  return db
    .query("SELECT * FROM vendors  WHERE relative_link = $1;", [rl])
    .then((data) => data.rows)
    .catch((err) => err.message);
};

const getFeaturedVendors = () => {
  return db
    .query("SELECT * FROM vendors WHERE featured = true;")
    .then((data) => data.rows)
    .catch((err) => err.message);
};

const getCards = () => {
  return db
    .query("SELECT * FROM cards ORDER BY name ;")
    .then((data) => data.rows)
    .catch((err) => err.message);
};

const getFeaturedCards = () => {
  return db
    .query("SELECT * FROM cards WHERE featured = true;")
    .then((data) => data.rows)
    .catch((err) => err.message);
};

// const getCategoriesByCardID = (id) => {
//   return db
//     .query(
//       "SELECT categories.name as category, reward_rate as Cashback, cards.name as cards FROM rewards JOIN categories on category_id=categories.id JOIN cards on card_id=cards.id WHERE card_id = $1;",
//       [id]
//     )
//     .then((data) => data.rows)
//     .catch((err) => err.message);
// };

const getCategoriesByID = (id) => {
  return db
    .query(
      "SELECT categories.name as category, reward_rate as cashback, cards.* as cards FROM rewards JOIN categories on category_id=categories.id JOIN cards on card_id=cards.id WHERE category_id = $1 ORDER BY cashback DESC, cards.annual_fee ASC;",
      [id]
    )
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const getCardsByBankID = (id) => {
  return db
    .query(
      "SELECT banks.name as bank, cards.* as cards FROM cards JOIN banks on bank_id=banks.id WHERE bank_id = $1;",
      [id]
    )
    .then((data) => data.rows)
    .catch((err) => err.message);
};
// const getAllCashback = () => {
//   return db
//     .query(
//       "SELECT categories.name as category, reward_rate as Cashback, cards.name as cards, cards.interest_rate as interest, cards.annual_fee as annual_fee from rewards JOIN categories on category_id=categories.id JOIN cards on card_id=cards.id ORDER BY Cashback DESC;"
//     )
//     .then((data) => data.rows)
//     .catch((err) => err.message);
// };
const getCashbackByID = (id) => {
  let cardIds = "(";
  for (let i = 0; i < id.length; i++) {
    if (i === id.length - 1) {
      cardIds = cardIds + id[i] + ")";
    } else {
      cardIds = cardIds + id[i] + ", ";
    }
  }
  const queryTxt = `SELECT categories.name as category, reward_rate as Cashback, cards.* from rewards JOIN categories on category_id=categories.id JOIN cards on card_id=cards.id WHERE card_id IN ${cardIds} GROUP BY categories.name, rewards.reward_rate, cards.id ORDER BY Cashback DESC;`;
  return db
    .query(queryTxt)
    .then((data) => data.rows)
    .catch((err) => err.message);
};
const searchBanks = (search) => {
  return db
    .query(`SELECT * FROM banks WHERE name LIKE '%${search}%' ORDER BY name`)
    .then((data) => data.rows)
    .catch((err) => err.message);
};

const searchCards = (search) => {
  return db
    .query(`SELECT * FROM cards WHERE name LIKE '%${search}%' ORDER BY name`)
    .then((data) => data.rows)
    .catch((err) => err.message);
};

const searchVendors = (search) => {
  return db
    .query(`SELECT * FROM vendors WHERE name LIKE '%${search}%' ORDER BY name`)
    .then((data) => data.rows)
    .catch((err) => err.message);
};

module.exports = {
  getBanks,
  getVendors,
  getVendorsByRL,
  // getCategoriesByCardID,
  getCategoriesByID,
  getListingsByVendor,
  // getAllCashback,
  getCashbackByID,
  getCategories,
  getFeaturedCategories,
  getFeaturedVendors,
  getFeaturedCards,
  getCards,
  getListingsByCardID,
  getCardsByBankID,
  searchBanks,
  searchCards,
  searchVendors,
};
