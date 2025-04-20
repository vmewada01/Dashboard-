import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  Chip,
} from "@mui/material";
import { MetricType, TableData } from "../types/data";
import { formatCurrency, formatPercentage } from "../utils/filterUtils";

interface DataTableProps {
  data: TableData[];
  selectedMetrics: MetricType[];
}

type Order = "asc" | "desc";

const DataTable: React.FC<DataTableProps> = ({ data, selectedMetrics }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<string>("current");
  const [orderMetric, setOrderMetric] = useState<MetricType>("mySpend");

  const metricsToDisplay =
    selectedMetrics.length > 0
      ? selectedMetrics
      : ["mySpend", "sameStoreSpend", "newStoreSpend", "lostStoreSpend"];

  const metricLabels: Record<MetricType, string> = {
    mySpend: "My Spend",
    sameStoreSpend: "Same Store Spend",
    newStoreSpend: "New Store Spend",
    lostStoreSpend: "Lost Store Spend",
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (metric: MetricType, property: string) => {
    const isAsc =
      orderMetric === metric && orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setOrderMetric(metric);
  };

  const createSortHandler =
    (metric: MetricType, property: string) =>
    () => {
      handleRequestSort(metric, property);
    };

  // Sort function
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const valueA =
        a.metrics[orderMetric]?.[
          orderBy as keyof (typeof a.metrics)[MetricType]
        ] || 0;
      const valueB =
        b.metrics[orderMetric]?.[
          orderBy as keyof (typeof b.metrics)[MetricType]
        ] || 0;

      return order === "asc" ? valueA - valueB : valueB - valueA;
    });
  }, [data, order, orderBy, orderMetric]);

  // Apply pagination
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        mb: 3,
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  backgroundColor: "#f5f5f5",
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  boxShadow: "2px 0px 3px rgba(0,0,0,0.1)",
                }}
              >
                Attributes
              </TableCell>

              {metricsToDisplay.map((metric: any) => (
                <React.Fragment key={metric}>
                  <TableCell
                    align="right"
                    colSpan={4}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {(metricLabels as any)[metric]}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>

            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#f5f5f5",
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  boxShadow: "2px 0px 3px rgba(0,0,0,0.1)",
                }}
              >
                Group
              </TableCell>

              {metricsToDisplay.map((metric: any) => (
                <React.Fragment key={metric}>
                  <TableCell align="right" sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableSortLabel
                      active={orderMetric === metric && orderBy === "current"}
                      direction={
                        orderMetric === metric && orderBy === "current"
                          ? order
                          : "asc"
                      }
                      onClick={createSortHandler(metric, "current")}
                    >
                      Current
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableSortLabel
                      active={orderMetric === metric && orderBy === "reference"}
                      direction={
                        orderMetric === metric && orderBy === "reference"
                          ? order
                          : "asc"
                      }
                      onClick={createSortHandler(metric, "reference")}
                    >
                      Reference
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableSortLabel
                      active={
                        orderMetric === metric && orderBy === "absoluteChange"
                      }
                      direction={
                        orderMetric === metric && orderBy === "absoluteChange"
                          ? order
                          : "asc"
                      }
                      onClick={createSortHandler(metric, "absoluteChange")}
                    >
                      Abs Chg
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableSortLabel
                      active={
                        orderMetric === metric && orderBy === "percentChange"
                      }
                      direction={
                        orderMetric === metric && orderBy === "percentChange"
                          ? order
                          : "asc"
                      }
                      onClick={createSortHandler(metric, "percentChange")}
                    >
                      % Chg
                    </TableSortLabel>
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      position: "sticky",
                      left: 0,
                      backgroundColor: "white",
                      zIndex: 1,
                      boxShadow: "2px 0px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {row.attributeValue}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.attribute}
                    </Typography>
                  </TableCell>

                  {metricsToDisplay.map((metric: any) => {
                    const metricData = (row.metrics as any)[metric];
                    if (!metricData) return null;

                    return (
                      <React.Fragment key={`${row.id}-${metric}`}>
                        <TableCell align="right">
                          {formatCurrency(metricData.current)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(metricData.reference)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(metricData.absoluteChange)}
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={formatPercentage(metricData.percentChange)}
                            size="small"
                            sx={{
                              backgroundColor:
                                metricData.percentChange >= 0
                                  ? "rgba(46, 125, 50, 0.1)"
                                  : "rgba(211, 47, 47, 0.1)",
                              color:
                                metricData.percentChange >= 0
                                  ? "success.dark"
                                  : "error.dark",
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={metricsToDisplay.length * 4 + 1}
                  align="center"
                >
                  <Typography variant="body2" color="text.secondary" py={2}>
                    No data available for the selected filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
