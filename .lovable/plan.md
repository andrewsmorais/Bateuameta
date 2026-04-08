

## Plan: Rename "Menu KM" to "Turnos" in Navigation

Rename the sidebar menu item from "Menu KM" to "Turnos" in the Layout component.

### Changes

**File: `src/components/Layout.tsx`**
- Update the `menuItems` array entry for KM: change `label: "Menu KM"` to `label: "Turnos"`

This single change updates both the desktop and mobile sidebar since they both render from the same `menuItems` array.

