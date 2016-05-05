
- Create a Guest / Meal-Resident
  * uuid gets created for the id
  * record attempts to get saved to database
  * while it's being processed, no further changes can be made to it (locked)
  * if successful, uuid replaced with id
  * if un-successful, record removed by uuid



BUGS

MealResident Removal
====================
- add _destroy operator
- don't dispaly checkboxes of one's w/ _destroy




const resident = new Schema('residents')
const meal = new Schema('meals')
const guest = new Schema('guests')
const attendee = new Schema('attendees')
const bill = new Schema('bills')

meal.define({

})
