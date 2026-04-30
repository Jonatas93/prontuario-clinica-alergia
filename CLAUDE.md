# AllergyMed — Prontuário Eletrônico

Sistema de prontuário eletrônico para clínica de alergia. SPA construída com Nuxt 3, Vue 3, Pinia e Tailwind CSS.

## Stack Tecnológica

- **Framework:** Nuxt 3.9 (SPA — SSR desativado)
- **UI:** Vue 3.4 + Composition API (`<script setup>`)
- **State:** Pinia 2.1 com persistência em localStorage
- **Estilos:** Tailwind CSS + dark mode por classe
- **Linguagem:** TypeScript strict
- **Utilitários:** VueUse

## Arquitetura e Estrutura de Pastas

```
prontuario/
├── assets/css/          # Estilos globais: classes utilitárias (.btn, .card, .input, .table)
├── components/          # Componentes auto-importados (PascalCase obrigatório)
├── composables/         # Lógica com estado reativo Vue (prefixo use*)
├── data/                # Dados mock por entidade (patients, appointments, records)
├── layouts/             # default.vue (app) e auth.vue (login)
├── middleware/          # auth.ts — guarda de rota global
├── pages/               # Rotas automáticas do Nuxt Router
├── stores/              # Stores Pinia (prefixo use*, sufixo Store)
├── types/               # Interfaces e tipos TypeScript centralizados
└── utils/               # Funções puras sem reatividade Vue
```

### Regra de Ouro: separação de responsabilidades

| Camada | Responsabilidade | Onde |
|--------|-----------------|------|
| `pages/` | Layout visual + orquestração | Sem lógica de negócio |
| `components/` | UI reutilizável | Sem acesso direto a stores |
| `composables/` | Lógica reativa reutilizável | Usa stores e utils |
| `stores/` | Estado global + operações CRUD | Sem lógica de apresentação |
| `utils/` | Funções puras (formatação, cálculos) | Sem Vue, sem stores |
| `types/` | Contratos TypeScript | Apenas interfaces e types |

## Convenções de Nomenclatura

### Arquivos
- **Componentes:** `PascalCase.vue` — ex.: `PatientForm.vue`, `AppHeader.vue`
- **Páginas:** `kebab-case.vue` ou `[param].vue` — ex.: `[id].vue`, `new.vue`
- **Stores:** `camelCase.ts` — ex.: `patients.ts`, `auth.ts`
- **Composables:** `useCamelCase.ts` — ex.: `usePatient.ts`, `useFormatters.ts`
- **Utils:** `camelCase.ts` — ex.: `formatters.ts`, `validators.ts`
- **Types:** `camelCase.ts` ou `index.ts` — ex.: `types/index.ts`

### Código
- **Variáveis e funções:** `camelCase`
- **Interfaces e tipos:** `PascalCase` — ex.: `Patient`, `MedicalRecord`
- **Constantes globais:** `UPPER_SNAKE_CASE`
- **Eventos Vue emitidos:** `kebab-case` — ex.: `@update:patient`, `@form-submit`
- **Props:** `camelCase` em TypeScript, `kebab-case` no template

### Stores Pinia
```ts
// Nome do store: entidade no plural em inglês
export const usePatientsStore = defineStore('patients', () => {
  // state: refs
  // getters: computed
  // actions: funções
})
```

## Padrões de Componentes

### Estrutura obrigatória de SFC
```vue
<script setup lang="ts">
// 1. Imports externos
// 2. Imports internos (stores, composables, utils, types)
// 3. Props e emits com defineProps/defineEmits tipados
// 4. Estado local (ref, reactive)
// 5. Computed
// 6. Funções handlers (prefixo handle*)
// 7. Lifecycle hooks (onMounted por último)
</script>

<template>
  <!-- Elemento raiz único -->
</template>
```

### Props devem sempre ser tipadas com interface
```ts
interface Props {
  patient: Patient
  isLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})
```

### Emits devem sempre ser declarados
```ts
const emit = defineEmits<{
  'update:patient': [patient: Patient]
  'form-submit': [data: PatientFormData]
}>()
```

## Composables vs Utils

- **`composables/`** — use quando precisar de `ref`, `computed`, `watch`, `onMounted` ou qualquer API reativa Vue
- **`utils/`** — use para funções puras sem estado: formatação, validação, cálculos

```ts
// CORRETO: utils/formatters.ts (função pura)
export function formatCPF(cpf: string): string { ... }

// CORRETO: composables/usePatient.ts (usa store reativa)
export function usePatient(id: string) {
  const store = usePatientsStore()
  const patient = computed(() => store.getById(id))
  return { patient }
}
```

## Stores: Padrão de Implementação

Todas as stores seguem o padrão Setup Store (não Options Store):

```ts
export const useEntityStore = defineStore('entity', () => {
  // STATE
  const items = ref<Entity[]>([])

  // GETTERS
  const getById = computed(() => (id: string) =>
    items.value.find(i => i.id === id)
  )

  // ACTIONS
  function create(data: CreateEntityDto): Entity { ... }
  function update(id: string, data: Partial<Entity>): void { ... }
  function remove(id: string): void { ... }

  return { items, getById, create, update, remove }
})
```

## Tipagem TypeScript

Todos os tipos do domínio ficam em `types/index.ts`. Não criar tipos inline em componentes ou stores — sempre exportar de `types/`.

Interfaces principais do domínio:
- `Patient` — dados pessoais, endereço, convênio, tipo sanguíneo
- `Appointment` — agendamento com status, tipo, médico
- `MedicalRecord` — prontuário com queixa, diagnóstico, prescrições
- `Prescription` — medicamento, dosagem, frequência, duração
- `User` — usuário autenticado com role e CRM
- `Notification` — toast com tipo (success | error | warning | info)

## Roteamento e Autenticação

- Middleware `auth.ts` protege todas as rotas exceto `/login`
- Verifica `localStorage.auth_user` para sessão ativa
- Layout `auth.vue` para `/login`, layout `default.vue` para todas as demais

### Estrutura de rotas
```
/              → redirect para /dashboard
/login         → layout: auth
/dashboard     → dashboard com stats e agenda do dia
/patients      → listagem com busca por nome/CPF
/patients/new  → formulário de criação
/patients/:id  → perfil completo do paciente
/patients/:id/edit → formulário de edição
/appointments  → calendário e lista de agendamentos
/records/:patientId/new → novo prontuário médico
```

## Estilos e Design System

Classes utilitárias customizadas definidas em `assets/css/main.css`:

| Classe | Uso |
|--------|-----|
| `.btn` | Base para botões |
| `.btn-primary` | Ação principal (azul) |
| `.btn-secondary` | Ação secundária (cinza) |
| `.btn-danger` | Ação destrutiva (vermelho) |
| `.btn-ghost` | Ação discreta (sem fundo) |
| `.input` | Campos de formulário |
| `.label` | Labels de formulário |
| `.card` | Container com sombra e borda |
| `.card-header` | Cabeçalho do card |
| `.card-body` | Corpo do card com padding |
| `.table` | Tabela estilizada |
| `.table-wrapper` | Container com scroll horizontal |

**Dark mode:** sempre usar `dark:` prefix nas classes Tailwind. O toggle está no `AppHeader.vue`.

**Fonte:** Inter — importada via Google Fonts no `nuxt.config.ts`.

## Dados e Persistência

Este projeto é uma SPA sem backend. A persistência é feita via localStorage nas stores.

- **Inicialização:** stores carregam dados do localStorage; se vazio, inicializam com dados mock de `data/`
- **Mock data:** dividido por entidade em `data/` — não colocar tudo em um único arquivo
- **IDs:** usar `crypto.randomUUID()` para geração de IDs únicos

## O que Não Fazer

- Não usar Options API — apenas Composition API com `<script setup>`
- Não acessar localStorage diretamente em componentes ou pages — apenas nas stores
- Não criar funções de formatação inline — sempre usar `utils/formatters.ts`
- Não usar `any` em TypeScript — sempre tipar explicitamente
- Não criar componentes com mais de ~200 linhas — extrair em composables e sub-componentes
- Não usar `v-html` com dados do usuário — risco de XSS
- Não importar stores dentro de outros stores diretamente — usar composables como intermediário
- Não commitar arquivos `.env` com credenciais reais

## Comandos de Desenvolvimento

```bash
npm run dev       # Servidor de desenvolvimento (http://localhost:3000)
npm run build     # Build de produção
npm run preview   # Preview do build de produção
npm run generate  # Geração estática
```

**Credenciais demo:** `admin` / `admin123`
