function FormAvistamento({ modeEdit, cadastrarAvistamento, fecharModal, formAvistamento, setFormAvistamento }) {
  return (
    <form className="form" onSubmit={cadastrarAvistamento}>
      <div className="modal-header">
        <h2>{modeEdit ? "Editar" : "Cadastrar"} Cadastrar avistamento</h2>
        <button
          aria-label="Fechar modal"
          className="modal-close"
          onClick={fecharModal}
          type="button"
        >
          X
        </button>
      </div>

      <label>
        Titulo
        <input
          name="titulo"
          minLength="2"
          onChange={(event) =>
            setFormAvistamento({ ...formAvistamento, titulo: event.target.value })
          }
          required
          type="text"
          value={formAvistamento.titulo}
        />
      </label>

      <label>
        Local
        <input
          name="local"
          minLength="2"
          onChange={(event) =>
            setFormAvistamento({ ...formAvistamento, local: event.target.value })
          }
          required
          type="text"
          value={formAvistamento.local}
        />
      </label>

      <label>
        Descrição
        <input
          name="descricao"
          minLength="3"
          onChange={(event) =>
            setFormAvistamento({ ...formAvistamento, descricao: event.target.value })
          }
          required
          type="text"
          value={formAvistamento.descricao}
        />
      </label>

      <label>
        Data
        <input

          name="data"
          onChange={(event) =>
            setFormAvistamento({
              ...formAvistamento,
              data: (event.target.value),
            })
          }
          required
          type="date"
          value={formAvistamento.data}
        />
      </label>

      <label>
        Nivel de Medo
        <input
          max="10"
          min="1"
          name="nivelMedo"
          onChange={(event) =>
            setFormAvistamento({
              ...formAvistamento,
              nivelMedo: Number(event.target.value),
            })
          }
          required
          type="number"
          value={formAvistamento.nivelMedo}
        />
      </label>

      <div className="form-actions">
        <button type="submit">{modeEdit ? "Editar" : "Cadastrar"}Cadastrar Avistamento</button>
        <button className="button-secondary" onClick={fecharModal} type="button">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormAvistamento;