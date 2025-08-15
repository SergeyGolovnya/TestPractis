import React, { useState } from 'react';

export function PhoneNumberInput() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = Array.from(e.target.value)
      .filter(char => !isNaN(Number(char)) && char >= '0' && char <= '9')
      .join('')
      .slice(0, 10);
    let formatted = digits;

    if (digits.length > 3 && digits.length <= 6) {
      formatted = `(${digits.slice(0, 3)})${digits.slice(3)}`;
    } else if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    setValue(formatted);
  };

  return (
    <input
      data-testid="phone-number-input"
      value={value}
      onChange={handleChange}
    />
  );
}