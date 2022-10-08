import * as mysql from 'mysql';
import { Injectable } from '@nestjs/common';
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { ReqResponse } from 'src/Domain/Models/ReqResponse';

@Injectable()
export class MysqlGateway implements IMysqlGateway {
  public async getQueryAsync(query: string) {
    return await new Promise(async function (resolve, reject) {
      const connection = mysql.createConnection({
        host: process.env.MySql_HOST,
        user: process.env.MySql_USER,
        password: process.env.MySql_PASSWORD,
        database: process.env.MySql_DATABASE,
        multipleStatements: true,
      });

      try {
        connection.connect();
      } catch (error) {
        console.error(
          `Nao foi possivel se conectar ao BD. Error: ${JSON.stringify(error)}`,
        );
        return resolve(new ReqResponse('error', error));
      }

      await connection.query(query, function (error, results, fields) {
        if (error) {
          console.error(
            `Nao foi possivel executar a query informada. Query: ${query}. Error: ${JSON.stringify(
              error,
            )}`,
          );
          return resolve(new ReqResponse('error', error));
        }
        resolve(new ReqResponse('success', results));
      });
      connection.end();
    });
  }
}
