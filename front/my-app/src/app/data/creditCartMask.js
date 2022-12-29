export const creditCartMask = [
  {
    mask: "0000 000000 00000",
    startsWith: "^3[47]\\d{0,13}",
    lazy: false,
    cardtype: "american express",
  },
  {
    mask: "0000 0000 0000 0000",
    startsWith: "^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}",
    lazy: false,
    cardtype: "discover",
  },
  {
    mask: "0000 000000 0000",
    startsWith: "^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}",
    lazy: false,
    cardtype: "diners",
  },
  {
    mask: "0000 0000 0000 0000",
    startsWith: "^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}",
    lazy: false,
    cardtype: "mastercard",
  },
  {
    mask: "0000 000000 00000",
    startsWith: "^(?:2131|1800)\\d{0,11}",
    lazy: false,
    cardtype: "jcb15",
  },
  {
    mask: "0000 0000 0000 0000",
    startsWith: "^(?:35\\d{0,2})\\d{0,12}",
    lazy: false,
    cardtype: "jcb",
  },
  {
    mask: "0000 0000 0000 0000",
    startsWith: "^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}",
    lazy: false,
    cardtype: "maestro",
  },
  {
    mask: "0000 0000 0000 0000",
    startsWith: "^4\\d{0,15}",
    lazy: false,
    cardtype: "visa",
  },
  {
    mask: "0000 0000 0000 0000",
    startsWith: "^62\\d{0,14}",
    lazy: false,
    cardtype: "unionpay",
  },
  {
    mask: "0000 0000 0000 0000",
    cardtype: "Unknown",
  },
];
