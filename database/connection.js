var knex = require("knex")({
    client: 'mysql2',
    connection:{
        host: '127.0.0.1',
        user: 'root',
        password: 'Hertz94773195',
        database: 'albertomedeiros'
    }
})

module.exports = knex