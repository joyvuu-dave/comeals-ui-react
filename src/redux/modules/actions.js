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
  },
  meal_residents: {
    addMealResident: Function,
    removeMealResident: Function,
    toggleVeg: Function,
    toggleLate: Function,
    toggleGuestModal: Function
  }
  guests: {
    remove: Function,
    toggleVeg: Function
  },
  guest_modal: {
    close: Function,
    updateVeg: Function,
    updateMultiplier: Function,
    addGuest: Function
  }
};
