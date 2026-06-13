import { useEffect, useState } from "react";
import FormPlaneta from "../components/FormPlaneta";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const url = "/planetas";

function Planetas() {
  const { nomeUsuario } = useAuth();
  const [modeEdit, setModeEdit] = useState(false);
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [formPlaneta, setFormPlaneta] = useState({
    nome: "",
    galaxia: "",
    clima: "",
    habitavel: false,
    descricao: "",
  });

  function limparFormulario() {
    setFormPlaneta({
      nome: "",
      galaxia: "",
      clima: "",
      habitavel: false,
      descricao: "",
    });
  }

  function fecharModal() {
    setModalAberto(false);
    setModeEdit(false);
    limparFormulario();
  }

  function abrirModalCadastro() {
    setMensagem("");
    setModeEdit(false);
    limparFormulario();
    setModalAberto(true);
  }

  async function buscarPlanetas() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setPlanetas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar planetas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletarPlaneta(id) {
    try {
      setMensagem("");
      await api.delete(`${url}/${id}`);
      setPlanetas((listaAtual) => listaAtual.filter((planeta) => planeta.id !== id));
      setMensagem("Planeta excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir planeta:", error);
      setMensagem("Erro ao excluir planeta");
    }
  }

  function abrirModalEdicao(planeta) {
    setMensagem("");
    setModeEdit(true);
    setFormPlaneta({
      id: planeta.id,
      nome: planeta.nome ?? "",
      galaxia: planeta.galaxia ?? "",
      clima: planeta.clima ?? "",
      habitavel: planeta.habitavel ?? false,
      descricao: planeta.descricao ?? "",
    });
    setModalAberto(true);
  }

  async function cadastrarPlaneta(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.post(url, formPlaneta);
      setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
      setMensagem("Planeta cadastrado com sucesso!");
      limparFormulario();
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao cadastrar planeta:", error);
      setMensagem("Erro ao cadastrar planeta.");
    }
  }

  async function editarPlaneta(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.put(`${url}/${formPlaneta.id}`, formPlaneta);
      const planetaAtualizado = resposta.data ?? formPlaneta;

      setPlanetas((listaAtual) =>
        listaAtual.map((planeta) =>
          planeta.id === formPlaneta.id ? { ...planeta, ...planetaAtualizado } : planeta
        )
      );

      setMensagem("Planeta editado com sucesso!");
      limparFormulario();
      setModeEdit(false);
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao editar planeta:", error);
      setMensagem("Erro ao editar planeta.");
    }
  }

  useEffect(() => {
    buscarPlanetas();
  }, []);

  return (
    <section>
      <h1>Planetas</h1>
      {nomeUsuario && <p className="usuario-logado">Olá, {nomeUsuario}</p>}

      <button
        className="open-modal-button"
        onClick={abrirModalCadastro}
        type="button"
      >
        Cadastrar Planeta
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormPlaneta
              modeEdit={modeEdit}
              cadastrarPlaneta={modeEdit ? editarPlaneta : cadastrarPlaneta}
              fecharModal={fecharModal}
              formPlaneta={formPlaneta}
              setFormPlaneta={setFormPlaneta}
            />
          </div>
        </div>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {loading ? (
        <p>Carregando planetas...</p>
      ) : (
        <div className="list">
          {planetas.map((planeta) => (
            <article className="card" key={planeta.id}>
              <h3>
                {planeta?.nome === "string"
                  ? "Nome não disponível"
                  : planeta?.nome}
              </h3>
              <p>
                <strong>Galáxia:</strong> {planeta?.galaxia}
              </p>
              <p>
                <strong>Clima:</strong> {planeta?.clima}
              </p>
              <p>
                <strong>Habitável:</strong> {String(planeta.habitavel)}
              </p>
              <p>
                <strong>Descrição:</strong> {planeta?.descricao}
              </p>
              <div className="card-actions">
                <button onClick={() => deletarPlaneta(planeta.id)} className="button-excluir">Excluir</button>

                <button onClick={() => abrirModalEdicao(planeta)} className="button-secondary">Editar</button>
              </div>

            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Planetas;