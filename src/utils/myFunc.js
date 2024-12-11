export const conditionalColumnFiltering = ({ data, filters }) => {
  return data.filter((item) => {
    const isMatch = filters.every((query) => {
      const label = query.label;
      const option = query.option.toLowerCase();
      const value = query.value.toLowerCase();

      if (item[label] !== undefined) {
        const fieldValue = item[label].toString().toLowerCase();

        switch (option) {
          case "begins with":
            return fieldValue.startsWith(value);
          case "contains":
            return fieldValue.includes(value);
          case "greater than":
            const numericFieldValueGT = parseFloat(fieldValue.replace(/[^0-9.]/g, ""));
            const numericQueryValueGT = parseFloat(value.replace(/[^0-9.]/g, ""));
            return (
              !isNaN(numericFieldValueGT) &&
              !isNaN(numericQueryValueGT) &&
              numericFieldValueGT > numericQueryValueGT
            );
          case "less than":
            const numericFieldValueLT = parseFloat(fieldValue.replace(/[^0-9.]/g, ""));
            const numericQueryValueLT = parseFloat(value.replace(/[^0-9.]/g, ""));
            return (
              !isNaN(numericFieldValueLT) &&
              !isNaN(numericQueryValueLT) &&
              numericFieldValueLT < numericQueryValueLT
            );
          case "equal to":
            return fieldValue === value;
          case "not equal to":
            return fieldValue !== value;
          default:
            return false;
        }
      }

      return false;
    });
    return isMatch ? item : null;
  });
};

export const swapColumns = (fromIndex, toIndex, columns, setColumns) => {
  const updatedHeaders = [...columns];

  // Swap headers
  const [movedHeader] = updatedHeaders.splice(fromIndex, 1);
  updatedHeaders.splice(toIndex, 0, movedHeader);

  setColumns(updatedHeaders);
};
