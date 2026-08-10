# React Auth Flow

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?logo=zod&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1-5A29E4?logo=axios&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?logo=biome&logoColor=white)

Aplicação SPA em React que implementa um fluxo de autenticação completo com **access token** e **refresh token**, incluindo rotação automática de tokens via interceptors do Axios. Após autenticado, o usuário acessa um dashboard que lista os _leads_ carregados a partir de uma API protegida.

## ✨ Funcionalidades

| Funcionalidade         | Descrição                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Cadastro**           | Registro de novos usuários em `/sign-up`                                                |
| **Login**              | Autenticação com e-mail e senha em `/sign-in`                                           |
| **Rotas protegidas**   | Redirecionamento automático com `AuthGuard`                                             |
| **Rotação de token**   | Ao receber `401`, o refresh token gera um novo access token e repete a requisição       |
| **Logout de sessão**   | Limpeza da sessão quando o refresh token expira                                         |
| **Dashboard**          | Listagem de leads (nome e e-mail)                                                       |
| **Tema claro/escuro**  | Alternância de tema com toggle                                                          |
| **Toasts globais**     | Feedback de sucesso e de erros de queries                                               |

## 🛠️ Stack

| Categoria         | Tecnologias                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| **Core**          | [React 19](https://react.dev/) + [React Compiler](https://react.dev/learn/react-compiler), [TypeScript](https://www.typescriptlang.org/) |
| **Build**         | [Vite](https://vite.dev/)                                                  |
| **Roteamento**    | [React Router](https://reactrouter.com/) (lazy loading)                    |
| **Data fetching** | [TanStack Query](https://tanstack.com/query), [Axios](https://axios-http.com/) |
| **Formulários**   | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)  |
| **UI**            | [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Base UI](https://base-ui.com/) |
| **Qualidade**     | [Biome](https://biomejs.dev/), [Husky](https://typicode.github.io/husky/) + [Commitlint](https://commitlint.js.org/) |

## 🔐 Fluxo de autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant App as React App
    participant API as API

    U->>App: Login (e-mail + senha)
    App->>API: POST /sign-in
    API-->>App: accessToken + refreshToken
    App->>App: Salva tokens no localStorage
    App-->>U: Redireciona para o Dashboard

    Note over App,API: Requisições autenticadas
    App->>API: GET /leads (Bearer accessToken)

    alt Token expirado (401)
        API-->>App: 401 Unauthorized
        App->>API: POST /refresh-token
        alt Refresh válido
            API-->>App: Novos tokens
            App->>API: Repete requisição original
            API-->>App: 200 OK
        else Refresh expirado
            API-->>App: 401 Unauthorized
            App->>App: Limpa sessão e desloga
        end
    end
```

## 🧭 Proteção de rotas

```mermaid
flowchart TD
    A[Acesso à rota] --> B{isSignedIn?}
    B -- Sim --> C{Rota privada?}
    B -- Não --> D{Rota privada?}
    C -- Sim --> E[Renderiza página]
    C -- Não --> F[Redireciona para /]
    D -- Sim --> G[Redireciona para /sign-in]
    D -- Não --> E
```
