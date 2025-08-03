export function reducer(state: any, action: any) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  else if (action.type === 'decrement_age') {
    return {
      age: state.age - 1
    };
  }

  throw Error('Unknown action.');
}