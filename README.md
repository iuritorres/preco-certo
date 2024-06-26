# Extensão Preço Certo

Esse projeto é o MVP de uma extensão de navegador que fornece um recurso de cotação automática para lojas onlines, onde automaticamente identifica se o usuário está em uma página de produto e retorna uma lista de resultados em outras lojas como Shopee, Amazon, etc.

Vale destacar que até o momento a cotação só é feita na Magazine Luíza, e a identificação de produto apenas na Shopee.

## Instalação

Abra o terminal e navegue até a pasta onde o projeto será clonado.

Em seguida digite no terminal:

```batch
git clone https://github.com/iuritorres/preco-certo.git
cd preco-certo
npm install
npm build
```

Após o npm build, uma pasta `dist/` será gerada na raiz do projeto.

Vá até o gerenciador de extensões do seu navegador e ative o modo desenvolvedor.
![modo desenvolvedor](docs/modo-desenvolvedor.png)

Depois, clique na opção `Carregar sem compactação` ou a que melhor se enquadrar nessa descrição, e selecione a pasta `dist/` que foi gerada pelo npm run build.

![carregar extensão](docs/carregar-extensao.png)

![selecionar pasta dist](docs/selecionar-pasta-dist.png)

Sua extensão deve aparecer assim:

![extensão](docs/extensao.png)

## Testando a extensão

Para testar as features implementadas até o momento siga os seguintes passos:

Entre no site da [Shopee](https://shopee.com.br/), e clique em qualquer produto que desejar.

Entrei [nesse produto](https://shopee.com.br/Sapateira-Organizadora-T%C3%AAnis-Sapato-4-Andares-8-Pares-i.399802573.23397294648?publish_id=&sp_atk=39e1f8fb-068e-48d7-95d1-c3482b6ca0a0&xptdk=39e1f8fb-068e-48d7-95d1-c3482b6ca0a0&utm_content=Pre%C3%A7o_Certo-&utm_medium=affiliates&utm_source=an_18369800237) como exemplo:

![screenshot shopee](docs/screenshot-shopee.png)

Depois disso, abra o console no devtools, pressionando o botão direito do mouse e clicando em `Inspecionar Página > Console`, ou apenas apertando `F12`, ou `FN + F12` caso esteja em um notebook.

Lá você vai encontrar os dados retornados da cotação na Magazine Luíza sobre o produto que você está agora:

![dados cotação](docs/dados-cotação.png)

E se você entrar na `URL` retornada, no meu caso [essa](https://www.magazinevoce.com.br/magazineextprecocerto/sapateira-organizadora-4-andares-dobravel-porta-sapato-tenis-chinelo-para-8-pares-top-house/p/afa8fdafbf/mo/sapt/)...

![screenshot magalu](docs/screenchot-magalu.png)

Lembrando mais uma vez que no momento os recursos de identificação de páginas de produtos apenas existem na Shopee e Magazine Luíza, e a de pesquisa de produtos, apenas na Magazine Luíza, e que também, os resultados ainda são retornados diretamente pelo console, mas a ideia é que isso seja uma interface gráfica que poderá ser aberta através de um ícone flutuante que ficará dentro das páginas das lojas.
