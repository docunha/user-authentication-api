import db from "../db";
import DatabaseError from "../models/errors/database.error.model";
import User from "../models/user.model";



class UserRepository {
  //Lista todos users
  async findAllUsers(): Promise<User[]> {
    const query = `
        SELECT uuid, username
        FROM application_user
    `;
    const { rows } = await db.query<User>(query);
    return rows || [];
  }
  //Busca por ID
  async findById(uuid: string): Promise<User> {
    try {
      const query = `
          SELECT uuid, username
          FROM application_user
          WHERE uuid = $1
      `;
      const values = [uuid];
      
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user;
      
    } catch (error) {
      throw new DatabaseError('Erro na consulta por ID', error);
    }
  }
  //Cria novo usuário
  async create (user: User): Promise<string> {
    const query = `
    INSERT INTO application_user (
        username,
        password
    )
    VALUES ($1, crypt($2, 'my_salt'))
    RETURNING uuid
    `;
    const values = [user.username, user.password];
    const { rows } = await db.query<{ uuid: string }>(query, values);
    const [newUser] = rows;
    return newUser.uuid;
  }
  //Atualiza usuário
  async update (user: User): Promise<void> {
    const query = `
    UPDATE application_user 
    SET 
        username = $1,
        password = crypt($2, 'my_salt')
    WHERE uuid = $3
    `;
    const values = [user.username, user.password, user.uuid];
    await db.query(query, values);
  }
  //Deleta usuário
  async remove( uuid:string ):Promise<void>{
      const cript = `
          DELETE
          FROM application_user
          WHERE uuid = $1
      `;
      const values = [uuid];
      await db.query(cript, values);

  }
  //Verifica se usuário e senha casam
  async findByUsernameAndPassword(username: string, password: string){
    try {
      const query = `
          SELECT uuid, username
          FROM application_user
          WHERE username = $1
          AND password = crypt($2, 'my_salt')
      `;
      const values = [username, password];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError('Erro na consulta por username e password', error);
    }
  }


}

export default new UserRepository();