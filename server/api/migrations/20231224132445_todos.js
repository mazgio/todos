/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable('todos', table => {
    table.increments('id').primary();
    table.string('name').defaultTo('');
    table.boolean('done').defaultTo(false);
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  await knex.schema.dropTable('todos');
};
