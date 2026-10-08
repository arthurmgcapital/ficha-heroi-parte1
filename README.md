# Ficha de Herói: Syx

Projeto Prático Parte 1 (HTML e CSS). A ideia é apresentar um personagem de RPG em formato de página web, como se fosse a tela de status de um jogo.

## O personagem

Syx é um grafiteiro hacker de nível 16 que vive em Nova Aurora, uma cidade cyberpunk onde os prédios furam as nuvens e os letreiros nunca apagam. De dia é só mais um garoto de fone no pescoço. De noite corre pelos telhados e deixa sua marca nos muros mais altos da cidade.

Visual: jovem negro, cabelo cacheado meio longo, fone neon, camiseta preta com a logo SYX, calça cargo e tênis Jordan vermelho e preto.

## Como abrir

1. Extraia o arquivo `.zip` ou baixe o repositório pelo GitHub (botão Code e depois Download ZIP).
2. Abra o `index.html` no navegador.
3. Para ver as animações de rolagem use Chrome, Edge ou Brave atualizados. Em navegadores sem suporte a página funciona normal, só sem a animação.
4. É preciso internet para carregar a fonte Chakra Petch (Google Fonts) e os ícones (Font Awesome).

## Estrutura de pastas

```
ficha-heroi-parte1/
├── index.html
├── style.css
├── README.md
├── imagens/
│   ├── syx.webp
│   ├── syx-giro.webp
│   ├── conquista-telhados.svg
│   ├── conquista-torre.svg
│   ├── logo-syx.svg
│   └── cidade.webp
└── fontes/
    └── far-from-homecoming.otf
```

## Protótipo

Protótipo feito com Bootstrap: https://arthurmgcapital.github.io/ficha-heroi-prototipo/

## O que foi aplicado

- HTML semântico com `header`, `nav`, `main`, `section`, `article` e `footer`.
- CSS em arquivo externo, organizado em blocos comentados por seção.
- Paleta Jordan Bred (preto, vermelho, branco e dourado) em variáveis no `:root`.
- Flexbox no menu e Grid no inventário, com 1 coluna no celular, 2 no tablet e 3 no desktop.
- Barras de atributo feitas com uma `div` e `width` em porcentagem.
- `transition` nos botões, links do menu e cards do inventário.
- Pseudo-elementos `::before` na estrela do item lendário e na ponta das setas.
- Fundo da cidade com `filter: blur` para dar foco no personagem.
- Animações ligadas à rolagem feitas só com CSS (`animation-timeline`): o personagem vira de costas para frente quadro a quadro (imagem com 5 vistas e `steps()`), as setas com as características aparecem, as barras enchem e os itens recebem zoom.
- Imagens em WebP para a página ficar leve e a rolagem não travar.

## Decisões de UI/UX

- **Hierarquia visual:** a primeira coisa que aparece é o avatar e o nome SYX em tamanho grande, com o efeito de cor deslocada. Depois vêm a classe, a bio e por último as seções de atributos e itens, com títulos menores.
- **Contraste:** as cores foram testadas no padrão WCAG AA. O texto claro (#E6E6E6) sobre o fundo escuro passa de 15:1 e o vermelho (#E8394F) foi clareado até chegar em 4,7:1. A imagem da cidade tem uma camada escura por cima e os cards têm fundo escuro próprio, para o texto não brigar com o fundo.
- **Consistência:** todos os cards do inventário têm a mesma borda, o mesmo raio e o mesmo espaçamento. Todas as barras de atributo usam a mesma altura e o mesmo degradê.
- **Affordance e feedback:** botões e links do menu mudam de cor no hover e no foco do teclado, e os botões crescem um pouco para mostrar que são clicáveis. Os cards do inventário só ganham destaque ao passar o mouse, para chamar atenção para o item.
- **Área de toque (Lei de Fitts):** os botões de contato têm no mínimo 48px de altura e os links do menu têm padding grande para facilitar o toque no celular.
- **Proximidade (Gestalt):** ícone, nome, valor e barra de cada atributo ficam juntos no mesmo bloco, separados dos outros atributos.
- **Fluxo de leitura:** a página segue de cima para baixo, da apresentação do herói até o contato com a guilda, na mesma ordem do menu.

## Créditos

- Fonte dos títulos: Far From Homecoming (maisfontes). A logo SYX do ícone da aba foi feita com ela.
- Fonte do texto: Chakra Petch (Google Fonts).
- Ícones: Font Awesome.
- Imagens do personagem geradas com IA (ChatGPT) a partir da descrição do Syx feita para este projeto.
- Fundo da cidade desenhado em SVG para este projeto e convertido para WebP.
- Ilustrações das conquistas desenhadas em SVG para este projeto.
