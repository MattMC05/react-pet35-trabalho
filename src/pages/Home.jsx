import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [avistamentos, setAvistamentos] = useState([]);
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(false);

  async function buscarUltimosAvistamentos() {
    try {
      setLoading(true);

      const resposta = await api.get("/avistamentos");
      const ultimos = resposta.data.slice(-9).reverse();

      setAvistamentos(ultimos);
    } catch (error) {
      console.error("Erro ao buscar avistamentos", error);
    } finally {
      setLoading(false);
    }
  }

  async function listarAliens(){
    try{
      setLoading(true);

      const resposta = await api.get("/aliens");
      const EspeciesAliens = resposta.data.slice(-3).reverse();

      setAliens(EspeciesAliens);
    } catch(error){
      console.error("Erro ao buscar Aliens",error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarUltimosAvistamentos();
  }, []);
    useEffect(() => {
    listarAliens();
  }, []);

  return (
    <main>
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <span className="text-8xl animate-bounce">🛸</span>

        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-yellow-400">
            Bem vindo ao Diário de Avistamentos!
          </h1>

          <p className="mt-2 text-white">
            O maior banco de dados de avistamentos extraterrestres.
          </p>
        </div>

        <span className="mt-4 text-6xl text-yellow-400 animate-bounce">
          ↓
        </span>
      </section>

      <section className="flex flex-col items-center px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-5xl animate-bounce">🔍</span>

          <h1 className="text-4xl text-yellow-400">
            Últimos Avistamentos
          </h1>
        </div>

        {loading ? (
          <p className="animate-pulse text-yellow-400">
            Carregando últimos avistamentos...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {avistamentos.map((avistamento) => (
              <article
                className="card w-80 rounded-lg p-4 shadow-lg transition-transform hover:scale-105"
                key={avistamento.id}
              >
                <h3>{avistamento.titulo}</h3>

                <p>
                  <strong>Local:</strong> {avistamento.local}
                </p>

                <p>
                  <strong>Descrição:</strong> {avistamento.descricao}
                </p>

                <p>
                  <strong>Data:</strong> {avistamento.data}
                </p>

                <p>
                  <strong>Nível de Medo:</strong> {avistamento.nivelMedo}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="h-32"></div>

      <section className="flex flex-col items-center px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-5xl animate-bounce">👽</span>

          <h1 className="text-4xl text-yellow-400">
            Espécies Catalogadas
          </h1>
        </div>

        {loading ? (
          <p className="animate-pulse text-yellow-400">
            Carregando Espécies...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {aliens.map((alien) => (
              <article
                className="card w-80 rounded-lg p-4 shadow-lg transition-transform hover:scale-105"
                key={alien.id}
              >
                <h3>{alien.nome}</h3>

                <p>
                  <strong>Espécie:</strong> {alien.especie}
                </p>

                <p>
                  <strong>Planeta:</strong> {alien.planeta}
                </p>

                <p>
                  <strong>Periculosidade:</strong> {alien.periculosidade}
                </p>

                <p>
                  <strong>Descrição:</strong> {alien.descricao}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}


export default Home;