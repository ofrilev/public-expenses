export const getBusinessesSummary = (categoryMonthData: [{ business_name: string, date: string, amount: number }]) => {
    const businessNamesSet = new Set<string>();
    let modifiedCategoryMonthData: { [business_name: string]: { totalAmount: number, expenses: { date: string, amount: number }[] } } = {};
    categoryMonthData.forEach(({business_name, date, amount}) => {
        if (businessNamesSet.has(business_name)) {
            modifiedCategoryMonthData[business_name].totalAmount += amount;
            modifiedCategoryMonthData[business_name].expenses.push({date, amount});
        } else {
            modifiedCategoryMonthData[business_name] = {
                totalAmount: amount,
                expenses: [{date, amount}]
            };
            businessNamesSet.add(business_name)
        }
    });
    return modifiedCategoryMonthData
}

export const buildCategoriesHierarchy = (categoriesObjArray: any[]) => {
    const dictionary = {};

    const findChildren = (parent: number) => {
        const children = categoriesObjArray.filter((obj) => obj.parent === parent);

        if (children.length === 0) {
            return {} ;
        }

        const result = {};
        children.forEach((child) => {
            const childResult = findChildren(child.id);
            if (childResult !== undefined) {
                // @ts-ignore
                result[child.category] = childResult;
            }
        });

        return result;
    };

    categoriesObjArray.forEach((obj) => {
        if (obj.parent === null) {
            const topLevelChildren = findChildren(obj.id);
            if (topLevelChildren !== undefined) {
                // @ts-ignore
                dictionary[obj.category] = topLevelChildren;
            }
        }
    });

    return dictionary;
};

export const escapedString = (input: string): string =>   {
    const specialChars = /['"`]/g;
    const escapeMap: Record<string, string> = {
        "'": "\\'",
        '"': '\\"',
        '`': '\\`',
    };

    return input.replace(specialChars, (char) => escapeMap[char]);
}

