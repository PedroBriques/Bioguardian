//Lista de Usuarios
import React from "react";
import TabelaCadastro from "../Components/CadastroTabela";
import TabelaLogin from "../Components/LoginTabela";
import NavegacaoAdm from '../Components/Navegacao-adm'
const ListaUsuarios = () => {
  return (
    <>
      <div>
        <NavegacaoAdm />
        <h2>Lista de Usuários</h2>
        <h2>Cadastro</h2>
        <TabelaCadastro />

        <h2>Login</h2>
        <TabelaLogin />
      </div>
    </>
  );
};

export default ListaUsuarios;
