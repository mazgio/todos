exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('todos').del();
  await knex('todos').insert([
    {
      name: null,
      done: false
    }
  ]);
};
