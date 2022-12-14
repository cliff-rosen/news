export const entryTypesList = [
  {
    EntryTypeID: 1,
    EntryTypeName: "News Article",
    RequiresLink: 1,
  },
  {
    EntryTypeID: 2,
    EntryTypeName: "Scientific Publication",
    RequiresLink: 1,
  },
  {
    EntryTypeID: 3,
    EntryTypeName: "Resource",
    RequiresLink: 1,
  },
  {
    EntryTypeID: 4,
    EntryTypeName: "Question",
    RequiresLink: 0,
  },
  {
    EntryTypeID: 5,
    EntryTypeName: "Misc",
    RequiresLink: 0,
  },
];

export const substancesList = [
  {
    SubstanceID: 7,
    SubstanceName: "5-MeO-DMT",
  },
  {
    SubstanceID: 3,
    SubstanceName: "Ayahuasca",
  },
  {
    SubstanceID: 4,
    SubstanceName: "DMT",
  },
  {
    SubstanceID: 5,
    SubstanceName: "Ketamine",
  },
  {
    SubstanceID: 1,
    SubstanceName: "LSD",
  },
  {
    SubstanceID: 6,
    SubstanceName: "MDMA",
  },
  {
    SubstanceID: 2,
    SubstanceName: "Psilocybin",
  },
];

export const conditionsList = [
  {
    ConditionID: 5,
    ConditionName: "Addiction",
  },
  {
    ConditionID: 4,
    ConditionName: "ADHD",
  },
  {
    ConditionID: 2,
    ConditionName: "Anxiety",
  },
  {
    ConditionID: 1,
    ConditionName: "Depression",
  },
  {
    ConditionID: 3,
    ConditionName: "OCD",
  },
  {
    ConditionID: 6,
    ConditionName: "PTSD",
  },
];

/////////////////////////////////////////////

export const entryTypesMap = {
  1: "News Article",
  2: "Scientific Publication",
  3: "Resource",
  4: "Question",
  5: "Misc",
};

export const substancesMap = {
  7: "5-MeO-DMT",
  3: "Ayahuasca",
  4: "DMT",
  5: "Ketamine",
  1: "LSD",
  6: "MDMA",
  2: "Psilocybin",
};

export const conditionsMap = {
  5: "Addiction",
  4: "ADHD",
  2: "Anxiety",
  1: "Depression",
  3: "OCD",
  6: "PTSD",
};
