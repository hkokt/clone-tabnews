import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query('SHOW server_version;')
    .then(rs => rs.rows[0].server_version);

  const dbMaxConn = await database.query('show max_connections;')
    .then(rs => rs.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;

  const dbNumConnections = await database.query({
    text: "select count(*)::int from pg_stat_activity where datname =$1;",
    values: [databaseName]
  })
    .then(rs => rs.rows[0].count);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: parseInt(dbMaxConn),
        opened_connections: dbNumConnections
      }
    }
  });
}

export default status;
