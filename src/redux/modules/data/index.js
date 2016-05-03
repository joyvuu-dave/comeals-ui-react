export const DUMMY_DATA = {
  '1': {
    id: 1,
    description: 'Pizza, salad, and cake',
    date: 'Sun May 1, 2016',
    epoch: Date.parse(new Date(2016, 4, 1)),
    max: 5,
    auto_close: false,
    closed_in_database: true,
    reconciled: false,
    nextId: 2,
    prevId: '',
    residents: [
      {id: 1, name: 'David', unit: 'V', vegetarian: false},
      {id: 2, name: 'Laura', unit: 'V', vegetarian: true},
      {id: 3, name: 'George', unit: 'F', vegetarian: false},
      {id: 4, name: 'Jane', unit: 'F', vegetarian: false}
    ],
    bills: [
      {amount: '50.00', id: 1, resident_id: 1}
    ],
    meal_residents: [
      {id: 1, resident_id: 1, vegetarian: true, late: false},
      {id: 2, resident_id: 4, vegetarian: false, late: true}
    ],
    guests: [
      {id: 1, resident_id: 4, multiplier: 2, vegetarian: false},
      {id: 2, resident_id: 4, multiplier: 1, vegetarian: true}
    ]
  },
  '2': {
    id: 2,
    description: 'Tacos, ice cream',
    date: 'Mon May 2, 2016',
    epoch: Date.parse(new Date(2016, 4, 2)),
    max: null,
    auto_close: false,
    closed_in_database: false,
    reconciled: false,
    nextId: 3,
    prevId: 1,
    residents: [
      {id: 1, name: 'David', unit: 'V', vegetarian: false},
      {id: 2, name: 'Laura', unit: 'V', vegetarian: true},
      {id: 3, name: 'George', unit: 'F', vegetarian: false},
      {id: 4, name: 'Jane', unit: 'F', vegetarian: false}
    ],
    bills: [
      {amount: '35.00', id: 2, resident_id: 2}
    ],
    meal_residents: [
      {id: 3, resident_id: 3, vegetarian: true, late: false},
      {id: 4, resident_id: 4, vegetarian: false, late: true}
    ],
    guests: [
      {id: 3, resident_id: 3, multiplier: 1, vegetarian: false}, // FIXME: order by resident_id, then id
      {id: 4, resident_id: 3, multiplier: 2, vegetarian: true}
    ]
  },
  '3': {
    id: 3,
    description: 'Soup, bread, jello',
    date: 'Tues May 3, 2016',
    epoch: Date.parse(new Date(2016, 4, 3)),
    max: null,
    auto_close: true,
    closed_in_database: false,
    reconciled: false,
    nextId: '',
    prevId: 2,
    residents: [
      {id: 1, name: 'David', unit: 'V', vegetarian: false},
      {id: 2, name: 'Laura', unit: 'V', vegetarian: true},
      {id: 3, name: 'George', unit: 'F', vegetarian: false},
      {id: 4, name: 'Jane', unit: 'F', vegetarian: false}
    ],
    bills: [],
    meal_residents: [],
    guests: []
  }
}
