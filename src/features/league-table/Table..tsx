import { createContext,useContext } from "react";
import styled from "styled-components";


const StyledTable = styled.div`
  border: none;
  font-size: 1.4rem;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: transparent;
  overflow: visible;
  margin-top: 30px;

  @media (min-width: 769px) {
    border: 1px solid var(--color-grey-200);
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
    margin-top: 0;
  }
`;
interface CommonRowProps {
  columns: string; 
}


const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 0;
  row-gap: 0.8rem;
  align-items: center;
  transition: none;

  @media (min-width: 769px) {
    grid-template-columns: ${(props) => props.columns};
    column-gap: 2.4rem;
    row-gap: 0;
  }
`;

const StyledHeader = styled(CommonRow)`
  display: none;
  
  @media (min-width: 769px) {
    display: grid;
    padding: 1.6rem 2.4rem;
    font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.6rem;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 769px) {
    padding: 1.2rem 2.4rem;
    background-color: transparent;
    border-radius: 0;
    margin-bottom: 0;
    box-shadow: none;
    border: none;
    transform: none;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }

    &:hover {
      background-color: #e9ecef !important;
      transform: none;
      box-shadow: none;
    }
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;

  @media (min-width: 769px) {
    & > div:nth-child(odd) {
      background-color: #f8f9fa;
    }
    
    & > div:nth-child(even) {
      background-color: #ffffff;
    }

    & > div:hover {
      background-color: #e9ecef !important;
      transition: background-color 0.2s ease;
    }
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
  margin: 2.4rem;
`;


type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType | undefined>(undefined);


type TableProps = {
  columns: string;
  children: React.ReactNode;
}

function Table({ columns, children }: TableProps) {
    return (
      <TableContext.Provider value={{ columns }}>
        <StyledTable role="table">{children}</StyledTable>
      </TableContext.Provider>
    );
  }

  type HeaderProps = {
    children: React.ReactNode;
  };
  

function Header({ children}: HeaderProps) {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Header must be used within a Table");
  }
  const { columns } = context;
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

type RowProps = {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};

function Row({ children, onClick, style }: RowProps) {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a Table");
  }
  const { columns } = context;
  return (
    <StyledRow role="row" columns={columns} onClick={onClick} style={style}>
      {children}
    </StyledRow>
  );
}

type BodyProps<T> = {
  data: T[];
  render: (item: T) => React.ReactNode;
};

function Body<T>({ data, render }: BodyProps<T>) {
  console.log(data)
  if (!data.length) return <Empty>No data to show at the moment!</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}


export { Table, Header, Row, Body };
  