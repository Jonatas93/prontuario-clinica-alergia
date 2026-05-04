import type { Patient, Appointment, MedicalRecord, User } from '~/types'

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana Carolina Ferreira',
    cpf: '123.456.789-01',
    birthDate: '1985-03-15',
    phone: '(11) 98765-4321',
    email: 'ana.ferreira@gmail.com',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Jardim América',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01452-000'
    },
    insurance: 'Unimed',
    bloodType: 'O+',
    notes: 'Histórico familiar de atopia. Mãe com rinite alérgica e asma.',
    createdAt: '2024-01-10T10:00:00',
    updatedAt: '2024-06-15T14:30:00'
  },
  {
    id: '2',
    name: 'Roberto Alves Mendes',
    cpf: '987.654.321-00',
    birthDate: '1972-08-22',
    phone: '(11) 97654-3210',
    email: 'roberto.mendes@hotmail.com',
    address: {
      street: 'Av. Paulista',
      number: '1578',
      complement: 'Sala 302',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-200'
    },
    insurance: 'Bradesco Saúde',
    bloodType: 'A+',
    notes: 'Paciente com asma moderada. Usa salbutamol de resgate frequentemente.',
    createdAt: '2024-01-15T14:30:00',
    updatedAt: '2024-07-20T09:00:00'
  },
  {
    id: '3',
    name: 'Mariana Santos Costa',
    cpf: '456.789.123-02',
    birthDate: '1995-11-30',
    phone: '(11) 96543-2109',
    email: 'mariana.costa@yahoo.com.br',
    address: {
      street: 'Rua Augusta',
      number: '890',
      complement: '',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-100'
    },
    insurance: 'SulAmérica',
    bloodType: 'B+',
    notes: 'Alergia alimentar severa a amendoim. Porta epinephrine auto-injector.',
    createdAt: '2024-02-05T09:15:00',
    updatedAt: '2024-08-10T11:00:00'
  },
  {
    id: '4',
    name: 'Fernanda Lima Ribeiro',
    cpf: '321.654.987-03',
    birthDate: '1990-07-08',
    phone: '(11) 95432-1098',
    email: 'fernanda.ribeiro@gmail.com',
    address: {
      street: 'Rua Oscar Freire',
      number: '456',
      complement: 'Casa',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001'
    },
    insurance: 'Amil',
    bloodType: 'AB+',
    notes: 'Urticária crônica espontânea. Em uso de anti-histamínico diário.',
    createdAt: '2024-02-20T16:00:00',
    updatedAt: '2024-09-01T10:30:00'
  },
  {
    id: '5',
    name: 'Carlos Eduardo Souza',
    cpf: '654.321.098-04',
    birthDate: '1968-04-12',
    phone: '(11) 94321-0987',
    email: 'carlos.souza@empresa.com.br',
    address: {
      street: 'Al. Santos',
      number: '2200',
      complement: 'Apto 81',
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01419-002'
    },
    insurance: 'Porto Seguro',
    bloodType: 'O-',
    notes: 'Rinite alérgica perene e dermatite atópica. Sensibilização a ácaros.',
    createdAt: '2024-03-10T11:30:00',
    updatedAt: '2024-09-15T15:00:00'
  },
  {
    id: '6',
    name: 'Juliana Pereira Gomes',
    cpf: '789.012.345-05',
    birthDate: '2001-09-25',
    phone: '(11) 93210-9876',
    email: 'juliana.gomes@outlook.com',
    address: {
      street: 'Rua Haddock Lobo',
      number: '333',
      complement: '',
      neighborhood: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01414-001'
    },
    insurance: 'Unimed',
    bloodType: 'A-',
    notes: 'Asma leve intermitente. Alergia a látex identificada em procedimento cirúrgico prévio.',
    createdAt: '2024-03-25T14:00:00',
    updatedAt: '2024-10-02T09:45:00'
  },
  {
    id: '7',
    name: 'Marcos Antônio Oliveira',
    cpf: '012.345.678-06',
    birthDate: '1955-12-03',
    phone: '(11) 92109-8765',
    email: 'marcos.oliveira@gmail.com',
    address: {
      street: 'Rua Pamplona',
      number: '1000',
      complement: 'Bloco B, Apto 12',
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01405-001'
    },
    insurance: 'Bradesco Saúde',
    bloodType: 'B-',
    notes: 'Rinite alérgica sazonal. Reação adversa a AINEs documentada.',
    createdAt: '2024-04-08T10:00:00',
    updatedAt: '2024-10-20T16:30:00'
  },
  {
    id: '8',
    name: 'Beatriz Nunes Teixeira',
    cpf: '345.678.901-07',
    birthDate: '2010-06-18',
    phone: '(11) 91098-7654',
    email: 'beatriz.mae@gmail.com',
    address: {
      street: 'Rua Estados Unidos',
      number: '75',
      complement: '',
      neighborhood: 'Jardim América',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01427-000'
    },
    insurance: 'SulAmérica',
    bloodType: 'O+',
    notes: 'Paciente pediátrica. Dermatite atópica moderada-grave. Acompanhamento com dermatologia.',
    createdAt: '2024-04-20T09:30:00',
    updatedAt: '2024-11-05T11:15:00'
  },
  {
    id: '9',
    name: 'Diego Henrique Martins',
    cpf: '567.890.123-08',
    birthDate: '1988-02-14',
    phone: '(11) 90987-6543',
    email: 'diego.martins@email.com',
    address: {
      street: 'Av. Brasil',
      number: '567',
      complement: 'Apto 201',
      neighborhood: 'Moema',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04079-000'
    },
    insurance: 'Amil',
    bloodType: 'AB-',
    notes: 'Alergia a penicilina (reação anafilática prévia). ALERTA CRÍTICO.',
    createdAt: '2024-05-15T15:00:00',
    updatedAt: '2024-11-12T14:00:00'
  },
  {
    id: '10',
    name: 'Luciana Castro Barbosa',
    cpf: '890.123.456-09',
    birthDate: '1978-10-05',
    phone: '(11) 89876-5432',
    email: 'luciana.barbosa@gmail.com',
    address: {
      street: 'Rua Vergueiro',
      number: '2300',
      complement: 'Casa 3',
      neighborhood: 'Vila Mariana',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04101-300'
    },
    insurance: 'Porto Seguro',
    bloodType: 'A+',
    notes: 'Rinoconjuntivite alérgica sazonal. Sensibilizada a gramíneas e cipreste.',
    createdAt: '2024-06-01T08:30:00',
    updatedAt: '2024-11-20T10:00:00'
  }
]

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: '1',
    date: '2026-04-29',
    time: '09:00',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'consultation',
    status: 'confirmed',
    reason: 'Consulta de rotina - rinite',
    createdAt: '2026-04-15T10:00:00'
  },
  {
    id: 'a2',
    patientId: '2',
    date: '2026-04-29',
    time: '10:00',
    duration: 30,
    doctor: 'Dra. Patrícia Rocha',
    type: 'return',
    status: 'scheduled',
    reason: 'Retorno - asma moderada',
    createdAt: '2026-04-16T14:00:00'
  },
  {
    id: 'a3',
    patientId: '3',
    date: '2026-04-29',
    time: '11:00',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'consultation',
    status: 'confirmed',
    reason: 'Alergia alimentar - seguimento',
    createdAt: '2026-04-17T09:30:00'
  },
  {
    id: 'a4',
    patientId: '4',
    date: '2026-04-30',
    time: '08:30',
    duration: 45,
    doctor: 'Dra. Patrícia Rocha',
    type: 'return',
    status: 'scheduled',
    reason: 'Urticária crônica - controle',
    createdAt: '2026-04-18T11:00:00'
  },
  {
    id: 'a5',
    patientId: '5',
    date: '2026-04-30',
    time: '09:30',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'exam',
    status: 'scheduled',
    reason: 'Teste cutâneo para ácaros e fungos',
    createdAt: '2026-04-19T15:00:00'
  },
  {
    id: 'a6',
    patientId: '6',
    date: '2026-05-02',
    time: '14:00',
    duration: 30,
    doctor: 'Dra. Patrícia Rocha',
    type: 'return',
    status: 'scheduled',
    reason: 'Retorno asma - reavaliação espirometria',
    createdAt: '2026-04-20T10:00:00'
  },
  {
    id: 'a7',
    patientId: '7',
    date: '2026-05-05',
    time: '10:30',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'consultation',
    status: 'scheduled',
    reason: 'Primeira consulta - rinite sazonal',
    createdAt: '2026-04-21T09:00:00'
  },
  {
    id: 'a8',
    patientId: '8',
    date: '2026-05-06',
    time: '15:00',
    duration: 45,
    doctor: 'Dra. Patrícia Rocha',
    type: 'return',
    status: 'scheduled',
    reason: 'Dermatite atópica - seguimento mensal',
    createdAt: '2026-04-22T14:00:00'
  },
  {
    id: 'a9',
    patientId: '9',
    date: '2026-05-07',
    time: '09:00',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'consultation',
    status: 'scheduled',
    reason: 'Triagem pré-anestésica - alergia a penicilina',
    createdAt: '2026-04-23T11:30:00'
  },
  {
    id: 'a10',
    patientId: '10',
    date: '2026-05-08',
    time: '11:00',
    duration: 30,
    doctor: 'Dra. Patrícia Rocha',
    type: 'return',
    status: 'scheduled',
    reason: 'Rinoconjuntivite - resultado de RAST',
    createdAt: '2026-04-24T16:00:00'
  },
  {
    id: 'a11',
    patientId: '1',
    date: '2026-04-10',
    time: '14:00',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'consultation',
    status: 'completed',
    reason: 'Piora da rinite - reavaliação',
    createdAt: '2026-03-25T10:00:00'
  },
  {
    id: 'a12',
    patientId: '2',
    date: '2026-04-08',
    time: '09:00',
    duration: 45,
    doctor: 'Dra. Patrícia Rocha',
    type: 'exam',
    status: 'completed',
    reason: 'Espirometria de controle',
    createdAt: '2026-03-20T14:00:00'
  },
  {
    id: 'a13',
    patientId: '3',
    date: '2026-04-05',
    time: '10:30',
    duration: 60,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'return',
    status: 'completed',
    reason: 'Após reação anafilática - seguimento',
    createdAt: '2026-03-18T09:00:00'
  },
  {
    id: 'a14',
    patientId: '5',
    date: '2026-04-15',
    time: '08:00',
    duration: 90,
    doctor: 'Dra. Patrícia Rocha',
    type: 'procedure',
    status: 'completed',
    reason: 'Imunoterapia alérgeno-específica - dose manutenção',
    createdAt: '2026-04-01T12:00:00'
  },
  {
    id: 'a15',
    patientId: '4',
    date: '2026-04-20',
    time: '16:00',
    duration: 30,
    doctor: 'Dr. Carlos Eduardo Silva',
    type: 'return',
    status: 'cancelled',
    reason: 'Retorno urticária - cancelado pelo paciente',
    notes: 'Paciente cancelou por viagem',
    createdAt: '2026-04-05T10:00:00'
  }
]

export const mockRecords: MedicalRecord[] = [
  {
    id: 'r1',
    patientId: '1',
    appointmentId: 'a11',
    date: '2026-04-10',
    doctor: 'Dr. Carlos Eduardo Silva',
    chiefComplaint: 'Paciente relata piora significativa da obstrução nasal e espirros frequentes há 3 semanas. Coriza hialina abundante. Coceira nasal e ocular intensa. Piora ao acordar e ao sair de casa.',
    physicalExam: 'Regular estado geral, corada, hidratada, anictérica. Mucosa nasal edemaciada, pálida, com secreção hialina abundante. Cornetos inferiores hipertrofiados. Olhos: hiperemia conjuntival bilateral, lacrimejamento. Ausculta pulmonar: MV presente bilateralmente, sem adventícios. FR: 16 irpm.',
    diagnosis: 'J30.1 - Rinite alérgica devida a pólen. Rinoconjuntivite alérgica em atividade, moderada-grave.',
    treatment: 'Ajuste de esquema terapêutico. Intensificação de medidas de controle ambiental. Orientação sobre período de maior concentração de pólens. Prescrição de spray nasal de corticoide e anti-histamínico de segunda geração. Retorno em 4 semanas.',
    allergiesIdentified: ['Pólen de gramíneas', 'Pólen de cipreste', 'Ácaros domésticos (Dermatophagoides pteronyssinus)'],
    prescriptions: [
      {
        medication: 'Mometasona furoato spray nasal 50mcg',
        dosage: '2 jatos em cada narina',
        frequency: '1x ao dia (pela manhã)',
        duration: '30 dias',
        notes: 'Uso contínuo'
      },
      {
        medication: 'Fexofenadina 180mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia',
        duration: '30 dias',
        notes: 'Preferir tomar pela manhã'
      },
      {
        medication: 'Solução salina isotônica nasal',
        dosage: 'Irrigação nasal',
        frequency: '2x ao dia',
        duration: 'Contínuo',
        notes: 'Antes do spray nasal corticoide'
      }
    ],
    followUp: 'Retorno em 4 semanas. Solicitar RAST para painel de gramíneas e árvores.',
    createdAt: '2026-04-10T14:00:00'
  },
  {
    id: 'r2',
    patientId: '1',
    date: '2025-11-20',
    doctor: 'Dr. Carlos Eduardo Silva',
    chiefComplaint: 'Consulta de retorno semestral. Queixa de obstrução nasal intermitente, principalmente ao deitar. Nega crises de espirros e coriza abundante. Sono prejudicado.',
    physicalExam: 'Bom estado geral. Mucosa nasal levemente congestionada, sem secreção. Cornetos ligeiramente aumentados. Sem alterações orofaríngeas. Ausculta pulmonar normal.',
    diagnosis: 'J30.1 - Rinite alérgica controlada, leve intermitente no momento.',
    treatment: 'Manutenção de tratamento atual. Reforço de medidas de controle ambiental (capas antiácaro, filtros HEPA, controle de umidade). Orientação sobre higiene do sono.',
    allergiesIdentified: ['Ácaros domésticos (Dermatophagoides pteronyssinus)', 'Epithelia de animais'],
    prescriptions: [
      {
        medication: 'Mometasona furoato spray nasal 50mcg',
        dosage: '1 jato em cada narina',
        frequency: '1x ao dia',
        duration: '60 dias',
        notes: 'Redução de dose - manutenção'
      }
    ],
    followUp: 'Próxima consulta em 6 meses ou antes se piora.',
    createdAt: '2025-11-20T10:30:00'
  },
  {
    id: 'r3',
    patientId: '2',
    appointmentId: 'a12',
    date: '2026-04-08',
    doctor: 'Dra. Patrícia Rocha',
    chiefComplaint: 'Paciente retorna para avaliação de asma moderada. Refere uso frequente de broncodilatador de resgate (salbutamol), cerca de 3-4x por semana. Dispneia aos esforços moderados. Piora noturna. Relata piora no inverno e com exercício físico.',
    physicalExam: 'Regular estado geral, eupneico em repouso. Tórax simétrico, expansibilidade preservada. Ausculta: MV diminuído em bases, sibilos expiratórios difusos. SpO2 96% em ar ambiente. FC: 88 bpm, FR: 20 irpm. PFE: 68% do previsto.',
    diagnosis: 'J45.1 - Asma predominantemente alérgica, moderada persistente, não controlada.',
    treatment: 'Escalonamento do tratamento. Introdução de corticoide inalatório em dose média + LABA. Manutenção de salbutamol para resgate. Orientação sobre técnica inalatória. Plano de ação escrito para asma. Solicitação de espirometria de controle.',
    allergiesIdentified: ['Ácaros domésticos', 'Fungos (Alternaria, Cladosporium)', 'Fumaça de cigarro (irritante)'],
    prescriptions: [
      {
        medication: 'Budesonida/Formoterol 160/4,5mcg (Symbicort)',
        dosage: '2 inalações',
        frequency: '2x ao dia',
        duration: '60 dias',
        notes: 'Técnica inalatória: agitar, expirar, inalar lentamente, prender 10s'
      },
      {
        medication: 'Salbutamol 100mcg spray (resgate)',
        dosage: '2-4 inalações',
        frequency: 'Conforme necessidade',
        duration: 'Contínuo',
        notes: 'Apenas para resgate - se usar >2x/semana, retornar'
      },
      {
        medication: 'Montelucaste 10mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia (à noite)',
        duration: '30 dias',
        notes: 'Associado para rinite concomitante'
      }
    ],
    followUp: 'Retorno em 4 semanas com resultado de espirometria. Diário de sintomas.',
    createdAt: '2026-04-08T09:30:00'
  },
  {
    id: 'r4',
    patientId: '3',
    appointmentId: 'a13',
    date: '2026-04-05',
    doctor: 'Dr. Carlos Eduardo Silva',
    chiefComplaint: 'Seguimento pós-reação anafilática ocorrida há 15 dias após ingestão acidental de amendoim em restaurant. Recebeu adrenalina no PS, com boa resposta. Atualmente assintomática. Ansiedade elevada relacionada ao episódio.',
    physicalExam: 'Bom estado geral, normocorada, orientada. Ausculta cardíaca e pulmonar normais. Sem lesões cutâneas no momento. Gânglios não palpáveis. Abdome: RHA presentes, sem dor.',
    diagnosis: 'T78.0 - Choque anafilático por alimento. Alergia a amendoim (Arachis hypogaea) confirmada. Antecedente de anafilaxia grave.',
    treatment: 'Orientação detalhada sobre anafilaxia e uso de adrenalina autoinjectable. Plano de emergência escrito. Orientação de dieta de exclusão rigorosa de amendoim e derivados. Leitura de rótulos. Comunicação com escola e locais frequentados. Solicitação de IgE específica para amendoim e componentes (Ara h 1, 2, 3, 8, 9). Encaminhamento para avaliação de dessensibilização oral.',
    allergiesIdentified: ['Amendoim (Arachis hypogaea) - ANAFILAXIA', 'Possível alergia cruzada com outras leguminosas'],
    prescriptions: [
      {
        medication: 'Adrenalina 0,3mg autoinjetor (EpiPen)',
        dosage: '1 dispositivo',
        frequency: 'Uso de emergência - injetar na coxa anterolateral',
        duration: 'Manter sempre consigo',
        notes: 'URGÊNCIA: Aplicar imediatamente em caso de reação sistêmica e chamar SAMU 192'
      },
      {
        medication: 'Loratadina 10mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia',
        duration: '30 dias',
        notes: 'Antihistamínico de manutenção - NÃO substitui adrenalina em anafilaxia'
      },
      {
        medication: 'Prednisolona 20mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia (manhã)',
        duration: '5 dias',
        notes: 'Dose decrescente - descontinuar após 5 dias'
      }
    ],
    followUp: 'Retorno em 2 semanas com resultado de IgE específica. Avaliação de dessensibilização oral para amendoim.',
    notes: 'ALERTA: Paciente com anafilaxia grave a amendoim. Garantir que autoinjetor de adrenalina esteja sempre disponível.',
    createdAt: '2026-04-05T10:30:00'
  },
  {
    id: 'r5',
    patientId: '5',
    appointmentId: 'a14',
    date: '2026-04-15',
    doctor: 'Dra. Patrícia Rocha',
    chiefComplaint: 'Paciente em imunoterapia subcutânea há 14 meses para ácaros. Sessão de dose de manutenção. Nega reações sistêmicas nas últimas aplicações. Refere melhora significativa da rinite perene.',
    physicalExam: 'Bom estado geral. Local de injeção anterior: sem sinais de infecção ou reação tardia. Mucosa nasal: congestionada leve, melhora em relação à consulta anterior. Ausculta pulmonar limpa.',
    diagnosis: 'Imunoterapia alérgeno-específica (ITES) para Dermatophagoides pteronyssinus e D. farinae - fase de manutenção. Rinite alérgica perene moderada, em melhora clínica.',
    treatment: 'Aplicação de dose de manutenção: extrato padronizado de ácaros 1:100 w/v, volume 0,5ml, via subcutânea braço esquerdo. Observação por 30 minutos pós-aplicação sem intercorrências. Esquema mantido mensal.',
    allergiesIdentified: ['Dermatophagoides pteronyssinus', 'Dermatophagoides farinae', 'Blomia tropicalis'],
    prescriptions: [
      {
        medication: 'Fexofenadina 180mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia',
        duration: '30 dias',
        notes: 'Tomar 1h antes da próxima aplicação de imunoterapia'
      }
    ],
    followUp: 'Próxima aplicação de imunoterapia em 30 dias. Manutenção por mais 2 anos.',
    createdAt: '2026-04-15T08:30:00'
  },
  {
    id: 'r6',
    patientId: '4',
    date: '2026-03-15',
    doctor: 'Dr. Carlos Eduardo Silva',
    chiefComplaint: 'Urticária crônica espontânea há 8 meses. Lesões urticariformes diárias, prurido intenso, especialmente noturno. Anti-histamínico de 1ª geração não controlou. Sem angioedema. Impacto significativo na qualidade de vida.',
    physicalExam: 'Exame no momento sem lesões ativas. Pele íntegra, normotrófica. Sem dermatografismo. Teste de pressão negativo. Linfonodos não palpáveis. Tireoide sem alterações.',
    diagnosis: 'L50.1 - Urticária idiopática (crônica espontânea). Excluídas causas secundárias conforme investigação prévia.',
    treatment: 'Ajuste terapêutico com anti-histamínico de segunda geração em dose plena. Se não controlada em 4 semanas, considerar dose dobrada ou add-on de Omalizumabe (biológico). Orientação sobre fatores agravantes (AINEs, calor, stress). Diário de urticária.',
    allergiesIdentified: ['Urticária crônica espontânea (sem alérgeno identificado)', 'Pseudo-alergia a AINEs suspeita'],
    prescriptions: [
      {
        medication: 'Bilastina 20mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia (à noite)',
        duration: '30 dias',
        notes: 'Tomar em jejum ou 1h antes das refeições'
      },
      {
        medication: 'Dexclorfeniramina 2mg (resgate)',
        dosage: '1 comprimido',
        frequency: 'Conforme necessidade (máx 3x/dia)',
        duration: '30 dias',
        notes: 'Apenas para crises intensas - causa sonolência'
      }
    ],
    followUp: 'Retorno em 4 semanas com diário de urticária preenchido. Avaliar necessidade de Omalizumabe.',
    createdAt: '2026-03-15T16:00:00'
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Carlos Eduardo Silva',
    email: 'carlos.silva@allergymed.com.br',
    role: 'admin',
    username: 'admin',
    password: 'admin123',
    crm: 'CRM/SP 123456',
    specialty: 'Alergologia e Imunologia',
    status: 'ativo',
    createdAt: '2024-01-01T08:00:00',
    updatedAt: '2024-01-01T08:00:00'
  },
  {
    id: '2',
    name: 'Dra. Patrícia Rocha',
    email: 'patricia.rocha@allergymed.com.br',
    role: 'medico',
    username: 'patricia.rocha',
    password: 'med123',
    crm: 'CRM/SP 654321',
    specialty: 'Alergologia e Imunologia',
    status: 'ativo',
    createdAt: '2024-01-05T08:00:00',
    updatedAt: '2024-01-05T08:00:00'
  },
  {
    id: '3',
    name: 'Dr. Rodrigo Lima',
    email: 'rodrigo.lima@allergymed.com.br',
    role: 'medico',
    username: 'rodrigo.lima',
    password: 'med456',
    crm: 'CRM/SP 789012',
    specialty: 'Imunologia Clínica',
    status: 'ativo',
    createdAt: '2024-02-10T08:00:00',
    updatedAt: '2024-02-10T08:00:00'
  },
  {
    id: '4',
    name: 'Enf. Juliana Santos',
    email: 'juliana.santos@allergymed.com.br',
    role: 'enfermeiro',
    username: 'juliana.santos',
    password: 'enf123',
    coren: 'COREN/SP 123789',
    status: 'ativo',
    createdAt: '2024-01-10T08:00:00',
    updatedAt: '2024-01-10T08:00:00'
  },
  {
    id: '5',
    name: 'Enf. Marcos Oliveira',
    email: 'marcos.oliveira@allergymed.com.br',
    role: 'enfermeiro',
    username: 'marcos.oliveira',
    password: 'enf456',
    coren: 'COREN/SP 456123',
    status: 'inativo',
    createdAt: '2024-03-15T08:00:00',
    updatedAt: '2024-03-15T08:00:00'
  }
]
