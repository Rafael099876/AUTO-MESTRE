
export interface Tool {
  name: string;
  description: string;
}

export interface Part {
  name:string;
  specification: string;
}

export interface GuideStep {
  step: number;
  title: string;
  instruction: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface Guide {
  vehicle: string;
  task: string;
  tools: Tool[];
  parts: Part[];
  steps: GuideStep[];
}
