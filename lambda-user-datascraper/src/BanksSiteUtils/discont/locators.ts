export const login_discont = {
  inputIdNumber: `input[name="tzId"]`,
  inputPassword: `input[name="tzPassword"]`,
  inputRecCode: `input[name="aidnum"]`,
  buttonSubmit: `button[type="submit"]`,
};
export const login_max = {
  login_with_password_option: `[id*=login-password-link]`,
  inputUserName: `input[id*=user-name]`,
  inputPassword: `input[id*=password]`,
  buttonSubmit: "button[id*=send-code]",
  check: "input[id*=appnumberwithoutsymbol]",
};
export const navigate = {
  // sideBarOsh: "li:nth-of-type(5) p",
  sideBarOsh: `a[id*=OSH]`,
  sideBarCreditCard: "li:nth-of-type(5) p",
  // sideBarCreditCard: "a[id*=CC_MAIN_WORLD-link]",
  sideBarCreditCardMax:
    "li:nth-of-type(1) li:nth-of-type(3) > a:nth-of-type(1) > p",
  // sideBarCreditCardMax: "a[id*=CRDT_LEUMI_CARD_WEBSITE_INFO]",
  approveMaxRedirect: "div.modal a",
  // approveMaxRedirect: "a[class*=general-btn]",
  sideBarSubMenuLink: `a[id*=OSH_LENTRIES_ALTAMIRA]`,
};
export const expensesTable = {
  rows: `div.table-body [id*=rc-table-row-]`,
};
export const max = {
  popUp_dismiss: "button[data-dismiss]",
  recentExpensesInExcelButton: "span[class*=download-excel]",
  expensesInfoButton: "a[class*=action]",
};
