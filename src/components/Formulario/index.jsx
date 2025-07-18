import { useEffect, useState } from "react";

const Formulario = () => {
    let [materiaA, setMAteriaA] = useState(0);
    let [materiaB, setMAteriaB] = useState(0);
    let [materiaC, setMAteriaC] = useState(0);
    let [nome,setNome] = useState ('');

    useEffect(() => {
        console.log("o comportamento iniciou");

        return () => {
            console.log("o comportamento finalizou")

        }
    }, []);

    useEffect(() => {
        console.log("o estado nome mudou");
    }, [nome]);
    
    useEffect(() => {
        console.log("a materia A mudou para : " + materiaA);
    }, [materiaA, materiaB, materiaC]);


    const alteraNome = (evento) => {
        // console.log(evento.target.value)
        // setNome(evento.target.value);
        setNome(estadoAnterior => {
            console.log(estadoAnterior);

            // estadoAnterior = valorNovo

            return evento.target.value;
        })
    }

    const renderizaResultado = () => {
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;

        console.log(soma);
        console.log(media);

        if (media >= 7) {
            return <p>Olá {nome}, você foi aprovado</p>;
        } else {
            return <p>Olá {nome}, você não foi aprovado</p>; 
        }
    };

    return (
        <form>
            <ul>
                {[1,2,3,4,5].map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>


            <input type="text" placeholder="Seu nome" onChange={alteraNome} />
            <input type="number" placeholder="Nota matéria A" onChange={({target}) => setMAteriaA(parseInt(target.value))}  />
            <input type="number" placeholder="Nota matéria B" onChange={evento => setMAteriaB(parseInt(evento.target.value))}  />
            <input type="number" placeholder="Nota matéria C" onChange={evento => setMAteriaC(parseInt(evento.target.value))}  />
            {renderizaResultado()}
        </form>
    );
};

export default Formulario;
