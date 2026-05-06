# 🛍️ Gestão de Produtos - Fullstack

Aplicação fullstack para gestão de produtos, desenvolvida como desafio técnico.

## 🎯 Sobre o Projeto

Sistema completo que permite:

- Listagem de produtos com paginação
- Cadastro, edição e exclusão de produtos
- Validação de regras de negócio
- Integração frontend + backend

---

# 🏗️ Arquitetura

```
DESAFIOWEB/
├── backend/ProductApi        → API em .NET 8
└── frontend/product-management → Frontend React
```

---

# 🚀 Tecnologias

## Backend

- .NET 8 (LTS)
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger
- Logs + Middleware global

## Frontend

- React + TypeScript
- Vite
- TailwindCSS
- Axios

---

# ⚙️ Como rodar o projeto

## 🔹 1. Backend

```bash
cd backend/ProductApi

dotnet restore
dotnet ef database update
dotnet run
```

A API estará disponível em:

```
http://localhost:5095
```

Swagger:

```
http://localhost:5095/swagger
```

---

## 🔹 2. Frontend

```bash
cd frontend/product-management

npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

# 🔗 Integração

O frontend consome a API em:

```
http://localhost:5095/api/products
```

---

# 📌 Regras de Negócio

- ❌ Estoque não pode ser negativo
- ❌ SKU deve ser único
- ❌ Eletrônicos devem ter preço mínimo de R$ 50,00

✔ Validação aplicada no backend (segurança)
✔ Validação aplicada no frontend (UX)

---

# 🧠 Decisões Técnicas

- Uso de **.NET 8 (LTS)** para estabilidade
- Arquitetura em camadas:
  - Controller
  - Service
  - Repository

- Uso de DTOs para desacoplamento
- Middleware global para tratamento de erros
- Logs para auditoria de operações
- Paginação para performance

---

# 🧪 Como testar

## Swagger

Acesse:

```
http://localhost:5095/swagger
```

## Testes recomendados:

- Criar produto válido
- SKU duplicado
- Estoque negativo
- Eletrônico com preço inválido
- Paginação

---

# 🧠 Diferenciais

- ✔ Arquitetura limpa (SOLID)
- ✔ Separação de responsabilidades
- ✔ Validação robusta
- ✔ Integração completa frontend/backend
- ✔ Tratamento de erros centralizado
- ✔ Experiência do usuário com feedback imediato

---

# 📦 Estrutura do Projeto

```
backend/
  └── ProductApi/
frontend/
  └── product-management/
```

---

# 🚀 Possíveis melhorias

- Autenticação (JWT)
- Deploy (Vercel + Render/Azure)
- Testes automatizados
- Docker

---

# 👨‍💻 Autor

Gabriel Yamakishi

---

# 📌 Observação

Este projeto foi desenvolvido com foco em boas práticas, organização de código e clareza para discussão técnica.
