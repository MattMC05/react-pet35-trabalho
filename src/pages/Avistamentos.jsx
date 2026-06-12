import { useEffect, useState } from "react";
import FormAvistamento from "../components/FormAvistamentos";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const url = "/avistamentos";

function Avistamentos() {
  const [modeEdit, setModeEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { nomeUsuario } = useAuth();
  const [avistamentos, setAvistamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [formAvistamento, setFormAvistamento] = useState({
    titulo: "",
    local: "",
    descricao: "",
    data: "",
    nivelMedo: 1,
  });

  function limparFormulario() {
    setFormAvistamento({
      titulo: "",
      local: "",
      descricao: "",
      data: "",
      nivelMedo: 1,
    });
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  async function buscarAvistamentosComAxios() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setAvistamentos(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar avistamentos com axios:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletarAvistamento(id) {
    try {
      setMensagem("");
      await api.delete(`${url}/${id}`);
      setAvistamentos((listaAtual) => listaAtual.filter((avistamento) => avistamento.id !== id));
      setMensagem("Avistamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir avistamento:", error);
      setMensagem("Erro ao excluir avistamento.");
    }
  };

  function abrirModalEdicao(avistamento) {
    setMensagem("");
    setModeEdit(true);
    setFormAvistamento({
      id: avistamento.id,
      titulo: avistamento.titulo ?? "",
      local: avistamento.local ?? "",
      descricao: avistamento.descricao ?? "",
      data: avistamento.data ?? "",
      nivelMedo: avistamento.nivelMedo ?? 1,
    });
    setModalAberto(true);
  }

  async function cadastrarAvistamento(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.post(url, formAvistamento);
      setAvistamentos((listaAtual) => [...listaAtual, resposta.data]);
      limparFormulario();
      setModalAberto(false);
      setMensagem("Avistamento cadastrado com sucesso!");

    } catch (error) {
      console.error("Erro ao cadastrar avistamento:", error);
      setMensagem("Erro ao cadastrar avistamento.");
    }
  }

  async function editarAvistamento(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.put(`${url}/${formAvistamento.id}`, formAvistamento);
      const avistamentoAtualizado = resposta.data ?? formAvistamento;

      setAvistamentos((listaAtual) =>
        listaAtual.map((avistamento) =>
          avistamento.id === formAvistamento.id ? { ...avistamento, ...avistamentoAtualizado } : avistamento
        )
      );

      setMensagem("Avistamento editado com sucesso!");
      limparFormulario();
      setModeEdit(false);
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao editar avistamento:", error);
      setMensagem("Erro ao editar avistamento.");
    }
  }

  useEffect(() => {
    buscarAvistamentosComAxios();
  }, []);

  return (
    <section>
      <h1>Avistamentos</h1>
      {nomeUsuario && <p className="usuario-logado">Olá, {nomeUsuario}</p>}

      <button
        className="open-modal-button"
        onClick={() => setModalAberto(true)}
        type="button"
      >
        Cadastrar avistamento
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormAvistamento
              modeEdit={modeEdit}
              cadastrarAvistamento={modeEdit ? editarAvistamento : cadastrarAvistamento}
              fecharModal={fecharModal}
              formAvistamento={formAvistamento}
              setFormAvistamento={setFormAvistamento}
            />
          </div>
        </div>
      )}


      {mensagem && <p className="mensagem">{mensagem}</p>}
      {loading ? (
        <p>Carregando avistamentos...</p>
      ) : (
        <div className="list">
          {avistamentos.map((avistamento) => (
            <article className="card" key={avistamento.id}>
              <h3>
                {avistamento?.nome === "string" ? "Nome não disponível" : avistamento?.nome}
              </h3>
              <p>
                <strong>Titulo:</strong> {avistamento?.titulo}
              </p>
              <p>
                <strong>Local:</strong> {avistamento?.local}
              </p>
              <p>
                <strong>Descrição:</strong> {avistamento?.descricao}
              </p>
              <p>
                <strong>Data:</strong> {avistamento?.data}
              </p>
              <p>
                <strong>Nivel de Medo:</strong> {avistamento?.nivelMedo}
              </p>
              <div className="card-actions">
                <button onClick={() => deletarAvistamento(avistamento.id)} className="button-excluir">Excluir</button>

                <button onClick={() => abrirModalEdicao(avistamento)} className="button-secondary">Editar</button>
              </div>
            </article>
          ))}
        </div>)}
    </section>
  );
}

export default Avistamentos;	