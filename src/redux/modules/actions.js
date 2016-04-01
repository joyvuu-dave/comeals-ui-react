export type ActionsSchema = {
  meal: {
    updateDescription: Function,
    updateExtras: Function,
    updateAutoClose: Function,
    closeMeal: Function
  },
  bills: {
    '1': {
      updateCook: Function,
      updateCost: Function
    },
    '2': {
      updateCook: Function,
      updateCost: Function
    },
    '3': {
      updateCook: Function,
      updateCost: Function
    }
  }
};
