export interface Preset {
  id: string;
  name: string;
  tokens: string[];
}

export const presets: Preset[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Grammatical Standard English",
    tokens: ['begin', 'end', 'if', 'else', 'while', 'return', 'amor', 'sala'],
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "Summarize for a 2nd Grader",
    tokens: ['explain', 'simple', 'basic'],
  },
  {
    id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
    name: "Text to Command",
    tokens: ['execute', 'run', 'perform'],
  },
  {
    id: "cc198b13-4933-43aa-977e-dcd95fa30770",
    name: "Q&A",
    tokens: ['question', 'answer', 'inquire'],
  },
  {
    id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
    name: "English to Other Languages",
    tokens: ['translate', 'convert', 'interpret'],
  },
  {
    id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
    name: "Parse Unstructured Data",
    tokens: ['extract', 'analyze', 'process'],
  },
  {
    id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
    name: "Classification",
    tokens: ['classify', 'categorize', 'group'],
  },
  {
    id: "4641ef41-1c0f-421d-b4b2-70fe431081f3",
    name: "Natural Language to Python",
    tokens: ['code', 'script', 'program'],
  },
  {
    id: "48d34082-72f3-4a1b-a14d-f15aca4f57a0",
    name: "Explain Code",
    tokens: ['describe', 'clarify', 'elucidate'],
  },
  {
    id: "dfd42fd5-0394-4810-92c6-cc907d3bfd1a",
    name: "Chat",
    tokens: ['converse', 'communicate', 'discuss'],
  },
];
