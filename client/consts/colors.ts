export class Colors {
  blue = {
    50: "#94B2FE",
    100: "#E3EBFF",
    200: "#B8CCFE",
    300: "#94B2FE",
    400: "#3E74FE",
    500: "#195AFE",
  };
  carbon = {
    0: "#FFFFFF",
    15:"#FCFCFD",
    25: "#F7F7F8",
    50: "#E6E9EC",
    100: "#CBD1D7",
    200: "#B5BEC6",
    250: "#8995A1",
    300: "#6B7C8C",
    400: "#3A5166",
    500: "#092540",
    700:"#EAECF0",
  };

  midnight = {
    50: "#D8DCE8",
    100: "#B0B8D1",
    200: "#6F7EAB",
    300: "#435993",
    400: "#243C7B",
    500: "#16275D",
    600: "#0E1C48",
  };
  teal = {
    100: "#BDFDFF",
    200: "#87F4F8",
    300: "#6FE8EC",
    400: "#5FD5D9",
    500: "#3DB7BB",
    600: "#2F969D",
    700: "#0096AA",
    800:"#E7E7E7",
  };
  yellow = {
    100: "#FFF5D6",
    200: "#FFEAA8",
    300: "#FFDF7C",
    400: "#F9CF5A",
    500: "#DEA801",
    600: "#C18000",
  };
  red = {
    100: "#FFE6E6",
    200: "#FFC9C9",
    300: "#FCAAA5",
    350: "#F48080",
    400: "#E95F5F",
    500: "#BB3F3F",
    s100: "#FF442",
  };
  green = {
    100: "#DDFFD4",
    200: "#BDF0AF",
    300: "#A5E593",
    400: "#8ACD77",
    500: "#70AF5F",
    600: "#4FBF40",
  };
  orange = {
    100: "#FAA980",
  };

  PieChartColors_1 = [
    "#F62B2B",
    "#F68D2B",
    " #3A5AFE",
    "#49A677",
    "#DD00FF",
    "#2BF66F",
    "#2BCAF6",
    "#FFD200",
    "#00FFAE",
  ];
  ProgressColors_1 = [
    "#49A677",
    "#00FFAE",
    "#2BCAF6",
    "#2BF66F",
    "#3A5AFE",
    "#DD00FF",
    "#F62B2B",
    "#F68D2B",
    "#FFD200",
  ];


  /**
   * Shuffles the elements of the given array in place
   * @param array The array to be shuffled
   * @returns The shuffled array. Note that the original array is modified.
   */
  public shuffleArrayInPlace = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
}
export const color = new Colors();
