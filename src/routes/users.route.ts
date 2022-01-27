import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes"
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import userRepository from "../repositories/user.repository";




const usersRoute = Router();

//get /users
usersRoute.get('/users', jwtAuthenticationMiddleware,  async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) =>{

  const users = await userRepository.findAllUsers();
  res.status(StatusCodes.OK).send(users);
});

//get /users/:uuid
usersRoute.get('/users/:uuid', jwtAuthenticationMiddleware, async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid)
    res.status(StatusCodes.OK).send({user});
  } catch (error) {
    next(error);  
  }
})

//post /users
usersRoute.post('/users', async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
  const newUser = req.body;
  const uuid = await userRepository.create(newUser);
  res.status(StatusCodes.CREATED).send( {uuid} )
})

//put /users/:uuid
usersRoute.put('/users/:uuid', jwtAuthenticationMiddleware, async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const modifiedUser = req.body;
  modifiedUser.uuid = uuid;

  await userRepository.update(modifiedUser)
  res.status(StatusCodes.OK).send( {modifiedUser} )
})

//delete //users/:uuid
usersRoute.delete('/users/:uuid', jwtAuthenticationMiddleware, async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  await userRepository.remove(uuid)
  res.sendStatus(StatusCodes.OK)
})


export default usersRoute;