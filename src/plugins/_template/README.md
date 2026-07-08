# Plugin Name

> 📝 This is a template. Copy this folder to create a new plugin.

## Overview

Brief description of what this plugin does.

## Usage

### Option 1: Ready-to-use Component

```tsx
import { MyPluginComponent } from "@/plugins/my-plugin";

export function MyPage() {
  return (
    <MyPluginComponent
      title="Hello"
      variant="default"
    />
  );
}
```

### Option 2: Hook (Custom UI)

```tsx
import { useMyPlugin } from "@/plugins/my-plugin";

export function CustomComponent() {
  const { data, actions } = useMyPlugin({
    // config options
  });

  return (
    <div>
      {/* Your custom UI using plugin data & actions */}
    </div>
  );
}
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | — | Plugin title |
| `variant` | `"default" \| "compact"` | `"default"` | Display variant |

## File Structure

```
my-plugin/
├── index.ts          # Public API (exports)
├── types.ts          # Config types
├── components/       # UI components
├── hooks/            # React hooks
├── actions/          # Server Actions
├── schemas/          # Zod validation schemas
└── README.md         # This file
```
