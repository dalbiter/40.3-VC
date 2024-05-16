const db = require("../db");
const ExpressError = require('../expressError')

// 40.3.3 Simple OO approach part 1
class Cat {
  static async getAll() {
    let result = await db.query("SELECT id, name, age FROM cats")
    return result.rows;
  };

  static async getById(id) {
    let result = await db.query("SELECT id, name, age FROM cats WHERE id=$1", [id])
    if(result.rows.length === 0) throw new ExpressError('Cat not found', 404)
    return result.rows[0];
  };

// 40.3.4 Simple OO approach part 2
  static async create(name, age) {
    if (!name || !age) throw new ExpressError("Missing require data!", 400)
    let result = await db.query(
      `INSERT INTO cats (name, age) 
      VALUES ($1, $2)
      RETURNING id, name, age`, [name, age]
    );
    return result.rows[0];
  };

  static async delete(id) {
    let result = await db.query(
      `DELETE FROM cats
      WHERE id=$1
      RETURNING id, name, age`, 
      [id]
    )
    if (result.rows.length === 0) throw new ExpressError("Cat not found", 404)
    return result.rows[0]
  };

// 40.3.5 Simple OO approach part 3
  static async update(id, name, age) {
    const result = await db.query(`
    UPDATE cats SET name=$1, age=$2
    WHERE id=$3
    RETURNING id, name, age`,
    [name, age, id])
    if (result.rows.length === 0) throw new ExpressError("Cat not found", 404)
    return result.rows[0]
  };

  static async makeOlder(id) {
    const result = await db.query(`
    UPDATE cats SET age=age+1
    WHERE id=$1
    RETURNING id, name, age`,
    [id])
    if (result.rows.length === 0) throw new ExpressError("Cat not found", 404)
    return result.rows[0]
  };

};

module.exports = Cat;