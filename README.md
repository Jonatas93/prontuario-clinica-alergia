# AllergyMed — Prontuário Eletrônico

Sistema de prontuário eletrônico para clínica de alergologia, desenvolvido com Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS.

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar em desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

### 3. Login de acesso

| Campo   | Valor      |
|---------|------------|
| Usuário | `admin`    |
| Senha   | `admin123` |

### 4. Build para produção

```bash
npm run build
npm run preview
```

---

## Stack

| Tecnologia | Uso |
|---|---|
| Nuxt 3 | Framework (SPA mode) |
| Vue 3 + Composition API | UI reativa |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização |
| Pinia | Gerenciamento de estado |
| VueUse | Utilitários Vue |
| @nuxtjs/color-mode | Tema dark/light |

---

## Estrutura do projeto

```
prontuario/
├── assets/css/main.css          # Estilos globais + classes reutilizáveis
├── components/
│   ├── AppSidebar.vue           # Sidebar de navegação
│   ├── AppHeader.vue            # Cabeçalho com tema e título
│   ├── AppModal.vue             # Modal reutilizável
│   ├── AppointmentBadge.vue     # Badge de status do agendamento
│   ├── AppointmentTypeBadge.vue # Badge de tipo do agendamento
│   ├── AppointmentForm.vue      # Formulário de novo agendamento
│   ├── InfoRow.vue              # Linha de info no perfil do paciente
│   ├── PatientForm.vue          # Formulário de paciente (create/edit)
│   ├── RecordSection.vue        # Seção de prontuário (título + texto)
│   ├── SidebarLink.vue          # Link ativo da sidebar
│   ├── StatCard.vue             # Card de estatística no dashboard
│   └── ToastContainer.vue       # Container de notificações
├── data/mock.ts                 # Dados mock (pacientes, agendamentos, prontuários)
├── layouts/
│   ├── auth.vue                 # Layout da tela de login
│   └── default.vue              # Layout principal (sidebar + header)
├── middleware/auth.ts           # Proteção de rotas
├── pages/
│   ├── index.vue                # Redireciona para /dashboard
│   ├── login.vue                # Tela de login
│   ├── dashboard.vue            # Visão geral e estatísticas
│   ├── patients/
│   │   ├── index.vue            # Lista de pacientes com busca
│   │   ├── new.vue              # Formulário de novo paciente
│   │   └── [id].vue             # Perfil com tabs (info / prontuário / agendamentos)
│   │   └── [id]/edit.vue        # Formulário de edição
│   ├── appointments/
│   │   └── index.vue            # Calendário + lista de agendamentos
│   └── records/
│       └── [patientId]/new.vue  # Formulário de nova consulta
├── stores/
│   ├── auth.ts                  # Autenticação
│   ├── appointments.ts          # Agendamentos
│   ├── notifications.ts         # Sistema de toast
│   ├── patients.ts              # Pacientes
│   └── records.ts               # Prontuários
└── types/index.ts               # Tipagem TypeScript
```

---

## Módulos do sistema

### Autenticação
- Login com usuário/senha
- Sessão salva no `localStorage`
- Middleware que protege todas as rotas

### Dashboard
- Contadores: total de pacientes, consultas hoje, próximos agendamentos, prontuários
- Agenda do dia atual
- Pacientes recentes
- Ações rápidas

### Pacientes
- Listagem com busca por nome ou CPF
- Cadastro completo (dados pessoais, endereço, convênio)
- Perfil com 3 abas:
  - **Informações**: dados de contato, endereço, alergias consolidadas
  - **Prontuários**: histórico completo de consultas com prescrições
  - **Agendamentos**: histórico e controle de status

### Prontuário / Consultas
- Formulário estruturado: queixa principal, exame físico, hipótese diagnóstica, conduta
- Alergias identificadas (tags dinâmicas)
- Prescrições detalhadas (medicamento, posologia, frequência, duração)
- Follow-up e notas adicionais
- Alerta visual de alergias conhecidas ao criar nova consulta

### Agendamentos
- Calendário mensal com navegação por mês
- Código de cores por status (azul=agendado, verde=confirmado, vermelho=cancelado, cinza=realizado)
- Lista de próximos agendamentos
- Controle de status: agendado → confirmado → realizado / cancelado
- Modal de novo agendamento

---

## Dados mock incluídos

- **10 pacientes** com dados realistas (endereços SP, CPFs, convênios)
- **15 agendamentos** (passados e futuros, vários status)
- **6 prontuários** detalhados para clínica de alergia:
  - Rinite alérgica com imunoterapia
  - Asma moderada
  - Anafilaxia por amendoim (com EpiPen)
  - Urticária crônica
  - Dermatite atópica
  - Rinoconjuntivite sazonal

---

## Persistência de dados

Todos os dados são salvos no `localStorage` do navegador. Na primeira carga, os dados mock são automaticamente carregados. Alterações (cadastro, edição, agendamentos) persistem entre sessões.

Para **resetar** os dados para o estado inicial, execute no console do navegador:
```js
localStorage.clear(); location.reload()
```
