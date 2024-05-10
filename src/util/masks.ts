export const phoneFormat = (phone: string) => {
    const numericPhone = phone.replace(/\D+/g, '');
  
    if (numericPhone.length >= 11) {
      return numericPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numericPhone.length === 10) {
      return numericPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };
  
  export const maskCpfCnpj = (text: string) => {
    const value = text.replace(/\D/g, '');
    const { length } = value;
    if (length > 14) return;
    if (length > 11) {
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  export const zipCodeMask = (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  };
  
  export const formatMoney = (value: string) => {
    if (!value) return '';
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = (Number(formattedValue) / 100).toFixed(2) + '';
    formattedValue = formattedValue.replace('.', ',');
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `R$ ${formattedValue}`;
  };
  
  export const formatPercentage = (value: string) => {
    if (!value) return '';
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = (Number(formattedValue) / 100).toFixed(2) + '';
    formattedValue = formattedValue.replace('.', ',');
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `${formattedValue}`;
  };
  
  export const formatDate = (value: string) => {
    const dateValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const day = dateValue.slice(0, 2);
    const month = dateValue.slice(2, 4);
    const year = dateValue.slice(4, 8);
  
    let formattedDate = '';
  
    if (day) formattedDate += day;
    if (month) formattedDate += `/${month}`;
    if (year) formattedDate += `/${year}`;
  
    return formattedDate;
  };
  
  export type MaskType =
    | 'cpf'
    | 'cnpj'
    | 'phone'
    | 'money'
    | 'date'
    | 'percentage'
    | 'zipcode';
  
  export type FormatterData = (value: string) => string | undefined;
  
  export const getMaskForType = (type: MaskType | undefined): FormatterData => {
    switch (type) {
      case 'cpf' || 'cnpj':
        return maskCpfCnpj;
      case 'phone':
        return phoneFormat;
      case 'money':
        return formatMoney;
      case 'date':
        return formatDate;
      case 'percentage':
        return formatPercentage;
      case 'zipcode':
        return zipCodeMask;
      default:
        return (value: string) => value;
    }
  };
  