import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, fc } from '@fast-check/jest';
import { Button, ButtonProps } from '../Button';

// Feature: ai-ml-portfolio-website, Property 16: Interactive Element Keyboard Accessibility
// **Validates: Requirements 12.3**
describe('Property 16: Interactive Element Keyboard Accessibility', () => {
  test.prop([
    fc.constantFrom('primary', 'secondary', 'ghost'),
    fc.string({ minLength: 1, maxLength: 50 }),
  ])('Button should be keyboard accessible for any variant and text', (variant, text) => {
    render(<Button variant={variant as ButtonProps['variant']}>{text}</Button>);
    
    const button = screen.getByRole('button');
    
    // Button should be focusable via keyboard (tabIndex should be 0 or not set, meaning focusable)
    expect(button).not.toHaveAttribute('tabindex', '-1');
    
    // Button should be able to receive focus
    button.focus();
    expect(button).toHaveFocus();
    
    // Button should have proper button role for keyboard interaction
    expect(button.tagName).toBe('BUTTON');
  });

  test.prop([
    fc.boolean(),
    fc.string({ minLength: 1, maxLength: 50 }),
  ])('Disabled buttons should not be keyboard accessible', (isDisabled, text) => {
    if (!isDisabled) {
      // Skip test when not disabled - we only test disabled state here
      return;
    }
    
    render(<Button disabled={isDisabled}>{text}</Button>);
    
    const button = screen.getByRole('button');
    
    if (isDisabled) {
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none');
    }
  });
});

// Feature: ai-ml-portfolio-website, Property 17: Focus Indicator Visibility
// **Validates: Requirements 12.4**
describe('Property 17: Focus Indicator Visibility', () => {
  test.prop([
    fc.constantFrom('primary', 'secondary', 'ghost'),
    fc.string({ minLength: 1, maxLength: 50 }),
  ])('Button should have visible focus indicators for any variant', (variant, text) => {
    render(<Button variant={variant as ButtonProps['variant']}>{text}</Button>);
    
    const button = screen.getByRole('button');
    
    // Should have focus-visible outline styles
    expect(button).toHaveClass('focus-visible:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-offset-2');
    
    // Should have variant-specific focus ring color
    const hasFocusRing = 
      button.classList.contains('focus-visible:ring-blue-500') ||
      button.classList.contains('focus-visible:ring-gray-500');
    
    expect(hasFocusRing).toBe(true);
  });

  test.prop([
    fc.constantFrom('primary', 'secondary', 'ghost'),
  ])('Focus indicators should be present for all variants', (variant) => {
    render(<Button variant={variant as ButtonProps['variant']}>Test</Button>);
    
    const button = screen.getByRole('button');
    
    // Verify focus ring classes are present
    const classList = Array.from(button.classList);
    const hasFocusVisibleClasses = classList.some(cls => cls.includes('focus-visible:ring'));
    
    expect(hasFocusVisibleClasses).toBe(true);
  });
});

// Additional property: Button variant styles are consistently applied
describe('Property: Button Variant Consistency', () => {
  test.prop([
    fc.constantFrom('primary', 'secondary', 'ghost'),
    fc.string({ minLength: 1, maxLength: 100 }),
  ])('Button should apply correct variant styles consistently', (variant, children) => {
    render(<Button variant={variant as ButtonProps['variant']}>{children}</Button>);
    
    const button = screen.getByRole('button');
    
    // All buttons should have base styles
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('transition-all');
    
    // Variant-specific styles
    switch (variant) {
      case 'primary':
        expect(button).toHaveClass('bg-blue-600');
        expect(button).toHaveClass('text-white');
        break;
      case 'secondary':
        expect(button).toHaveClass('bg-gray-200');
        expect(button).toHaveClass('text-gray-900');
        break;
      case 'ghost':
        expect(button).toHaveClass('bg-transparent');
        expect(button).toHaveClass('text-gray-900');
        break;
    }
  });
});

// Property: Button should render children correctly
describe('Property: Button Children Rendering', () => {
  test.prop([
    fc.string({ minLength: 1, maxLength: 200 }),
    fc.constantFrom('primary', 'secondary', 'ghost'),
  ])('Button should render any valid text content', (text, variant) => {
    render(<Button variant={variant as ButtonProps['variant']}>{text}</Button>);
    
    const button = screen.getByRole('button');
    
    // Button should contain the text
    expect(button).toHaveTextContent(text);
    
    // Button should be in the document
    expect(button).toBeInTheDocument();
  });
});

// Property: Button should handle custom className merging
describe('Property: ClassName Merging', () => {
  test.prop([
    fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z-]+$/.test(s)),
    fc.constantFrom('primary', 'secondary', 'ghost'),
  ])('Button should merge custom className with default styles', (customClass, variant) => {
    render(
      <Button variant={variant as ButtonProps['variant']} className={customClass}>
        Test
      </Button>
    );
    
    const button = screen.getByRole('button');
    
    // Should have custom class
    expect(button).toHaveClass(customClass);
    
    // Should still have base classes
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('rounded-lg');
  });
});

// Property: Button should support all standard HTML button attributes
describe('Property: HTML Attribute Forwarding', () => {
  test.prop([
    fc.constantFrom('button', 'submit', 'reset'),
    fc.boolean(),
  ])('Button should forward type and disabled attributes', (type, disabled) => {
    render(
      <Button type={type} disabled={disabled}>
        Test
      </Button>
    );
    
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('type', type);
    
    if (disabled) {
      expect(button).toBeDisabled();
    } else {
      expect(button).not.toBeDisabled();
    }
  });
});
