import {Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import  JWT  from "jsonwebtoken";
import userRepository from "../repositories/user.repository";

const jwtAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
          throw new ForbiddenError('Credentials not found' );
      }

      const [authorizationType, jwtToken] = authorizationHeader.split(' ');

      if (authorizationType !== 'Bearer') {
          throw new ForbiddenError('Invalid authorization type' );
      }

      if (!jwtToken) {
          throw new ForbiddenError('Invalid token' );
      }

      try {
          const tokenPayload = JWT.verify(jwtToken, 'my_secret_key');
          if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
              throw new ForbiddenError('Invalid token' );
          }

          //const user = await userRepository.findById(tokenPayload.sub);
          const user = { uuid: tokenPayload.sub, username: tokenPayload.username }
          req.user = user;
          return next();
      } catch (error) {
          throw new ForbiddenError('Invalid token' );
      }
  } catch (error) {
      return next(error);
  }
}

export default jwtAuthenticationMiddleware;