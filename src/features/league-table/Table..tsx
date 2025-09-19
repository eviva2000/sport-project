import { createContext,useContext } from "react";
import styled from "styled-components";


const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;
interface CommonRowProps {
  columns: string; // Adjust the type as needed
}


const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
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
};

function Row({ children }: RowProps) {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a Table");
  }
  const { columns } = context;
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

type BodyProps<T> = {
  data: T[];
  render: (item: T) => React.ReactNode;
};

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}


export { Table, Header, Row, Body };
  