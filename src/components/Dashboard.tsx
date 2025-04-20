import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  mockUsers,
  getAllSectors,
  getAllCategories,
  timeSeriesData,
} from "../data/mockData";
import { User, FilterState, DataItem, TableData } from "../types/data";
import { filterData, groupDataByAttributes } from "../utils/filterUtils";
import { BarChart, LineChart } from "lucide-react";
import DataTable from "./DataTable";
import BarChartView from "./BarChartView";
import TimeSeriesChart from "./TimeSeriesChart";
import ComparisonChart from "./ComparisonChart";
import FilterPanel from "./FilterPanel";
import UserSelector from "./UserSelector";

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [filters, setFilters] = useState<FilterState>({
    startDate: thirtyDaysAgo,
    endDate: yesterday,
    sectors: [],
    categories: [],
    groupingAttributes: [],
    metrics: [],
  });

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    setAvailableSectors(getAllSectors());
    setAvailableCategories(getAllCategories());
  }, [currentUser]);

  useEffect(() => {
    const filteredData = filterData(currentUser.data, filters);

    const groupedData = groupDataByAttributes(
      filteredData,
      filters.groupingAttributes,
      filters.metrics
    );

    setTableData(groupedData);
  }, [currentUser, filters]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleUserChange = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F9FAFB",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeIn 0.8s ease-in-out",
            }}
          >
            Analytics Dashboard
          </Typography>
          <UserSelector
            users={mockUsers}
            currentUser={currentUser}
            onSelectUser={handleUserChange}
          />
        </Toolbar>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
          sx={{ px: 2 }}
        >
          <Tab
            icon={<BarChart size={16} />}
            iconPosition="start"
            label="Metrics View"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              transition: "all 0.2s",
              "&.Mui-selected": {
                fontWeight: 600,
              },
            }}
          />
          <Tab
            icon={<LineChart size={16} />}
            iconPosition="start"
            label="Analytics View"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              transition: "all 0.2s",
              "&.Mui-selected": {
                fontWeight: 600,
              },
            }}
          />
        </Tabs>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, md: 3 },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            availableSectors={availableSectors}
            availableCategories={availableCategories}
          />

          {currentTab === 0 ? (
            <Box>
              <DataTable data={tableData} selectedMetrics={filters.metrics} />
              <BarChartView
                data={tableData}
                selectedMetrics={filters.metrics}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TimeSeriesChart
                data={timeSeriesData}
                selectedMetrics={filters?.metrics}
                title="Spend Over Time"
              />
              <ComparisonChart
                data={tableData}
                selectedMetrics={filters.metrics}
              />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
