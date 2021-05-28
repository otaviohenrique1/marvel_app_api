import Usuario from "../entity/Usuario";

export default {
  render(usuario: Usuario) {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    };
  },
};