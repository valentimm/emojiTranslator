import * as Popover from '@radix-ui/react-popover';
import { ClipboardText } from 'phosphor-react';
import { useState } from 'react';
import './App.css';
import logo from '/logo.svg';


interface SubstituicaoCaracteres {
  texto: string;
  substituicoes: { [key: string]: string };
}

function substituirCaracteres({ texto, substituicoes }: SubstituicaoCaracteres): string {
  let textoModificado = texto;
  for (const caractereAntigo in substituicoes) {
    const caractereNovo = substituicoes[caractereAntigo];
    const regex = new RegExp(escapeRegExp(caractereAntigo), 'g');
    textoModificado = textoModificado.replace(regex, caractereNovo);
  }
  return textoModificado;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function copyText (){
  const text = document.querySelector('#textResponse p')?.textContent;
  if(text){
    navigator.clipboard.writeText(text);
  }
}

function copyTextDiv(){
  const text = document.querySelector('#textResponse p')?.textContent;
  if(text){
    navigator.clipboard.writeText(text);
  }
  
}

export default function Home() {
  const [textoOriginal, setTextoOriginal] = useState('');
  const [textoModificado, setTextoModificado] = useState('');
  const [substituicoes] = useState<{ [key: string]: string }>({
    A: '🅰️',
    a: '🅰️',
    B: '🅱️',
    b: '🅱️',
    C: '☪️',
    c: '☪️',
    D: '▶️',
    d: '▶️',
    E: '📧',
    e: '📧',
    F: '🎏',
    f: '🎏',
    G: '♌️',
    g: '♌️',
    H: '🏨',
    h: '🏨',
    I: 'ℹ️',
    i: 'ℹ️',
    J: '🗾',
    j: '🗾',
    K: '🎋',
    k: '🎋',
    L: '🛴',
    l: '🛴',
    M: '♏️',
    m: '♏️',
    N: '♑️',
    n: '♑️',
    O: '🍩',
    o: '🍩',
    P: '🅿️',
    p: '🅿️',
    Q: '♉️',
    q: '♉️',
    R: '®️',
    r: '®️',
    S: '💰',
    s: '💰',
    T: '🌴',
    t: '🌴',
    U: '⛎',
    u: '⛎',
    V: '✔️',
    v: '✔️',
    W: '〰️',
    w: '〰️',
    X: '⚔️',
    x: '⚔️',
    Y: '🕎',
    y: '🕎',
    Z: '💤',
    z: '💤',
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    '!': '❗️',
    '?': '❓',
    '#': '#️⃣',
    '*': '*️⃣',
    '+': '➕',
    '-': '➖',
    '.': '⏺️',
    

  });

  const substituirTexto = () => {
    const substituicao: SubstituicaoCaracteres = {
      texto: textoOriginal,
      substituicoes,
    };

    const resultado = substituirCaracteres(substituicao);
    setTextoModificado(resultado);
  };

  return (
  <Popover.Root>
  <main>
    <div className='logo'>
      <img src={logo} />
    </div>  

    <h3>Substitua as letras do seu texto por emojis</h3>
    <div className="content">
      <div id="textUser">
        <textarea
          value={textoOriginal}
          onChange={(e) => setTextoOriginal(e.target.value)}
          placeholder='Digite o texto aqui'
        />
      </div>
      <button onClick={substituirTexto}>Traduzir</button>
      <div id="textResponse" onClick={copyTextDiv}>
        <p>{textoModificado}</p>
        <Popover.Trigger onClick={copyText} className='PopoverTrigger'>
          <div>
            <ClipboardText size={16} color="#ffffff" weight="fill" />
          </div>
        </Popover.Trigger>
        <Popover.Portal>
        <Popover.Content className='PopoverContent'>
          Texto copiado!
        <Popover.Arrow className='PopoverArrow' />
        </Popover.Content>
        </Popover.Portal>
      </div>
    </div>
  </main>
  </Popover.Root>
  )
}