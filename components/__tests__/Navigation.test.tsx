import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import { Navigation } from '../Navigation';
import { useTheme } from '../ThemeProvider';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      a: (props) => <a {...props} />,
      button: (props) => <button {...props} />,
      div: (props) => <div {...props} />,
      ul: (props) => <ul {...props} />,
      li: (props) => <li {...props} />,
      span: (props) => <span {...props} />,
    },
  };
});

vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react');
  return {
    ...actual,
    Home: (props) => <div data-testid="icon-home" {...props} />,
    Briefcase: (props) => <div data-testid="icon-briefcase" {...props} />,
    User: (props) => <div data-testid="icon-user" {...props} />,
    Mail: (props) => <div data-testid="icon-mail" {...props} />,
    Moon: (props) => <div data-testid="icon-moon" {...props} />,
    Sun: (props) => <div data-testid="icon-sun" {...props} />,
  };
});


const mockTheme = vi.fn();
const mockToggleTheme = vi.fn();
vi.mock('../ThemeProvider', () => ({
  useTheme: vi.fn(() => ({
    theme: mockTheme(),
    toggleTheme: mockToggleTheme,
  })),
}));

describe('Navigation', () => {
  beforeEach(() => {
    mockTheme.mockClear();
    mockToggleTheme.mockClear();
    vi.clearAllMocks();
  });

  it('renders the logo with correct text and link', () => {
    mockTheme.mockReturnValue('light');
    render(<Navigation />);
    const logoLink = screen.getByRole('link', { name: /vd/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '#home');
  });

  it('renders the theme toggle button with Moon icon when theme is light', () => {
    mockTheme.mockReturnValue('light');
    render(<Navigation />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    expect(themeButton).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('renders the theme toggle button with Sun icon when theme is dark', () => {
    mockTheme.mockReturnValue('dark');
    render(<Navigation />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    expect(themeButton).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('toggles theme when the theme button is clicked', () => {
    mockTheme.mockReturnValue('light');
    render(<Navigation />);
    const themeButton = screen.getByRole('button', { name: /theme/i });
    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  describe('Desktop Navigation', () => {
    it('renders all navigation items for desktop', () => {
      mockTheme.mockReturnValue('light');
      render(<Navigation />);
      const desktopNav = screen.getByTestId('desktop-nav');

      expect(within(desktopNav).getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(within(desktopNav).getByRole('link', { name: /works/i })).toBeInTheDocument();
      expect(within(desktopNav).getByRole('link', { name: /about/i })).toBeInTheDocument();
      expect(within(desktopNav).getByRole('link', { name: /contact/i })).toBeInTheDocument();

      const homeLink = within(desktopNav).getByRole('link', { name: /home/i });
      expect(homeLink).toHaveStyle('background-color: var(--purple)');
      expect(homeLink).toHaveStyle('color: var(--bg)');
    });

    it('updates active section on desktop navigation item click', () => {
      mockTheme.mockReturnValue('light');
      render(<Navigation />);
      const desktopNav = screen.getByTestId('desktop-nav');

      const worksLink = within(desktopNav).getByRole('link', { name: /works/i });
      fireEvent.click(worksLink);

      expect(worksLink).toHaveStyle('background-color: var(--purple)');
      expect(worksLink).toHaveStyle('color: var(--bg)');

      const homeLink = within(desktopNav).getByRole('link', { name: /home/i });
      expect(homeLink).toHaveStyle('background-color: rgba(0, 0, 0, 0.04)');
      expect(homeLink).toHaveStyle('color: var(--base)');
    });
  });

  describe('Mobile Navigation', () => {
    it('renders all navigation items for mobile', () => {
      mockTheme.mockReturnValue('light');
      render(<Navigation />);
      const mobileNav = screen.getByTestId('mobile-nav');

      expect(within(mobileNav).getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(within(mobileNav).getByRole('link', { name: /works/i })).toBeInTheDocument();
      expect(within(mobileNav).getByRole('link', { name: /about/i })).toBeInTheDocument();
      expect(within(mobileNav).getByRole('link', { name: /contact/i })).toBeInTheDocument();

      const homeLink = within(mobileNav).getByRole('link', { name: /home/i });
      const homeIcon = within(homeLink).getByTestId('icon-home');
      expect(homeIcon).toHaveStyle('color: var(--orange)');
    });

    it('updates active section on mobile navigation item click', () => {
      mockTheme.mockReturnValue('light');
      render(<Navigation />);
      const mobileNav = screen.getByTestId('mobile-nav');

      const worksLink = within(mobileNav).getByRole('link', { name: /works/i });
      fireEvent.click(worksLink);

      const worksIcon = within(worksLink).getByTestId('icon-briefcase');
      expect(worksIcon).toHaveStyle('color: var(--orange)');

      const homeLink = within(mobileNav).getByRole('link', { name: /home/i });
      const homeIcon = within(homeLink).getByTestId('icon-home');
      expect(homeIcon).toHaveStyle('color: var(--grey)');
    });
  });
});