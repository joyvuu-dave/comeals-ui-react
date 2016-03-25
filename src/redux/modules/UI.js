/* @flow */
export type UISchema = {
  menu_textarea: {
    disabled: boolean
  },
  cook_select: {
    disabled: boolean
  },
  cost_input: {
    disabled: boolean
  },
  extras_input: {
    disabled: boolean,
    value: string
  },
  close_button: {
    hidden: boolean
  },
  auto_close_checkbox: {
    hidden: boolean
  },
  attendance_checkbox: {
    checked: {
      disabled: boolean
    },
    unchecked: {
      disabled: boolean
    }
  },
  attendee_veg_checkbox: {
    disabled: boolean
  },
  attendee_late_checkbox: {
    disabled: boolean
  },
  add_guest_button: {
    disabled: boolean
  },
  guest_veg_checkbox: {
    disabled: boolean
  },
  remove_guest_button: {
    disabled: boolean
  }
};

export type ReducedUISchema = {
  menu_textarea: {
    disabled: boolean
  }
};
