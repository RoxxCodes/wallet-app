import BigNumber from "bignumber.js";

export const getFormattedDate = (datetinme) => {
    const date = new Date(datetinme);
    const datePart = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const timePart = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return `${datePart} ${timePart}`;
}

export const sortTransactions = (transactions, orderBy, order) => {
    return [...transactions].sort((a, b) => {
        if (orderBy === "date") {
            return order === "asc"
                ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (orderBy === "amount") {  
            return order === "asc"
                ? new BigNumber(a.amount).comparedTo(new BigNumber(b.amount))
                : new BigNumber(b.amount).comparedTo(new BigNumber(a.amount));
        }
        return order === "asc"
            ? a[orderBy].localeCompare(b[orderBy])
            : b[orderBy].localeCompare(a[orderBy]);
    });
};