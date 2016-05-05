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
  mealResidents: {
    addMealResident: Function,
    removeMealResident: Function,
    toggleVeg: Function,
    toggleLate: Function,
    toggleGuestModal: Function
  },
  guests: {
    remove: Function,
    toggleVeg: Function
  },
  guestModal: {
    close: Function,
    updateVeg: Function,
    updateMultiplier: Function,
    addGuest: Function
  }
};

export type MealSchema = {
  id: number,
  description: string,
  date: string,
  epoch: number,
  max: number,
  auto_close: boolean,
  closed: boolean,
  reconciled: boolean,
  prevId: number,
  nextId: number
};

export type MealResidentSchema = {
  resident_id: number,
  vegetarian: boolean,
  late: boolean
};

export type ResidentSchema = {
  id: number,
  name: string,
  unit: string,
  vegetarian: boolean
};

export type ResidentsSchema = Array<ResidentSchema>;

export type BillSchema = {
  id: number,
  resident_id: number,
  amount: string
};

export type BillsSchema = {
  '1': BillSchema,
  '2': BillSchema,
  '3': BillSchema
};

export type GuestSchema = {
  id: number,
  cid: string,
  resident_id: number,
  multiplier: number,
  vegetarian: boolean
};

export type GuestsSchema = Array<GuestSchema>;

export type UISchema = {
  menu_textarea_disabled: boolean,
  cook_select_disabled: boolean,
  cost_input_disabled: boolean,
  extras_input_hidden: boolean,
  extras_input_disabled: boolean,
  close_button_hidden: boolean,
  close_button_disabled: boolean,
  auto_close_checkbox_hidden: boolean,
  auto_close_checkbox_disabled: boolean,
  checked_attendance_checkbox_disabled: boolean,
  unchecked_attendance_checkbox_disabled: boolean,
  attendee_veg_checkbox_disabled: boolean,
  attendee_late_checkbox_disabled: boolean,
  add_guest_button_disabled: boolean,
  guest_veg_checkbox_disabled: boolean,
  remove_guest_button_disabled: boolean
};

export type GuestModalSchema = {
  open: boolean,
  host: string,
  resident_id: number,
  multiplier: number,
  vegetarian: boolean
};
