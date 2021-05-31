import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Usuario from "../entity/Usuario";
import usuarioView from "../views/usuario_view";

export default {
  async login(request: Request, response: Response) {
    const { username, password } = request.body;
    let existingUser;
    const usuarioRepository = getRepository(Usuario);
    try {
      existingUser = await usuarioRepository.findOne({ email: username });
    } catch (error) {
      const mensagemErro = "Login falhou, tente novamente mais tarde";
      return response.status(500).json({ message: mensagemErro });
    }
    if (!existingUser || existingUser.senha !== password) {
      const mensagemErro = "Dados invalidos";
      return response.status(401).json({ message: mensagemErro });
    }
    return response.status(200).json({ message: "Logado com sucesso!" });
  },

  // async login2 (req: Request, res: Response, next) {
  //   const { email, password } = req.body;
  //   let existingUser;
  //   try {
  //     existingUser = await User.findOne({ email: email });
  //   } catch (err) {
  //     const error = new HttpError("Login failed, please try again later.", 500);
  //     return next(error);
  //   }
  //   if (!existingUser || existingUser.password !== password) {
  //     const error = new HttpError("Invalid credentials, login failed.", 401);
  //     return next(error);
  //   }
  //   res.json({ message: "Logged in!" });
  // },

  async index(request: Request, response: Response) {
    const usuarioRepository = getRepository(Usuario);
    const usuarios = await usuarioRepository.find();
    return response.json(usuarios);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOneOrFail(id);
    return response.json(usuarioView.render(usuario));
  },
  async create(request: Request, response: Response) {
    const { nome, email, senha } = request.body;
    const usuarioRepository = getRepository(Usuario);
    const data = { nome, email, senha };
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required(),
      senha: Yup.string().required()
    });
    await schema.validate(data, {
      abortEarly: false
    });
    const usuario = usuarioRepository.create(data);
    await usuarioRepository.save(usuario);
    return response.status(201).json(usuario);
  },
  async update(request: Request, response: Response) {
    const { id, nome, email, senha } = request.body;
    const usuarioRepository = getRepository(Usuario);
    const data = { nome, email, senha };
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required(),
      senha: Yup.string().required()
    });
    await schema.validate(data, {
      abortEarly: false
    });
    const usuario = await usuarioRepository.update(id, data);
    // const usuario = await usuarioRepository.save({ id, data });
    return response.status(201).json(usuario);
  },
};