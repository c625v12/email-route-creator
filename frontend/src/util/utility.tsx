export function stringNotInArrayValidator(
  disallowedValues: string[],
  domain: string,
  email: string
): boolean | '' | undefined {
  const checkedValue = checkString(email, domain);
  const regex = /\.\d{6}@/;
  disallowedValues.forEach((value) => {
    const match = regex.exec(value);
    if (match) {
      const startIndex = match.index;
      const substringBeforeMatch = value.substring(0, startIndex);
      disallowedValues[
        disallowedValues.indexOf(value)
      ] = `${substringBeforeMatch}@${domain}`;
    }
  });

  return checkedValue && disallowedValues.includes(`${checkedValue}@${domain}`);
}

export function checkString(email: string, domain: string): string | undefined {
  const previousValue = email;
  if (!previousValue) {
    return undefined;
  }
  const lastDotIndex = previousValue.lastIndexOf('.');
  const secondToLastDotIndex = previousValue.lastIndexOf('.', lastDotIndex - 1);
  if (secondToLastDotIndex !== -1 && previousValue.includes(`@${domain}`)) {
    return previousValue.slice(0, secondToLastDotIndex);
  }

  return undefined;
}

export function emailFormatter(control: string, domain: string) {
  const atIndex = control.lastIndexOf('@');
  const randomDigits = Math.floor(100000 + Math.random() * 900000);

  if (atIndex !== -1) {
    const currentDomain = control.substring(atIndex + 1);
    if (currentDomain !== domain) {
      return control.substring(0, atIndex + 1) + domain;
    }
  }
  if (!String(control).includes(`@${domain}`) && control) {
    return `${control}.${randomDigits}@${domain}`;
  }
}

export function handleControlClick(email: string | undefined, domain: string) {
  const previousValue = email;
  if (!previousValue) {
    return;
  }

  if (!previousValue.includes(`@${domain}`)) {
    return previousValue;
  }

  const lastDotIndex = previousValue.lastIndexOf('.');
  const secondToLastDotIndex = previousValue.lastIndexOf('.', lastDotIndex - 1);
  if (secondToLastDotIndex !== -1 && previousValue.includes(`@${domain}`)) {
    const newval = previousValue.slice(0, secondToLastDotIndex);
    return newval;
  }
}
