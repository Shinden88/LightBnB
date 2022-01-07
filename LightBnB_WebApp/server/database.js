const properties = require('./json/properties.json');
const users = require('./json/users.json');
const bcrypt = require('bcrypt');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
}); 

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT users.*
  FROM users
  WHERE users.email = $1;
  `, [email.toLowerCase()])
  .then(res => {
    let user = res.rows[0];
    if (user) return user;
    else return null; 
  })
  .catch(err => console.error('query error', err.stack));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(`
  SELECT users.*
  FROM users
  WHERE users.id = $1;
  `, [id])
  .then(res => {
    let user = res.rows[0];
    if (user) return user;
    else return null; 
  })
  .catch(err => console.error('query error', err.stack));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email.toLowerCase(), user.password])
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
  SELECT * 
  FROM reservations
  WHERE guest_id = $1
  ORDER BY start_date DESC
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  let optionCommand = 'WHERE';

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${optionCommand} city LIKE $${queryParams.length}`;
    optionCommand = 'AND';
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `${optionCommand} owner_id = $${queryParams.length}`;
    optionCommand = 'AND';
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `${optionCommand} cost_per_night >= $${queryParams.length}`;
    optionCommand = 'AND';
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `${optionCommand} cost_per_night <= $${queryParams.length}`;
    optionCommand = 'AND';
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
};
exports.addProperty = addProperty;
