import React, { useState, useMemo, useRef, useEffect } from "react";
import styled from "styled-components";
import { Body, Header, Table } from "./Table.";
import LeagueRow from "./LeagueRow";
import { useLeagues } from "../../hooks/useLeagues";

export type LeaguepropsType = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
};

// Styled Components
const TableContainer = styled.div`
  margin: 0 -10px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  @media (min-width: 769px) {
    margin: 0;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 5px;
  margin: 20px 0;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 15px;
    margin: 80px 0 40px 0;
    padding: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  @media (min-width: 769px) {
    width: auto;
    flex: 1;
    min-width: 200px;
    max-width: 400px;
  }
`;

const ResultsInfo = styled.p`
  margin: 15px 0 15px 0;
  color: #666;
  font-size: 14px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;

const LoadingMessage = styled.div`
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: 16px;
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

const Hline = styled.hr`
  margin: 30px 0 30px 0;
  background-color:#e41827;
  height:2px;
  border-width:0
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin: 20px 0;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 769px) {
    width: auto;
    min-width: 200px;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 18px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  @media (min-width: 769px) {
    padding: 12px;
  }
`;

const DropdownArrow = styled.span<{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  font-size: 16px;

  @media (min-width: 769px) {
    font-size: 12px;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 12px 12px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style: none;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

  @media (min-width: 769px) {
    max-height: 200px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 16px;
  font-size: 16px;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#f8f9fa" : "white")};
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  min-height: 40px;
  display: flex;
  align-items: center;
  outline: none;

  &:hover {
    background-color: #e9ecef;
  }

  &:focus {
    background-color: #e3f2fd;
    outline: 2px solid #007bff;
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    background-color: #f8f9fa;
    font-weight: 600;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 769px) {
    padding: 12px 16px;
    min-height: auto;
    display: block;
  }
`;

function CustomDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const displayValue = value || "All Sports";
  const allOptions = ["", ...options]; // Include "All Sports" option
  const dropdownId = "sport-filter-dropdown";
  const buttonId = "sport-filter-button";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleSelect(allOptions[focusedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => 
            prev < allOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => 
            prev > 0 ? prev - 1 : allOptions.length - 1
          );
        }
        break;
      case "Home":
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(allOptions.length - 1);
        }
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
    
    // Announce selection to screen readers
    const announcement = selectedValue === "" ? "All Sports selected" : `${selectedValue} selected`;
    // Create a temporary element for screen reader announcement
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  };

  const handleItemClick = (selectedValue: string, index: number) => {
    setFocusedIndex(index);
    handleSelect(selectedValue);
  };

  const getItemAriaLabel = (sport: string, index: number) => {
    const isSelected = (sport === "" && value === "") || (sport === value);
    const position = `${index + 1} of ${allOptions.length}`;
    const sportName = sport === "" ? "All Sports" : sport;
    return `${sportName}, ${position}${isSelected ? ", selected" : ""}`;
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton 
        ref={buttonRef}
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={buttonId}
        aria-describedby={`${buttonId}-description`}
        id={buttonId}
      >
        <span>{displayValue}</span>
        <DropdownArrow isOpen={isOpen} aria-hidden="true">▼</DropdownArrow>
      </DropdownButton>
      
      {/* Hidden description for screen readers */}
      <span id={`${buttonId}-description`} style={{ display: 'none' }}>
        Use arrow keys to navigate options, Enter to select, Escape to close
      </span>

      <DropdownList 
        ref={listRef}
        isOpen={isOpen}
        role="listbox"
        aria-labelledby={buttonId}
        id={dropdownId}
        aria-activedescendant={focusedIndex >= 0 ? `${dropdownId}-option-${focusedIndex}` : undefined}
      >
        <DropdownItem
          isSelected={value === ""}
          onClick={() => handleItemClick("", 0)}
          role="option"
          aria-selected={value === ""}
          id={`${dropdownId}-option-0`}
          aria-label={getItemAriaLabel("", 0)}
          style={{ 
            backgroundColor: focusedIndex === 0 ? '#e9ecef' : undefined 
          }}
        >
          All Sports
        </DropdownItem>
        {options.map((sport, index) => {
          const optionIndex = index + 1;
          return (
            <DropdownItem
              key={sport}
              isSelected={value === sport}
              onClick={() => handleItemClick(sport, optionIndex)}
              role="option"
              aria-selected={value === sport}
              id={`${dropdownId}-option-${optionIndex}`}
              aria-label={getItemAriaLabel(sport, optionIndex)}
              style={{ 
                backgroundColor: focusedIndex === optionIndex ? '#e9ecef' : undefined 
              }}
            >
              {sport}
            </DropdownItem>
          );
        })}
      </DropdownList>
    </DropdownContainer>
  );
}

function LeagueTable() {
  const { data: leaguesData = [], isLoading, error } = useLeagues();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  // Memoize available sports to avoid recalculation
  const availableSports = useMemo(() => {
    if (!leaguesData.length) return [];
    const sports = [
      ...new Set(leaguesData.map((league) => league.strSport)),
    ] as string[];
    return sports.sort();
  }, [leaguesData]);

  // Memoize filtered leagues for better performance
  const filteredLeagues = useMemo(() => {
    let filtered = leaguesData;

    if (searchTerm) {
      filtered = filtered.filter((league) =>
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSport) {
      filtered = filtered.filter((league) => league.strSport === selectedSport);
    }

    return filtered;
  }, [leaguesData, searchTerm, selectedSport]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
  };

  if (isLoading) {
    return <LoadingMessage>Loading leagues...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error loading leagues: {error.message}</ErrorMessage>;
  }

  return (
    <TableContainer>
      <ControlsContainer>
        <SearchInput
          type="text"
          placeholder="Search leagues..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <CustomDropdown
          value={selectedSport}
          onChange={handleSportChange}
          options={availableSports}
        />
      </ControlsContainer>
      {(searchTerm || selectedSport) && (
        <ResultsInfo>
          Found {filteredLeagues.length} league
          {filteredLeagues.length !== 1 ? "s" : ""}
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedSport && ` in ${selectedSport}`}
        </ResultsInfo>
      )}
      <Hline />
      <Table columns=" 1fr 1fr 1fr">
        <Header>
          <div>League</div> <div>Sport</div> <div>LeagueAlternate</div>
        </Header>
        <Body
          data={filteredLeagues}
          render={(league) => (
            <LeagueRow league={league} key={league.idLeague} />
          )}
        />
      </Table>
    </TableContainer>
  );
}
export default LeagueTable;
