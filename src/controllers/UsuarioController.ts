import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Usuario from "../entity/Usuario";
import usuarioView from "../views/usuario_view";

export default {
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
    return response.status(201).json(usuario);
  },
};