# TODO: Move Navbar Rendering from layout.tsx to page.tsx

## Steps to Complete

- [x] Edit app/layout.tsx: Remove the import statement for Navbar and the <Navbar /> JSX element from the layout structure.
- [x] Edit app/page.tsx: Add the import for Navbar and render <Navbar /> at the beginning of the component's return statement, before the existing content.
- [ ] Test the changes: Run the development server and verify the Navbar appears on the home page and not on other pages.
- [ ] Check for layout or styling issues due to the structural change.
