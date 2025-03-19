import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { getTransactions } from "../api/transactionApi";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TableSortLabel, Paper, TablePagination
} from "@mui/material";
import { getFormattedDate } from '../utility';
import "../styles/TransactionsList.css";

const TransactionsList = forwardRef(({ walletId, exportCsvRef }, ref) => {
    const [transactions, setTransactions] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [orderBy, setOrderBy] = useState("date");
    const [hasMore, setHasMore] = useState(true);
    const [order, setOrder] = useState("desc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchTransactions();
    }, [walletId, page, rowsPerPage]);

    const fetchTransactions = async () => {
        const response = await getTransactions(walletId, page * rowsPerPage, rowsPerPage);
        setTransactions(response.data.transactions);
        setTotalCount(response.data.totalCount || 0);
        setHasMore(response.data.hasMore || false);
    };

    const handleSort = (property) => {
        setOrderBy(property);
        setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        if (orderBy === "date") {
            return order === "asc"
                ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (orderBy === "amount") {
            return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
        }
        return order === "asc" ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
    });

    const downloadCSV = (csvContent, filename) => {
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToCSV = () => {
        const csvHeaders = "Type,Amount,Description,Date\n";
        const csvRows = transactions.map(txn => (
            `${txn.type},${txn.amount.toString().replace(/,/g, '')},${txn.description.toString().replace(/,/g, '')},${getFormattedDate(txn.createdAt)}`
        ));
        const csvContent = csvHeaders + csvRows.join("\n");
        downloadCSV(csvContent, `transactions_${new Date().getTime()}.csv`);
    };

    useImperativeHandle(exportCsvRef, () => exportToCSV);

    return (
        <div className="transactions-container">
            <h1>Transaction History</h1>
            <TableContainer component={Paper}>
                <Table className="transaction-table">
                    <TableHead>
                        <TableRow>
                            {[
                                { key: "type", label: "Type" },
                                { key: "amount", label: "Amount" },
                                { key: "description", label: "Description" },
                                { key: "date", label: "Date" }
                            ].map((column) => (
                                <TableCell key={column.key}>
                                    <TableSortLabel
                                        active={orderBy === column.key}
                                        direction={orderBy === column.key ? order : "asc"}
                                        onClick={() => handleSort(column.key)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTransactions.map((txn) => (
                            <TableRow key={txn.id}>
                                <TableCell>{txn.type}</TableCell>
                                <TableCell>₹{txn.amount}</TableCell>
                                <TableCell>{txn.description}</TableCell>
                                <TableCell>{getFormattedDate(txn.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                slotProps={{
                    actions: {
                        nextButton: { disabled: !hasMore },
                    },
                }}
            />
        </div>
    );
});

export default TransactionsList;