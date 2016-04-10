
- Create a Guest / Meal-Resident
  * uuid gets created for the id
  * record attempts to get saved to database
  * while it's being processed, no further changes can be made to it (locked)
  * if successful, uuid replaced with id
  * if un-successful, record removed by uuid
