import React from "react";
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FilterState, GroupingAttribute, MetricType } from "../types/data";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableSectors: string[];
  availableCategories: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  availableSectors,
  availableCategories,
}) => {
  const groupingAttributes: { value: GroupingAttribute; label: string }[] = [
    { value: "country", label: "Country" },
    { value: "state", label: "State" },
    { value: "city", label: "City" },
    { value: "sector", label: "Sector" },
    { value: "category", label: "Category" },
  ];

  const metricOptions: { value: MetricType; label: string }[] = [
    { value: "mySpend", label: "My Spend" },
    { value: "sameStoreSpend", label: "Same Store Spend" },
    { value: "newStoreSpend", label: "New Store Spend" },
    { value: "lostStoreSpend", label: "Lost Store Spend" },
  ];

  const handleStartDateChange = (date: Date | null) => {
    setFilters({
      ...filters,
      startDate: date,
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    setFilters({
      ...filters,
      endDate: date,
    });
  };

  const handleSectorChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      sectors: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      categories: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleAttributeChange = (
    event: SelectChangeEvent<GroupingAttribute[]>
  ) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      groupingAttributes:
        typeof value === "string"
          ? (value.split(",") as GroupingAttribute[])
          : (value as GroupingAttribute[]),
    });
  };

  const handleMetricChange = (event: SelectChangeEvent<MetricType[]>) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      metrics:
        typeof value === "string"
          ? (value.split(",") as MetricType[])
          : (value as MetricType[]),
    });
  };

  // Determine the maximum selectable date (yesterday)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Determine the minimum selectable date (12 months ago)
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        mb: 3,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Filters
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
          >
            <DatePicker
              label="Start Date"
              value={filters.startDate}
              onChange={handleStartDateChange}
              maxDate={yesterday}
              minDate={twelveMonthsAgo}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={filters.endDate}
              onChange={handleEndDateChange}
              maxDate={yesterday}
              minDate={filters.startDate || twelveMonthsAgo}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="sector-label">Sector</InputLabel>
          <Select
            labelId="sector-label"
            id="sector-select"
            multiple
            value={filters.sectors}
            onChange={handleSectorChange}
            input={<OutlinedInput label="Sector" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {availableSectors.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            multiple
            value={filters.categories}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {availableCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="attribute-label">Grouping Attributes</InputLabel>
          <Select
            labelId="attribute-label"
            id="attribute-select"
            multiple
            value={filters.groupingAttributes}
            onChange={handleAttributeChange}
            input={<OutlinedInput label="Grouping Attributes" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      groupingAttributes.find((attr) => attr.value === value)
                        ?.label || value
                    }
                    size="small"
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {groupingAttributes.map((attribute) => (
              <MenuItem key={attribute.value} value={attribute.value}>
                {attribute.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="metric-label">Metrics</InputLabel>
          <Select
            labelId="metric-label"
            id="metric-select"
            multiple
            value={filters.metrics}
            onChange={handleMetricChange}
            input={<OutlinedInput label="Metrics" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      metricOptions.find((m) => m.value === value)?.label ||
                      value
                    }
                    size="small"
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {metricOptions.map((metric) => (
              <MenuItem key={metric.value} value={metric.value}>
                {metric.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
