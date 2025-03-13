export type Filter = {
  checked: boolean;
  key: string;
  value: string;
  conditions: string[];  
};

export const initialFilters: Filter[] = [{
    key:"amount",
    checked:false,
    value:"",
    conditions: ["=","<",">"]
},
{
    key:"category",
    checked:false,
    value:"",
    conditions: ["is", "is not"]
},
{ key:"date",
    checked:false,
    value:"",
    conditions: ["=","<",">"],
},
{
    key:"businessName",
    checked:false,
    value:"",
    conditions:  ["is", "is not"]
},
{
    key:"cardNumber",
    checked:false,
    value:"",
    conditions:  ["is", "is not"]
}
]

