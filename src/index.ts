import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
//Configuração da Aplicação
//Interpretar content type json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Configuração de Rotas
app.use(statusRoute);
app.use(usersRoute);
//Configuração dos Handlers de erro
app.use(errorHandler);

//Inialização do servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('Aplicação rodando na porta 3000')
});