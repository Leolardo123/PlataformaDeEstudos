import { ZodError, type ZodIssue } from 'zod';

type WithInst = ZodIssue & {
  inst?: {
    description?: string;
    _def?: { description?: string; meta?: { label?: string } };
    _zod?: { def?: { description?: string; meta?: { label?: string } } };
  };
};

const formatPath = (path: Array<string | number> = []): string => {
  if (!path.length) return 'valor';

  return path
    .map((segment, index) => {
      if (typeof segment === 'number') return `[${segment}]`;
      return index === 0 ? segment : `.${segment}`;
    })
    .join('');
};

const getFieldLabel = (issue: ZodIssue): string => {
  const issueWithInst = issue as WithInst;
  const labelFromSchema =
    issueWithInst.inst?.description ??
    issueWithInst.inst?._def?.meta?.label ??
    issueWithInst.inst?._def?.description ??
    issueWithInst.inst?._zod?.def?.meta?.label ??
    issueWithInst.inst?._zod?.def?.description;

  return labelFromSchema?.trim() || formatPath(issue.path as Array<string | number>);
};

const formatOptions = (values: unknown[] | undefined): string => {
  if (!values?.length) return '';
  const options = values.map((option) => JSON.stringify(option)).join(', ');
  return `. Opcoes permitidas: ${options}`;
};

export const formatZodIssue = (issue: ZodIssue): string => {
  const field = getFieldLabel(issue);

  if (issue.code === 'invalid_type') {
    if ('input' in issue && issue.input === undefined) {
      return `${field} e obrigatorio`;
    }

    const expected = issue.expected || 'valor';
    return `${field} nao e um ${expected} valido`;
  }

  if (issue.code === 'invalid_format') {
    const format = issue.format || 'valor';
    return `${field} nao possui um formato ${format} valido`;
  }

  if (issue.code === 'too_small') {
    if (issue.origin === 'string') {
      return `${field} deve conter no minimo ${issue.minimum} caracteres`;
    }

    if (issue.origin === 'number' || issue.origin === 'bigint') {
      return `${field} deve ser maior ou igual a ${issue.minimum}`;
    }

    if (issue.origin === 'array') {
      return `${field} deve conter no minimo ${issue.minimum} itens`;
    }
  }

  if (issue.code === 'too_big') {
    if (issue.origin === 'string') {
      return `${field} deve conter no maximo ${issue.maximum} caracteres`;
    }

    if (issue.origin === 'number' || issue.origin === 'bigint') {
      return `${field} deve ser menor ou igual a ${issue.maximum}`;
    }

    if (issue.origin === 'array') {
      return `${field} deve conter no maximo ${issue.maximum} itens`;
    }
  }

  if (issue.code === 'invalid_value') {
    const values = 'values' in issue && Array.isArray(issue.values) ? issue.values : undefined;
    return `${field} possui um valor invalido${formatOptions(values)}`;
  }

  if (issue.code === 'unrecognized_keys') {
    const keys = issue.keys.join(', ');
    return `Campo(s) inesperado(s): ${keys}`;
  }

  if (issue.code === 'invalid_union') {
    return `${field} nao corresponde a nenhuma opcao valida do schema`;
  }

  if (issue.code === 'not_multiple_of') {
    return `${field} deve ser multiplo de ${issue.divisor}`;
  }

  return issue.message || `${field} e invalido`;
};

export const formatZodIssues = (issues: ZodIssue[]): string[] => {
  return issues.map(formatZodIssue);
};

export const formatZodError = (error: ZodError): string[] => {
  return formatZodIssues(error.issues);
};