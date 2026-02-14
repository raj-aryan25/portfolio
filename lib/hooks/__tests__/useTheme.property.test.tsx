import fc from 'fast-check';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { useTheme, Theme } from '@/lib/hooks/useTheme';

/**
 * **Validates: Requirements 9.2, 9.5, 9.6**
 * 
 * Property 5: Theme Persistence Round-Trip
 * Property 6: Theme Toggle State Transition
 * 
 * For any theme selection (light, dark), when a user changes the theme, 
 * the preference should be stored in localStorage, and when the page is reloaded, 
 * the same theme should be applied.
 * 
 * For any current theme state, when the theme toggle is clicked, the application 
 * should transition to the opposite theme (light → dark or dark → light).
 */

// Mock localStorage
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    getStore: () => ({ ...store }),
  };
};

// Mock matchMedia
const mockMatchMedia = (prefersDark: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: prefersDark && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Test component that uses the theme hook
function TestComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
    </div>
  );
}

// Arbitrary for theme values
const themeArbitrary = fc.constantFrom('light', 'dark') as fc.Arbitrary<Theme>;

describe('Theme System - Property-Based Tests', () => {
  let localStorageMock: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    localStorageMock = createLocalStorageMock();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    mockMatchMedia(false);
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('Property 5: Theme Persistence Round-Trip', () => {
    it('should persist any theme selection to localStorage and reload it', async () => {
      fc.assert(
        fc.asyncProperty(themeArbitrary, async (selectedTheme) => {
          // Clear previous state
          localStorageMock.clear();
          document.documentElement.classList.remove('dark');

          // First render: Set the theme
          const { unmount } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Wait for initial mount
          await waitFor(() => {
            expect(screen.getByTestId('theme')).toBeInTheDocument();
          });

          // Set the theme
          const setButton = screen.getByTestId(
            selectedTheme === 'light' ? 'set-light' : 'set-dark'
          );
          fireEvent.click(setButton);

          // Wait for theme to be applied
          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(selectedTheme);
          });

          // Verify localStorage was updated
          const storedTheme = localStorageMock.getItem('theme');
          expect(storedTheme).toBe(selectedTheme);

          // Verify DOM class was applied correctly
          const hasDarkClass = document.documentElement.classList.contains('dark');
          expect(hasDarkClass).toBe(selectedTheme === 'dark');

          // Unmount to simulate page unload
          unmount();

          // Second render: Verify theme is loaded from localStorage
          render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Wait for theme to be loaded from localStorage
          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(selectedTheme);
          });

          // Verify DOM class is still correct after reload
          const hasDarkClassAfterReload = document.documentElement.classList.contains('dark');
          expect(hasDarkClassAfterReload).toBe(selectedTheme === 'dark');
        }),
        { numRuns: 100 }
      );
    });

    it('should handle multiple theme changes and persist the final state', async () => {
      fc.assert(
        fc.asyncProperty(
          fc.array(themeArbitrary, { minLength: 2, maxLength: 10 }),
          async (themeSequence) => {
            // Clear previous state
            localStorageMock.clear();
            document.documentElement.classList.remove('dark');

            render(
              <ThemeProvider>
                <TestComponent />
              </ThemeProvider>
            );

            // Wait for initial mount
            await waitFor(() => {
              expect(screen.getByTestId('theme')).toBeInTheDocument();
            });

            // Apply each theme in sequence
            for (const theme of themeSequence) {
              const setButton = screen.getByTestId(
                theme === 'light' ? 'set-light' : 'set-dark'
              );
              fireEvent.click(setButton);

              await waitFor(() => {
                expect(screen.getByTestId('theme')).toHaveTextContent(theme);
              });
            }

            // The final theme should be persisted
            const finalTheme = themeSequence[themeSequence.length - 1];
            const storedTheme = localStorageMock.getItem('theme');
            expect(storedTheme).toBe(finalTheme);

            // DOM class should match final theme
            const hasDarkClass = document.documentElement.classList.contains('dark');
            expect(hasDarkClass).toBe(finalTheme === 'dark');
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 6: Theme Toggle State Transition', () => {
    it('should toggle from any theme to its opposite', async () => {
      fc.assert(
        fc.asyncProperty(themeArbitrary, async (initialTheme) => {
          // Clear previous state
          localStorageMock.clear();
          document.documentElement.classList.remove('dark');

          // Set initial theme in localStorage
          localStorageMock.setItem('theme', initialTheme);

          render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Wait for theme to be loaded
          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(initialTheme);
          });

          // Toggle the theme
          const toggleButton = screen.getByTestId('toggle-button');
          fireEvent.click(toggleButton);

          // Expected opposite theme
          const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';

          // Wait for theme to change
          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(expectedTheme);
          });

          // Verify localStorage was updated
          const storedTheme = localStorageMock.getItem('theme');
          expect(storedTheme).toBe(expectedTheme);

          // Verify DOM class matches new theme
          const hasDarkClass = document.documentElement.classList.contains('dark');
          expect(hasDarkClass).toBe(expectedTheme === 'dark');
        }),
        { numRuns: 100 }
      );
    });

    it('should toggle back and forth correctly for any number of toggles', async () => {
      fc.assert(
        fc.asyncProperty(
          themeArbitrary,
          fc.integer({ min: 1, max: 20 }),
          async (initialTheme, toggleCount) => {
            // Clear previous state
            localStorageMock.clear();
            document.documentElement.classList.remove('dark');

            // Set initial theme in localStorage
            localStorageMock.setItem('theme', initialTheme);

            render(
              <ThemeProvider>
                <TestComponent />
              </ThemeProvider>
            );

            // Wait for initial theme to be loaded
            await waitFor(() => {
              expect(screen.getByTestId('theme')).toHaveTextContent(initialTheme);
            });

            const toggleButton = screen.getByTestId('toggle-button');

            // Perform toggles
            let currentTheme = initialTheme;
            for (let i = 0; i < toggleCount; i++) {
              fireEvent.click(toggleButton);
              
              // Calculate expected theme after toggle
              currentTheme = currentTheme === 'light' ? 'dark' : 'light';

              await waitFor(() => {
                expect(screen.getByTestId('theme')).toHaveTextContent(currentTheme);
              });

              // Verify DOM class is correct
              const hasDarkClass = document.documentElement.classList.contains('dark');
              expect(hasDarkClass).toBe(currentTheme === 'dark');
            }

            // Final theme should be persisted
            const storedTheme = localStorageMock.getItem('theme');
            expect(storedTheme).toBe(currentTheme);

            // Calculate expected final theme based on toggle count
            const expectedFinalTheme =
              toggleCount % 2 === 0 ? initialTheme : (initialTheme === 'light' ? 'dark' : 'light');
            expect(currentTheme).toBe(expectedFinalTheme);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain toggle invariant: toggle(toggle(theme)) === theme', async () => {
      fc.assert(
        fc.asyncProperty(themeArbitrary, async (initialTheme) => {
          // Clear previous state
          localStorageMock.clear();
          document.documentElement.classList.remove('dark');

          // Set initial theme in localStorage
          localStorageMock.setItem('theme', initialTheme);

          render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Wait for initial theme to be loaded
          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(initialTheme);
          });

          const toggleButton = screen.getByTestId('toggle-button');

          // First toggle
          fireEvent.click(toggleButton);
          const oppositeTheme = initialTheme === 'light' ? 'dark' : 'light';

          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(oppositeTheme);
          });

          // Second toggle (should return to initial theme)
          fireEvent.click(toggleButton);

          await waitFor(() => {
            expect(screen.getByTestId('theme')).toHaveTextContent(initialTheme);
          });

          // Verify we're back to the initial theme
          const storedTheme = localStorageMock.getItem('theme');
          expect(storedTheme).toBe(initialTheme);

          // Verify DOM class matches initial theme
          const hasDarkClass = document.documentElement.classList.contains('dark');
          expect(hasDarkClass).toBe(initialTheme === 'dark');
        }),
        { numRuns: 100 }
      );
    });
  });
});
