/** @format */

export function updateObject(oldObject, updatedProperties) {
  return {
    ...oldObject,
    ...updatedProperties,
  };
}

export const updateField = (object, setObject, prop, value) => {
  setObject(
    updateObject(object, {
      [prop]: value,
    })
  );
  return object;
};
