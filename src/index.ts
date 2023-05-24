import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { UserController } from "./controllers/user.controller";
import { User } from "./models/user";

const app = express();
app.use(express.json());
const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("recebeu e passou");
  next();
};
//Rota de usuários
//listar usuários
app.get("/users", [middleware], new UserController().getAllUsers);

// listar por id
app.get("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = users.find((user) => user.id === id);

    if (!result) {
      return res.status(404).send({
        ok: false,
        message: "User was not found",
      });
    }

    return res.status(200).send({
      ok: true,
      message: "users was sucessfully obtained",
      data: result.toJson(),
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
});

// criar usuario
app.post("/users", [middleware], new UserController().crateUser);

app.listen(3333, () => {
  console.log("API is running");
});
