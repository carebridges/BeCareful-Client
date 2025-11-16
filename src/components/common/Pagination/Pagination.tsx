import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Arrow2 } from '@/assets/icons/pagination/PaginationArrow2.svg';
import { ReactComponent as Arrow1 } from '@/assets/icons/pagination/PaginationArrow1.svg';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

type Item = number;

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  const items = useMemo(
    () => buildItems(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const go = (p: number) => {
    if (disabled) return;
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped !== currentPage) onPageChange(clamped);
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <Nav role="navigation" aria-label="Pagination">
      <IconButton
        aria-label="First page"
        disabled={disabled || isFirst}
        onClick={() => go(1)}
      >
        <Arrow2 />
      </IconButton>

      <IconButton
        aria-label="Previous page"
        disabled={disabled || isFirst}
        onClick={() => go(currentPage - 1)}
      >
        <Arrow1 />
      </IconButton>

      {items.map((num) => {
        const active = num === currentPage;
        return (
          <PageButton
            key={num}
            aria-current={active ? 'page' : undefined}
            $active={active}
            disabled={disabled}
            onClick={() => go(num)}
          >
            {num}
          </PageButton>
        );
      })}

      <IconButton
        aria-label="Next page"
        $dir="right"
        disabled={disabled || isLast}
        onClick={() => go(currentPage + 1)}
      >
        <Arrow1 />
      </IconButton>

      <IconButton
        aria-label="Last page"
        $dir="right"
        disabled={disabled || isLast}
        onClick={() => go(totalPages)}
      >
        <Arrow2 />
      </IconButton>
    </Nav>
  );
};

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function buildItems(page: number, total: number): Item[] {
  const WINDOW = 3;
  if (total <= 0) return [];
  if (total <= WINDOW) return range(1, total);

  const half = Math.floor(WINDOW / 2);
  let start = page - half;
  let end = page + half;

  if (start < 1) {
    start = 1;
    end = WINDOW;
  } else if (end > total) {
    end = total;
    start = total - WINDOW + 1;
  }

  return range(start, end);
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const circle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray800};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  ${circle};

  ${({ $active }) =>
    $active &&
    css`
      background: ${({ theme }) => theme.colors.mainBlue};
      color: ${({ theme }) => theme.colors.white};
      border-color: transparent;
    `}
`;

const IconButton = styled.button<{ $dir?: 'right' }>`
  ${circle};

  ${({ $dir }) =>
    $dir === 'right' &&
    css`
      transform: scaleX(-1);
    `}
`;
