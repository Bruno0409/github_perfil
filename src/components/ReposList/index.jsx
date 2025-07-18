import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        setEstaCarregando(true);
        setErro(null);
        setRepos([]); 

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Usuário "${nomeUsuario}" não encontrado (status ${res.status})`);
                }
                return res.json();
            })
            .then(resJson => {
                if (!Array.isArray(resJson)) {
                    throw new Error("Resposta inesperada da API");
                }
                setTimeout(() => {
                    setRepos(resJson);
                    setEstaCarregando(false);
                }, 2000); 
            })
            .catch(error => {
                setErro(error.message);
                console.error("Erro ao buscar repositórios:", error);
                setEstaCarregando(false);
            });
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando && <h1>Carregando...</h1>}

            {erro && <p style={{ color: 'red' }}>⚠️ {erro}</p>}

            {!estaCarregando && !erro && repos.length === 0 && (
                <p>Nenhum repositório encontrado para <b>{nomeUsuario}</b>.</p>
            )}

            {!estaCarregando && !erro && repos.length > 0 && (
                <ul className={styles.list}>
                    {repos.map(repositorio => (
                        <li className={styles.listItem} key={repositorio.id}>
                            <div className={styles.itemName}>
                                <b>Nome:</b> {repositorio.name}<br />
                            </div>
                            <div className={styles.itemLenguage}>
                                <b>Linguagem:</b> {repositorio.language || "Não informado"}<br />
                            </div>
                            <a
                                className={styles.itemLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={repositorio.html_url}
                            >
                                Visitar no Github
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReposList;
