# Batalha Naval - Jogo Web

Aplicação web interativa desenvolvida como Atividade Prática da disciplina **GAC116 - Programação Web** na Universidade Federal de Lavras (UFLA).

🔗 **Link do Jogo Online (GitHub Pages):** [https://github.com/diovaniMangiajr/atividade-prog-web-batalha-naval](https://github.com/diovaniMangiajr/atividade-prog-web-batalha-naval)

---

## Metadados do Projeto

```json
{
  "nome": "Batalha Naval",
  "descricao": "Jogo clássico de Batalha Naval contra o computador com grid 10x10, frota naval completa, cálculo dinâmico de disparos e histórico de placar.",
  "autores": "Diovani da Cruz Mangia Maciel Junior",
  "turma": "10A"
}
```

---

## Objetivo do Jogo
O objetivo do jogador é localizar e destruir todas as cinco embarcações da frota inimiga controlada pelo computador antes que a máquina afunde sua própria armada.

---

## Regras do Jogo
1. O jogo ocorre em duas grades 10x10 (100 coordenadas cada): **Sua Frota** e **Radar Inimigo**.
2. Cada participante conta com 5 embarcações clássicas da marinha (17 células no total):
    - Porta-aviões (5 células)
    - Encouraçado (4 células)
    - Cruzador (3 células)
    - Submarino (3 células)
    - Contratorpedeiro (2 células)
3. Os navios são distribuídos de forma oculta e aleatória no tabuleiro adversário.
4. A cada turno, o jogador clica em uma coordenada do radar:
    - Se acertar: a célula exibe uma explosão (💥) e marca dano.
    - Se errar: a célula exibe ondas de água (🌊).
5. Imediatamente após o turno do jogador, o computador dispara de forma automática contra o tabuleiro da frota aliada sem repetir coordenadas.
6. A partida termina quando uma das frotas tiver suas 17 células completamente destruídas.

---

## Tecnologias Utilizadas
- **HTML5:** Estruturação semântica da página (`<header>`, `<main>`, `<section>`, `<footer>`).
- **CSS3:** Folha de estilos personalizada e layout de matriz via CSS Grid.
- **Bootstrap 5 (CSS via CDN):** Componentização responsiva, cartões e paleta de status.
- **JavaScript (Puro):** Lógica de posicionamento, inteligência dos disparos e manipulação do DOM.

---

## Execução Local
Para testar a aplicação localmente:

1. Clone o repositório:
    ```
    git clone https://github.com/diovaniMangiajr/atividade-prog-web-batalha-naval
    ```
2. Acesse a pasta do projeto 
    ```
    atividade-prog-web-batalha-naval
    ```
3. Abra o arquivo index.html em qualquer navegador web moderno ou inicie um servidor local:
    ```
    python3 -m http.server 8000
    ```

---

## Licença
Este projeto está licensiado sob a licença MIT - consulte o arquivo LICENSE para detalhes.