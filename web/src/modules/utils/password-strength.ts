const hasNumber = (content: string) => new RegExp(/[0-9]/).test(content);

const hasMixed = (content: string) => new RegExp(/[a-z]/).test(content) && new RegExp(/[A-Z]/).test(content);

const hasSpecial = (content: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(content);

export const strengthColor = (count: number) => {
  if (count < 2) return { label: 'Poor', color: 'error.main' };
  if (count < 3) return { label: 'Weak', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Good', color: 'success.main' };
  if (count < 6) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

export const strengthIndicator = (number: any) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};