# 📦 Criador de ícones

[![Vue.js 3](https://img.shields.io/badge/Vue.js-3-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Quasar Framework 2](https://img.shields.io/badge/Quasar-2-1976d2?logo=quasar&logoColor=white)](https://quasar.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://icons-creator.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

O **Criador de ícones** é uma ferramenta online que permite criar ícones personalizados a partir de imagens **JPEG**, **JPG** ou **PNG**, ajudando desenvolvedores e designers que precisam de ícones específicos que não estão disponíveis em bibliotecas populares como **Font Awesome** ou **Google Fonts**.

🔗 **Acesse agora:** [icons-creator.vercel.app](https://icons-creator.vercel.app/)

---

## ✨ Funcionalidades

- 📤 Upload de imagens nos formatos **JPEG**, **JPG** e **PNG**
- 🖌 Conversão rápida em ícones para uso em projetos web
- ⚡ Interface rápida e responsiva usando **Vue.js 3 + Quasar Framework**
- 🌐 Disponível diretamente no navegador — sem instalação necessária

---

## 🛠 Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/) — Framework progressivo para construção da interface
- [Quasar Framework 2](https://quasar.dev/) — Framework UI para Vue.js
- [TypeScript](https://www.typescriptlang.org/) — Superset de JavaScript com tipagem estática

---

## 🚀 Como Usar

### 🔹 Versão Online (Recomendado)
Acesse diretamente:  
➡ **[https://icons-creator.vercel.app/](https://icons-creator.vercel.app/)**

1. Clique no botão de **upload** e envie sua imagem (`.jpeg`, `.jpg`, `.png`).
2. Ajuste o tamanho e as opções do ícone.
3. Baixe o ícone gerado e use em seu projeto web.

## 📚 Como usar os ícones SVG

Abaixo, veja exemplos de como usar um ícone SVG criado no **Icons Creator** em **Vue**, **Vue + Quasar** e **HTML puro**.

<details>
<summary> Vue </summary>

```vue
<template>
    <div>
    <img src="/icon.svg" > //Adicione o caminho onde está salvo o ícone no src
  </div>
</template>
```
</details>

<details>
<summary> Vue + quasar </summary>

```vue
<template>
    <div>
    <q-icon name="img:/icon.svg" /> //Adicione o caminho onde está salvo o ícone no name e ao usar coloque 'img:caminho'
  </div>
</template>
```
</details>

<details>
  <summary> HTML Puro</summary>
  
  ```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<img src="/icon.svg" alt="Ícone" /> //Adicione o caminho onde está salvo o ícone no src
</body>
</html>
```
</details>


### 🔹 Rodando Localmente (Desenvolvedores)

```bash
# Clone o repositório
git clone https://github.com/DrewM13/icons-creator.git

# Acesse a pasta do projeto
cd icons-creator

# Instale as dependências
npm install ou yarn

# Execute em modo de desenvolvimento
npm run dev ou yarn run dev
```

### 🤝 Como Contribuir
Faça um fork do repositório.

Crie uma branch para sua feature/bugfix:
git checkout -b minha-feature

Commit suas alterações:
git commit -m 'Adiciona nova feature'

Envie para o repositório remoto:
git push origin minha-feature

Abra um Pull Request.

### 📌 Roadmap
 Suporte para exportar ícones em múltiplos formatos (SVG, ICO)

 Paleta de cores para recolorir ícones

 Biblioteca pessoal de ícones salvos

 
