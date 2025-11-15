/**
 * Creates pgcrypto extension (for gen_random_uuid),
 * roles, branches, users tables.
 */
exports.up = async function (knex) {
    // create extension for gen_random_uuid
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    // roles table
    await knex.schema.createTable('roles', (table) => {
        table.uuid('roleId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('role', 100).notNullable().unique();
        table.text('description');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

    // branches table
    await knex.schema.createTable('branches', (table) => {
        table.uuid('branchId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name', 255).notNullable();
        table.text('address');
        table.string('city', 255);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

    // users table
    await knex.schema.createTable('users', (table) => {
        table.uuid('userId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable().unique();
        table.text('password').notNullable();

        table.uuid('roleId').notNullable()
            .references('roleId').inTable('roles')
            .onUpdate('CASCADE').onDelete('RESTRICT');

        table.uuid('branchId').notNullable()
            .references('branchId').inTable('branches')
            .onUpdate('CASCADE').onDelete('CASCADE');

        table.boolean('isActive').defaultTo(true);
        table.timestamp('deletedAt').nullable();

        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

    // optional: seed a couple of roles
    await knex('roles').insert([
        { role: 'superadmin', description: 'Super administrator' },
        { role: 'admin', description: 'Branch admin' },
        { role: 'staff', description: 'Staff' }
    ]);
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('branches');
    await knex.schema.dropTableIfExists('roles');
    await knex.raw('DROP EXTENSION IF EXISTS "pgcrypto";');
};
