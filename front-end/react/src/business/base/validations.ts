import { TextService } from '../../utils';

export interface ValidationResults {
  message?: string;
  fieldsValues?: string[];
  fieldsNames?: string[];
}

export const getRequiredMessage = (
  fieldsValues: string[] = [],
  texts: string[] = [],
  fieldsNames: string[] = []
): ValidationResults | null => {
  const messages: string[] = [];
  const fields: string[] = [];
  const names: string[] = [];
  fieldsValues.forEach((field: string, index: number) => {
    if (!field) {
      messages.push(texts[index]);
      fields.push(fieldsValues[index]);
      names.push(fieldsNames[index]);
    }
  });
  return messages.length === 0
    ? null
    : {
        message: TextService.messages.required(messages.length === 1 ? messages[0] : messages),
        fieldsValues: fields,
        fieldsNames: fieldsNames
      };
};

export const getRequiredMessagePromise = (
  fieldsValues: string[] = [],
  texts: string[] = [],
  fieldsNames: string[] = []
): Promise<ValidationResults> | null => {
  const message = getRequiredMessage(fieldsValues, texts, fieldsNames);
  if (message) {
    return new Promise((resolve, reject) => {
      reject(message);
    });
  } else {
    return null;
  }
};

export const getFormatMessagePromise = (
  fieldsValues: string[] = [],
  funcs: Function[] = [],
  texts: string[] = [],
  fieldsNames: string[] = []
): Promise<ValidationResults> | null => {
  const messages: string[] = [];
  const fields: string[] = [];
  const names: string[] = [];
  fieldsValues.forEach((field: string, index: number) => {
    if (field && !funcs[index](field)) {
      messages.push(texts[index]);
      fields.push(fields[index]);
      names.push(fieldsNames[index]);
    }
  });
  if (messages.length > 0) {
    return new Promise((resolve, reject) => {
      reject({
        message: TextService.messages.invalidFormat(messages),
        fields: fields,
        fieldsNames: names
      });
    });
  } else {
    return null;
  }
};
