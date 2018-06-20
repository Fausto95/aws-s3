export const dateISOString = new Date(+new Date() + 864e5).toISOString();
export const xAmzDate = dateISOString.split('-').join('').split(':').join('').split('.').join('');
export const dateYMD = dateISOString.split('T')[0].split('-').join('');